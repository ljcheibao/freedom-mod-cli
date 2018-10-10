const webpack = require("webpack");
const webpackConfHandle = require("./webpack.mod");
const proxyMiddleware = require('http-proxy-middleware');
const app = require("express")();
const colors = require("colors");
const serverStatic = require("serve-static");
const path = require("path");

const EjsCompile = require("./templateCompile/ejsCompile");

const ASSETS_DOMAIN = "//localhost:9001";

//启动静态资源访问服务
app.use(serverStatic(`${path.resolve(__dirname, "../")}`, {
  index: [`index.html`]
}));
let listenStr = `listen at http://localhost:9001,......`;
console.log(listenStr.bold.cyan);
app.listen(9001);

/**
 * 模块编译预览
 * @todo 不同模块的渲染，需要独立抽取出来维护
 * @param {object} params
 *  {
 *    modName:"模块名称",
 *    version:"模块版本",
 *    type:"模块类型，比如：ejs、vue等"
 *  }
 * @return {string} 返回编译好的html字符串 
 */
module.exports = async function (params) {
  //获取webpack配置
  let webpackConf = await webpackConfHandle(params);
  //1、构建
  await webpackBuild(webpackConf);
  //2、渲染模板
  let renderHtml;
  //取不同的模块类型type，分别调用不同的模板编译方法
  switch (params.type) {
    case "vue":
      break;
    case "ejs":
      break;
    case "jade":
      break;
    case "xtpl":
      break;
    case "react":
      break;
    default:
      renderHtml = await EjsCompile(params.modName);
      break;
  }
  //3、拼接上js跟css
  renderHtml = `
    ${renderHtml}
    <script src="${ASSETS_DOMAIN}/build/index.js"></script>
  `;
  //4、返回组装好的html字符串
  return renderHtml;
};

/**
 * webpack构建模块
 * @param {object} webpackConf webpack构建配置
 * @return {boolean} 构建成功返回true
 */
let webpackBuild = function (webpackConf) {
  return new Promise(function (resolve, reject) {
    let compiler = webpack(webpackConf, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.log(stats);
      }
      resolve(true);
    });
  });
};