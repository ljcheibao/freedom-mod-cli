import "./index.less";
import {
  BaseView,
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from "../BaseView";
import pagination from "../../components/vue-component-pagination/index";

/**
 * 系统通用layout
 * @class
 * @extends BaseView
 */
@Component({
  template: require("./index.html"),
  components: {
    pagination
  }
})
export default class ModList extends BaseView {
  /**
   * 分组组件需要传递的数据对象
   */
  pagination: any = {
    totalRecord: 50,
    pageSize: 5
  }

  /**
   * 点击第几页触发的函数
   * @param {number} pageIndex 第几页
   * @return {void} 无返回值
   */
  async choosePaginationHandle(pageIndex: number): Promise<void> {

  }
}