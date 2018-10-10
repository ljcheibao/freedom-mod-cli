const EjsRender = require("ejs");
const compile = EjsRender.compile;
const fs = require("fs");
const baseDir = process.cwd();

/**
 * ejs模板类型的模块渲染
 * @param {string} modName 模块名称
 * @return {string} 返回编译渲染后的模块html字符串
 */
module.exports = async function (modName) {
  //模块渲染模板字符串
  let tplStr = fs.readFileSync(`${baseDir}/${modName}/src/index.html`).toString();
  //渲染模板
  let compileEngine = compile(tplStr);
  let data = fs.readFileSync(`${baseDir}/${modName}/mock/data.json`).toString();
  //渲染成功的模块html
  let renderHtml = compileEngine(JSON.parse(data));

  return renderHtml;
};