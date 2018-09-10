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
export default class Login extends BaseView {

  /**
   * 用户登录
   * @return {void}无返回值
   */
  async loginHandle(): Promise<void> {

  }
}