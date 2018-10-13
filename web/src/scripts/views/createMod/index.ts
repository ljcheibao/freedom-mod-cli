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
   * 模块数据
   */
  moduleData: ModuleDetailModel = new ModuleDetailModel();

  /**
   * 创建模块
   * @return {void} 无返回值
   */
  async createModHandle(): Promise<void> {

  }
}

/**
 * 模块详情实体
 * @class
 */
class ModuleDetailModel {
  /**
   * 模块名称
   */
  modName: string;

  /**
   * 模块类型 ejs、vue、react、jade、xtpl
   */
  type: string;

  /**
   * 模块描述
   */
  description: string;
}