define([], function () {
	'use strict';
	var expense = {};

	/**
	 * 表字段
	 *
	 */

	// 稳定数据
	expense.param = {};

	// 临时数据
	expense.temp = {};

	// 读取器
	expense.getter = function (attr) {
		return this.temp[attr];
	};

	// 设置器
	expense.setter = function (attr, value) {
		this.temp[attr] = value;
		return this;
	};

	// 设置多个参数
	/**
	 * @Param data 数据源
	 * @Param attr1 
	 * @Param attr2
	 */
	expense.setmore = function () {
		// 未完成
	};

	// 校验
	expense.check = function () {

	};
});