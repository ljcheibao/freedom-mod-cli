"use strict";
/**
 * 模块开发可视化页面控制器
 * @class
 */
class IndexController {

  /**
   * 首页
   * @return {string} 返回首页html字符串
   */
  static async index(ctx,next) {
    ctx.response.body = "<div style='color:red;font-size:50px'>我是server......</div>";
  }
}
module.exports = IndexController;