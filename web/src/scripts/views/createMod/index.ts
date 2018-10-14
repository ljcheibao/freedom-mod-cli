import "./index.less";
import {
  BaseView,
  Component
} from "../BaseView";

import { ModuleDetailModel } from "../../models/ModuleDetailModel";
import ModService from "../../services/ModService";

const modServiceInstance = new ModService();

/**
 * 系统通用layout
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html")
})
export default class CreateMod extends BaseView {

  /**
   * 模块数据
   */
  moduleData: ModuleDetailModel = new ModuleDetailModel();

  /**
   * 创建模块
   * @return {void} 无返回值
   */
  async createModHandle(): Promise<void> {
    let result:boolean = <boolean>await modServiceInstance.createMod(this.moduleData);
    if (result) this.$router.push(`/modlist`);
  }
}