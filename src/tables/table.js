'use strict';

// import ext from '../libs/extend.min'

export default class table {
  constructor(temp) {
    this.temp = temp || {};
  }

  /**
   * @Function 初始化
   * @Param temp Object
   */
  init(temp) {
    this.temp = temp;
  }

  /**
   * @Function 读取器
   * @Param attr String 属性名
   */
  getter(attr) {
    return this.temp[attr]
  }

  /**
   * @Function 设置器
   * @Param attr String 属性名
   * @Param value 值
   */
  setter(attr, value) {
    this.temp[attr] = value
    return this
  }

}


/**
 * 遗留改进:
 * [1] 研究 props
 */