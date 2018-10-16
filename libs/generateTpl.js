const fsExtra = require('fs-extra');
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const chalk = require("chalk");
const freedomConf = require("../config/default").freedomConf;
const gitRepo = require("./gitRepos");
const shell = require("freedom-util-shell")();
const util = require("heibao-utils");

const baseDir = process.cwd();
const TPL_DIR = `${freedomConf.localDir}/templates`;
/**
 * 生成模块模板
 * @class
 */
class GenerateTpl {
  /**
   * 构造器，初始化相关信息
   */
  constructor() { }

  /**
   * 生成模块的工程模板
   * @param {object} moduleModel 模块实体信息 
   * {
   *  type:"模块类型，比如ejs、vue",
   *  description:"模块描述",
   *  modName:"模块名称"
   * }
   */
  async generateModuleTpl(moduleModel) {
    console.log((`generating ${moduleModel.modName} project......`).bold.green);
    //判断是否存在缓存模板
    let isHaveCache = fs.existsSync(`${TPL_DIR}/${freedomConf.gitRepoName[moduleModel.type]}`);
    //存在缓存模板则直接拷贝到指定目录，不存在则从repo拉取新模板
    if (!isHaveCache) {
      console.log((`downloading ${moduleModel.type} tpl project......`).bold.green);
      await gitRepo.downloadRemoteTpl(moduleModel.type);
      console.log((`${moduleModel.type} tpl project have download finished......`).bold.green);
    }
    //把模板拷贝到指定目录
    if (!fs.existsSync(`${baseDir}/${moduleModel.modName}`)) {
      mkdirp.sync(`${baseDir}/${moduleModel.modName}`);
    }
    await fsExtra.copy(`${TPL_DIR}/${freedomConf.gitRepoName[moduleModel.type]}`, `${baseDir}/${moduleModel.modName}`);
    //更改package.json跟freedom.json相关信息
    let pkgFile = `${baseDir}/${moduleModel.modName}/package.json`;
    let freedomFile = `${baseDir}/${moduleModel.modName}/freedom.json`;
    let pkg = fs.readFileSync(pkgFile);
    let freedomJson = fs.readFileSync(freedomFile);
    pkg = JSON.parse(pkg);
    freedomJson = JSON.parse(freedomJson);
    pkg.name = moduleModel.modName;
    pkg.author = "上善若水";//创建者,这里是登录github/gitlab账号的用户

    freedomJson.name = pkg.name;
    freedomJson.version = pkg.version;
    freedomJson.description = moduleModel.description;
    freedomJson.type = moduleModel.type;
    freedomJson.author = pkg.author;//创建者,这里是登录github/gitlab账号的用户
    freedomJson.editor = "上善若水";//这里是登录github/gitlab账号的用户
    freedomJson.editTime = util.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());

    fs.writeFileSync(pkgFile, JSON.stringify(pkg), {
      encoding: "utf-8"
    });
    fs.writeFileSync(freedomFile, JSON.stringify(freedomJson), {
      encoding: "utf-8"
    });

    //修改项目index.html跟index.less
    let indexHtmlFile = `${baseDir}/${moduleModel.modName}/src/index.html`;
    let indexLessFile = `${baseDir}/${moduleModel.modName}/src/index.less`;
    let indexHtml = fs.readFileSync(indexHtmlFile);
    let indexLess = fs.readFileSync(indexLessFile);

    indexHtml = indexHtml.toString().replace(/class="freedom-module-wrapper">/gm, `class="freedom-module-wrapper-${moduleModel.type}">`);
    indexLess = `.freedom-module-wrapper-${moduleModel.type}{}`;
    fs.writeFileSync(indexHtmlFile, indexHtml, {
      encoding: "utf-8"
    });
    fs.writeFileSync(indexLessFile, indexLess, {
      encoding: "utf-8"
    });

    console.log((`${moduleModel.modName} project have generate finished......`).bold.green);
    //生成gitlab|github项目(执行shell或者调用open api)，并且push到远程

    return true;
  }
}


module.exports = new GenerateTpl();