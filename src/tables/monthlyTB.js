/**
 * 阅读支出统计分析
 * month
 * amount
 * detail
 *  class
 *  money
 */

'use strict';

import Vue from 'vue'
import {
  ext, dataApi, localDB
}
from '../libs'
import table from './table'
import expenseTB from './expenseTB'

/**
 * @Description 表字段
 * @Param month String 被统计月份
 * @Param amount Number 月度消费金额
 */
let monthlyTB = new table({
  month: dataApi.format("YYYY年MM月"),
  amount: 0
})

/**
 * @Function recalc 重新统计月度消费
 * @Note 目前只统计月度消费总金额
 */
monthlyTB.recalc = () => {
  let lists = [],
    mon = monthlyTB.temp.month,
    amount = 0,
    temp;
  ext.extend(true, lists, expenseTB.temp.lists)
  temp = lists.filter((item) => {
    return item.date.indexOf(mon) > -1
  })

  temp.forEach((item) => {
    amount -= -item.amount
  })

  monthlyTB.temp.amount = amount
}

window.monthlyTB = monthlyTB

export default monthlyTB