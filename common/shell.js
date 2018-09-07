"use strict";
const spawn = require('child_process').spawn;
const utils = require("heibao-utils");
const path = require("path");
const os = require("os");
const uuidv1 = require('uuid/v1');
const fs = require("fs");
const mkdirp = require("mkdirp");

/**
 * 执行shell
 */
class Shell {
  constructor(opts) {
    opts = opts || {};
    this.platform = opts.platform || "win32";
    this.shellCmd = "cmd.exe";
    if (this.platform === 'darwin') {
      this.shellCmd = process.env.SHELL || '/bin/bash';
    } else if (this.platform === 'win32') {
      this.shellCmd = process.env.CMD || 'cmd.exe';
    } else {
      this.shellCmd = process.env.SHELL || '/bin/sh';
    }
  }

  /**
   * 生成批处理shell脚步文件，比如: .bat、.sh
   * @param script  要执行的shell脚本，可以是数组
   * @param opts  执行shell的额外参数
   * @returns {*}
   * @private 内部私有方法
   */
  _generateTempCmdFile(script, opts) {
    if (utils.isArray(script)){
      script = script.map(function (item) {
        return `call ${item}`;
      });
      script = script.join(os.EOL);
    }
    else return script;
    let fileExtname = this.platform == "win32" ? "bat" : "sh";
    let tempDir = path.normalize(path.join(os.homedir(), "/.freedom/"));
    if (!fs.existsSync(tempDir)) mkdirp.sync(tempDir);
    let tempFilePath = path.normalize(path.resolve(tempDir, `${uuidv1()}.${fileExtname}`));
    fs.writeFileSync(tempFilePath, script);
    if (this.platform !== "win32") fs.chmodSync(tempFilePath, '777');
    return tempFilePath;
  }

  /**
   * 执行shell命令
   * @param script 要执行的shell脚本，可以是shell命令数组
   * @param opts 执行shell的额外参数，比如：cwd：shell执行的目录
   * @param outinput 是否输出执行shell的结果
   * @returns {Promise}
   */
  execCmd(script, opts, outinput = true) {
    let _this = this;
    opts = opts || {};
    let args = opts.args || [];
    return new Promise(function (resolve, reject) {
      let buffer = [];
      //默认windows系统命令flag，后续再添加linux的命令flags
      let flags = ['/d', '/s', '/c'];
      let shellCmdFile = _this._generateTempCmdFile(script);
      flags.push(shellCmdFile);
      let shellCmdArgs = flags.concat(args);
      let sp = spawn(_this.shellCmd, shellCmdArgs, opts);
      sp.stdout.on('data', function (data) {
        if (!data || data.length < 1) return;
        buffer.push(data);
        if (outinput) process.stdout.write(data);
      });

      sp.stderr.on('data', function (data) {
        if (!data || data.length < 1) return;
        buffer.push(data);
        if (outinput) process.stdout.write(data);
      });

      sp.on('exit', function (code) {
        if (code > 0) return reject(new Error(`Script Error, exit ${code}`));
        if (fs.existsSync(shellCmdFile)) fs.unlink(shellCmdFile, function () {
        });
        resolve(buffer.join('').replace(/(\r\n|\r|\n)/gi, ""));
      });
    });
  }
}

module.exports = Shell;