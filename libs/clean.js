const colors = require("colors")
const freedomConf = require("../config/default").freedomConf;
const shell = require("freedom-util-shell")();

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
    console.log((`begin clear local cache......`).bold.green);
    await shell.execCmd(`rm -rf ${freedomConf.localDir}/templates`, false);
    console.log((`end clear local cache......`).bold.green);
  }
}

module.exports = new Clean();