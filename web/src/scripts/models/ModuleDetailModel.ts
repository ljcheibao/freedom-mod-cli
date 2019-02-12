/**
 * 模块详情实体
 * @class
 */
export class ModuleDetailModel {
	/**
	 * 模块名称
	 */
	modName: string;

	/**
	 * 模块类型，移动端:mobile pc端：pc
	 */
	device:string = "mobile";

	/**
	 * 模块类型 ejs、vue、react、jade、xtpl
	 */
	type: string;

	/**
	 * 模块描述
	 */
	description: string;
}