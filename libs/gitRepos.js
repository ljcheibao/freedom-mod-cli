const path = require("path");
const fs = require("fs");
const download = require('download')
const gitclone = require('git-clone')
const mkdirp = require("mkdirp");
const shell = require("freedom-util-shell")();
const freedomConf = require("../config/default").freedomConf;
const TPL_DIR = `${freedomConf.localDir}/templates`;
/**
 * git相关操作
 * @class
 */
class GitRepos {
  /**
   * 构造器，初始化相关信息
   */
  constructor() {
    if (!fs.existsSync(TPL_DIR)) mkdirp.sync(TPL_DIR);
    this.repoDomain = freedomConf.gitType == "github" ? "github.com" : "gitlab.com";
    this.origin = this.getCompleteRepoDomain(this.repoDomain);
  }

  /**
   * 获取完整的仓储域名地址
   * @param {string} origin 仓库原地址
   * @return {string} 返回仓储域名地址
   */
  getCompleteRepoDomain(origin) {
    if (!/^(f|ht)tps?:\/\//i.test(origin)) {
      if (freedomConf.gitClone)
        origin = 'git@' + origin
      else
        origin = 'https://' + origin
    }
    return origin
  }

  /**
   * 获取请求模板的ulr
   * @param {string} modType 模块名称
   * @return {string} 返回获取到的模板url
   */
  _getFetchTplUrl(modType) {
    let url = "";
    switch (freedomConf.gitType) {
      case "github":
        url = `${this.origin}/${freedomConf.gitOwner}/${freedomConf.gitRepoName[modType]}/archive/master.zip`;
        break;
      case "gitlab":
        break;
      default:
        break;
    }

    return url;
  }

  /**
   * 下载远程模板
   * @param {string} modType 模块类型，比如：ejs、vue等
   * @param {object|function} opts 配置项
   * @param {boolean} 下载成功返回true，下载失败返回false
   */
  downloadRemoteTpl(modType, opts) {
    opts = opts || {}
    let url = this._getFetchTplUrl(modType);
    return new Promise(function (resolve, reject) {
      if (freedomConf.gitClone) {
        gitclone(url, TPL_DIR, { checkout: "master", shallow: true }, function (err) {
          if (err === undefined) {
            (async function () {
              await shell.execCmd(`rm -rf ${TPL_DIR}/.git`, false);
              resolve(true);
            });
          } else {
            reject(false);
          }
        })
      } else {
        download(url, `${TPL_DIR}/${freedomConf.gitRepoName[modType]}`, { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } }).then(data => {
          resolve(true);
        }).catch(err => {
          reject(false);
        })
      }
    });
  }

}

module.exports = new GitRepos();