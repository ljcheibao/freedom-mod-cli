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
export default class LayOut extends BaseView {
  createModMenuChoosed: boolean = false;
  modListMenuChoosed: boolean = false;
  /**
   * 监控路由变化
   * @param {object} to 要跳转的页面相关信息对象
   * @param {object} from 从哪个页面跳转过来的相关信息对象
   * @return {void} 无返回值
   */
  @Watch("$route")
  watchRouterChange(to, from): void {
    this.chooseLeftMenu(to.name);
  }

  /**
   * 左侧菜单选择
   * @param routerName 路由名称
   * @return {void} 无返回值
   */
  chooseLeftMenu(routerName): void {
    switch (routerName) {
      case "createMod":
        this.createModMenuChoosed = true;
        this.modListMenuChoosed = false;
        break;
      case "modList":
        this.createModMenuChoosed = false;
        this.modListMenuChoosed = true;
        break;
      default:
        break;
    }
  }

  /**
   * 组件视图挂载后的逻辑处理
   * @return {void} 无返回值
   */
  mounted(): void {
    //@ts-ignore
    this.chooseLeftMenu(this.$route.name);
  }
}