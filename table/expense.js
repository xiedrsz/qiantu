define(['Vue', 'ext', 'dataApi'], function (Vue, ext, dataApi) {
	'use strict';
	var expense = {};

	/**
	 * 表字段
	 * lists Array 支出列表, 与数据库同步
	 * amount String 今日支出, 从支出列表中获取
	 * outItems Array 支出项目
	 * itemDetail Object 项目详情 { date, Address, money, type, mess, img }
	 */

	// 稳定数据
	/**
	 * 用处不大，可能被删, [2016-12-21]
	 */
	expense.param = {};

	// 临时数据
	expense.temp = {};

	expense.temp.today = dataApi.format("YYYY年MM月DD日");
	expense.temp.amount = '0.00';
	expense.temp.lists = [];
	expense.temp.outItems = [];
	expense.temp.itemDetail = {};

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

	// 拉取,从服务器上拉去最新列表
	/**
	 * @param callback 回调函数
	 */
	expense.pull = function (callback) {
		console.log("pull");
		Vue.http.get('/expense/pull').then(function (data) {
			data.json().then(function (res) {
				ext.extend(true, expense.param, res);
				ext.extend(true, expense.temp, res);

				// 让 view 更新
				!!expense.temp.lists[0] && expense.temp.lists.$set(0, expense.temp.lists[0]);

				// 计算今日支出
				var temp = expense.temp.lists.filter(function (item) {
					return item.date == expense.temp.today;
				});
				!!temp[0] && (expense.temp.amount = temp[0].amount);

				!!callback && callback(res);
			});
		}, function (e) {
			console.log(e);
		});
	};

	// 获取支出类型
	/**
	 * @param callback 回调函数
	 */
	expense.getOutItems = function (callback) {
		Vue.http.get('/expense/getOutItems').then(function (data) {
			data.json().then(function (res) {
				ext.extend(true, expense.param.outItems, res.outItems);
				ext.extend(true, expense.temp.outItems, res.outItems);

				!!callback && callback(res);
			});
		}, function (e) {
			console.log(e);
		});
	};

	// 保存支出项目
	/**
	 * @param itemDetail 项目详情
	 * @param callback 回调函数
	 */
	expense.saveOutItem = function (itemDetail, callback) {
		var date = itemDetail.date,
			detail = {
				img: itemDetail.img,
				type: itemDetail.type,
				mess: itemDetail.mess,
				money: parseFloat(itemDetail.money).toFixed(2)
			},
			amount = parseFloat(detail.money),
			temp = expense.temp.lists.filter(function (item) {
				return item.date == date;
			});

		// 更新支出列表
		if (temp[0]) {
			temp[0].detail.push(detail);
			amount += parseFloat(temp[0].amount);
			temp[0].amount = amount.toFixed(2);
		} else {
			temp = {
				date: date,
				amount: amount.toFixed(2),
				detail: [detail]
			};
			expense.temp.lists.push(temp);
		}

		// 更新今日支出
		if (date == expense.temp.today) {
			var acTmp = expense.temp.amount;
			acTmp = parseFloat(detail.money) + parseFloat(acTmp);
			expense.temp.amount = acTmp.toFixed(2);
		}

		// 回调
		!!callback && callback();
	};

	return expense;
});