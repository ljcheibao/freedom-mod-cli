"use strict";
const fs = require("fs");
const path = require("path");
const baseDir = process.cwd();
const ModHandle = require("../mod/index");

let modList = {};
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
    //进行webpack编译，输出模块预览效果
    const query = ctx.query;
    ctx.body = await ModHandle({
      modName: query.modname,
      version: query.version
    });
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

}
module.exports = IndexController;