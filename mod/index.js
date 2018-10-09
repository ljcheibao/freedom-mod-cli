const webpack = require("webpack");
const webpackConfHandle = require("./webpack.mod");
const proxyMiddleware = require('http-proxy-middleware');
const app = require("express")();
const colors = require("colors");
const serverStatic = require("serve-static");
const baseDir = process.cwd();

const EjsRender = require("ejs");
const compile = EjsRender.compile;
const path = require("path");
const fs = require("fs");
/**
 * 模块编译预览
 * @todo 不同模块的渲染，需要独立抽取出来维护
 * @param {object} params
 *  {
 *    modName:"模块名称",
 *    version:"模块版本"
 *  }
 * @return {string} 返回编译好的html字符串 
 */
module.exports = async function (params) {
  /* await webpackBuild(params);
    var proxy1 = proxyMiddleware(params.proxy.context, {
      target: params.proxy.options.target
    });
    app.use(proxy1);
    app.use(serverStatic(`${baseDir}/${params.build}`, {
      index: [`index.html`]
    }));
    let listenStr = `listen at http://localhost:8888,......`;
    console.log(listenStr.bold.cyan);
    app.listen(8888); */
  //获取webpack配置
  let webpackConf = await webpackConfHandle(params);
  //1、构建
  await webpackBuild(webpackConf);
  //2、渲染模板
  //模块渲染模板字符串
  let tplStr = fs.readFileSync(`${baseDir}/${params.modName}/src/index.html`).toString();
  //渲染模板
  let compileEngine = compile(tplStr);
  let data = fs.readFileSync(`${baseDir}/${params.modName}/mock/data.json`).toString();
  //渲染成功的模块html
  let renderHtml = compileEngine(JSON.parse(data));
  //3、拼接上js跟css
  //4、启动静态资源访问服务
  //5、返回组装好的html字符串
  return renderHtml;
};

let webpackBuild = function (webpackConf) {
  return new Promise(function (resolve, reject) {
    let compiler = webpack(webpackConf, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.log(stats);
      }
      resolve(true);
    });
    compiler.apply(new webpack.ProgressPlugin(function handler(percentage, msg) {
			console.log((Number(percentage.toFixed(4)) * 100) + '%', msg);
		}));
  });
};