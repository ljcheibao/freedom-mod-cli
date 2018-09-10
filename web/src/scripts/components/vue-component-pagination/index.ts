import "./index.less";
import Vue from "vue";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from 'vue-property-decorator';

/**
 * 分页组件
 * @class
 * @extends Vue
 */
@Component({
  template: require("./index.html")
})
export default class Pagination extends Vue {

  /**
   * 当前页
   */
  currentIndex: number = 1;

  /**
   * 分页组件渲染需要的数据
   */
  paginationItems: Array<any> = [];

  /**
   * 总记录数
   */
  @Prop()
  pagination: any;

  /**
   * 计算pagination的变化
   * @return {string} 返回空字符串
   */
  get computedPagination(): string {
    if (this.pagination && this.pagination.totalRecord > 0) {
      this.renderPagination(this.pagination.totalRecord, this.pagination.pageSize);
    }
    return "";
  }

  /**
   * 渲染分页组件
   * @param {number} totalRecord 总记录数
   * @param {number} pageSize 每页显示多少条记录
   * @return {void} 无返回值
   */
  renderPagination(totalRecord: number, pageSize: number): void {
    this.paginationItems.length = 0;
    let pageItems: number = Math.ceil(totalRecord / pageSize);
    for (let i = 1; i <= pageItems; i++) {
      let item = { pageIndex: i, current: "" };
      if (i == 1) {
        item.current = "active";
        this.currentIndex = i;
      }
      this.paginationItems.push(item);
    }
    //this.pagination.totalRecord = 0;
  }

  /**
   * 点击前一页或者后一页触发的事件
   * @param {string} direction 方向，prev表示前一页，next表示后一页
   * @return {void} 无返回值
   */
  choosePrevOrNextHandle(direction: string): void {
    switch (direction) {
      case "prev":
        this.currentIndex--;
        break;
      case "next":
        this.currentIndex++;
        break;
      default:
        break;
    }
    if (this.currentIndex < 1) return;
    if (this.currentIndex > this.paginationItems.length) return;
    for (let item of this.paginationItems) {
      item.current = "";
      if (item.pageIndex == this.currentIndex) {
        item.current = "active";
      }
    }

    this.$emit("choosePrevOrNextEvent", this.currentIndex);
  }

  /**
   * 点击分页组件，通知组件调用者点击了第几页
   * @param {number} pageIndex 第几页
   * @return {void} 无返回值
   */
  @Emit("choosePaginationEvent")
  choosePaginationHandle(pageIndex: number): void {
    for (let item of this.paginationItems) {
      item.current = "";
      if (item.pageIndex == pageIndex) {
        item.current = "active";
        this.currentIndex = item.pageIndex;
      }
    }
  }
}