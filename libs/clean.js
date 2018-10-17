const colors = require("colors")
const freedomConf = require("../config/default").freedomConf;
const shell = require("freedom-util-shell")();
// const yaml = require("js-yaml");
// const fs = require("fs");
// const path = require("path");

/**
 * 清除local cache
 * @class
 */
class Clean {
  /**
   * 清除本地cache
   * @return {void} 无返回值
   */
  async cleanCache() {
    // let content = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./template.yml"), 'utf8'));
    // console.log(content);
    // let result = await fetch.requestRemoteServer(
    //   "https://raw.githubusercontent.com/ljcheibao/bms-web/master/tsconfig.json",
    //   {
    //     method:"Get",
    //     headers:{
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )
    // console.log(result);
    // return;
    console.log((`begin clear local cache......`).bold.green);
    await shell.execCmd(`rm -rf ${freedomConf.localDir}/templates`, false);
    console.log((`end clear local cache......`).bold.green);
  }
}

module.exports = new Clean();