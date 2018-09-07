import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../BaseView";

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
   * 创建模块
   * @return {void} 无返回值
   */
  async createModHandle(): void {

  }
}