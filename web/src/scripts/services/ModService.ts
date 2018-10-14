import { ModuleDetailModel } from "../models/ModuleDetailModel";
import axios from "axios";


/**
 * 模块相关服务，提供以下能力
 * 1、获取模块列表 - getModList
 * @class
 */
export default class ModService {
	/**
	 * 获取模块列表
	 * @param {number} pageIndex 页面索引，即第几页
	 * @param {number} pageSize 每页显示多少条数据
	 * @return {Array<object>} 返回获取到的模块列表
	 */
	getModList(pageIndex, pageSize) {
		return new Promise((resolve, reject) => {
			axios.request({
				url: `/api/modlist`,
				method: "Get",
				params: {
					pageIndex: pageIndex,
					pageSize: pageSize
				}
			}).then(function (result) {
				resolve(result.data);
			}).catch(function (error) {
				reject(error);
			});
		});
	}

	/**
	 * 创建模块
	 * @param {ModuleDetailModel} data 模块信息
	 * @return {boolean} 创建成功返回true，创建失败返回false
	 */
	createMod(data:ModuleDetailModel) {
		return new Promise((resolve, reject) => {
			axios.request({
				url: `/api/createmod`,
				method: "Post",
				data: data
			}).then(function (result) {
				resolve(result.data);
			}).catch(function (error) {
				reject(error);
			});
		});
	}
}