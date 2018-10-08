import "./index.less";
import {
  BaseView,
  Component
} from "../BaseView";

import pagination from "../../components/vue-component-pagination/index";
import ModService from "../../services/modService";

const modServiceInstance = new ModService();

/**
 * 系统通用layout
 * @class
 * @extends {BaseView}
 */
@Component({
  template: require("./index.html"),
  components: {
    pagination
  }
})
export default class ModList extends BaseView {
  //模块列表数组
  modList: Array<any> = [];

  /**
   * 分组组件需要传递的数据对象
   */
  pagination: any = {
    totalRecord: 0,
    pageSize: 12
  }

  /**
   * 获取数据初始化模板
   * @return {void} 无返回值ßßß
   */
  mounted(): void {
    let _this = this;
    (async function () {
      let result: any = await modServiceInstance.getModList(1, 12);
      _this.modList = result.list;
      _this.pagination.totalRecord = result.total;
    })();
  }

  /**
   * 点击第几页触发的函数
   * @param {number} pageIndex 第几页
   * @return {void} 无返回值
   */
  async choosePaginationHandle(pageIndex: number): Promise<void> {

  }
}