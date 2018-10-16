const fs = require("fs");
const path = require("path");
const baseDir = process.cwd();
const ModHandle = require("../mod/index");
const StoreManager = require("../common/store");

const generateTpl = require("../libs/generateTpl");

let modList = [];
let modJsonfiles = [];

let getAllModJsonfile = function (path) {
  let files = fs.readdirSync(path);
  files.forEach(function (file) {
    modJsonfiles.push(`${path}/${file}/freedom.json`);
  });
};


/**
 * 模块开发可视化页面控制器
 * @class
 */
class IndexController {

  /**
   * 首页 - 同时读取开发的模块
   * @param {Context} ctx 上下文 
   * @param {Function} next 下一步操作中间件 await next()
   * @return {string} 返回首页html字符串
   */
  static async index(ctx, next) {
    modList = [];
    modJsonfiles = [];
    getAllModJsonfile(baseDir);
    //读取freedom.json文件，获取项目相关信息
    modJsonfiles.forEach(function (file) {
      let fileObject = fs.readFileSync(file);
      modList.push(JSON.parse(fileObject));
    });
    await ctx.render("fmd", {
      title: "积木系统-模块开发"
    });
  }

  /**
   * 预览模块
   * @param {Context} ctx 上下文 
   * @param {Function} next 下一步操作中间件 await next()
   * @return {string} 返回渲染后的模块html字符串
   */
  static async preview(ctx, next) {
    StoreManager.set("url", ctx.url);
    //进行webpack编译，输出模块预览效果
    const query = ctx.query;
    const modHtml = await ModHandle({
      modName: query.modname,
      version: query.version
    });
    let tplStr = fs.readFileSync(`${path.resolve(__dirname, "./views/preview.html")}`).toString();
    tplStr = tplStr.replace(/<body>/gi, `<body>${modHtml}`);
    ctx.body = tplStr
  }

  /**
   * 获取模块列表
   * @param {Context} ctx 上下文 
   * @param {Function} next 下一步操作中间件 await next()
   * @return {Array<object>} 返回获取到的模块列表信息
   */
  static async modList(ctx, next) {
    ctx.body = {
      total: modList.length,
      list: modList
    };
  }

  /**
   * 创建模块
   * @param {Context} ctx 上下文 
   * @param {Function} next 下一步操作中间件 await next()
   * @return {boolean} 创建成功返回true，创建失败返回false
   */
  static async createModule(ctx, next) {
    let modData = ctx.request.body;
    let result = await generateTpl.generateModuleTpl(modData);
    if (result) {
      let fileObject = fs.readFileSync(`${baseDir}/${modData.modName}/freedom.json`);
      modList.push(JSON.parse(fileObject));
    }
    ctx.body = {
      success: true
    }
  }

}
module.exports = IndexController;