;
(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    window.store = factory();
  }
})(function () {
  var store = {};

  /**
   * @function 存储字段
   * @Param key string 键
   * @Param value 值
   */
  store.setItem = function (key, value) {
    var value = value || "",
      type = typeof value;

    (type == "object") && (value = JSON.stringify(value));

    localStorage.setItem(key, value);
  };

  /**
   * @function 获取字段
   * @Param key string 键
   */
  store.getItem = function (key) {
    var result = localStorage.getItem(key),
      reg = /^\[.*\]$|^{.*}$/; // 对象或数组

    reg.test(result) && (result = JSON.parse(result));

    return result;
  };

  /**
   * @Function 遍历localStorage
   * @Param condition reg 遍历条件
   * @Return Array 结果集
   */
  store.traverse = function (condition) {
    var i = 0,
      len = localStorage.length,
      result = [],
      key, item;

    for (; i < len; i++) {
      key = localStorage.key(i);
      if (condition.test(key)) {
        item = this.getItem(key);
        result.push(item);
        item = null;
      }
    }

    return result;
  };

  return store;
});