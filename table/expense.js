define(['Vue', 'ext'], function (Vue, ext) {
    'use strict';
    var expense = {};

    /**
     * 表字段
     * lists Array 支出列表
     * amount String 今日支出
     */

    // 稳定数据
    expense.param = {};

    // 临时数据
    expense.temp = {};
    
    expense.temp.amount = '0.00';
    expense.temp.lists = [];

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
        Vue.http.get('/expense/pull').then(function (data) {
            data.json().then(function (res) {
                ext.extend(true, expense.param, res);
                ext.extend(true, expense.temp, res);
                
                // 让 view 更新
                !!expense.temp.lists[0] && expense.temp.lists.$set(0, expense.temp.lists[0]);
                
                !!callback && callback(res);
            });
        }, function (e) {
            console.log(e);
        });
    };

    return expense;
});