"use strict";
const Shell = require("../common/shell");
const fs = require("fs");
const path = require("path");
const shell = new Shell();

const CNPM_CMD = "cnpm";
class Module {
  constructor() {
    this.moduleInstallPrefix = null;
  }

  /**
   * cnpm指定的package安装目录
   * @returns {Promise.<null|*>}
   */
  async getPrefix() {
    if (this.moduleInstallPrefix) return this.moduleInstallPrefix;
    this.moduleInstallPrefix = await shell.execCmd(`${CNPM_CMD} config get prefix`, {}, false);
    return this.moduleInstallPrefix;
  }

  /**
   * 安装模块
   * @param modName 模块名称
   * @returns {Promise.<*>}
   */
  async installMod(modName) {
    let prefix = await this.getPrefix();
    let modNamePath = path.normalize(path.join(`${prefix}`, `/node_modules/${modName}`));
    if (!modName || fs.existsSync(modNamePath)) return;
    return await shell.execCmd(`${CNPM_CMD} install -g ${modName}`)
  }
}
module.exports = Module;