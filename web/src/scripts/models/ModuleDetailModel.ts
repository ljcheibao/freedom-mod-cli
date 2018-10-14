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
	 * 模块类型 ejs、vue、react、jade、xtpl
	 */
	type: string;

	/**
	 * 模块描述
	 */
	description: string;
}