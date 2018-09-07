"use strict";

const fetch = require("node-fetch");

class Fetch {
  constructor() {

  }

  /**
   * 请求远程服务
   * @param url 远程服务地址
   * @param options 请求发送的额外参数
   * {
   *    method:"Post",
   *    body:
   *    headers:{
   *      'Content-Type': 'application/json'
   *    }
   * }
   */
  async requestRemoteServer(url, options) {
    let result = await fetch(url, options);
    return await result.json();
  }
}

module.exports = new Fetch();

