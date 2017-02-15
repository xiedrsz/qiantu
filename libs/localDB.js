/**
 * 针对本应用的本地数据库
 * ====================
 * [1] 账单键命名规则： e-日期, eg: e-2017-02-07
 */
define(['store'], function (store) {
  'use strict';

  var db = {};

  /**
   * @Function 更新，将单天的账单更新到服务器
   * @Param item 账单信息
   */
  db.update = function (item) {
    var date = item.date,
      key = "e-";

    date = date.replace(/[年月]/g, "-").replace("日", "");
    key += date;

    store.setItem(key, item);

    return key;
  };

  /**
   * @Function 同步，将服务器最新账单列表同步到本地
   * @Param list Array 账单列表
   */
  db.syn = function (list) {
    list.forEach(function (item) {
      db.update(item);
    });
  };

  /**
   * @Function 获取本地账单列表
   */
  db.localEList = function () {
    return store.traverse(/^e(\-\d+){3}$/).reverse();
  };

  /**
   * @Function 保存数据字典
   * @Param item string 字典名称
   * @Param value 值
   */
  db.saveDict = function (item, value) {
    store.setItem(item, value);
  };

  /**
   * @Function 查询数据字典
   * @Param item string 字典名称
   */
  db.queryDict = function (item) {
    return store.getItem(item);
  };

  return db;
});