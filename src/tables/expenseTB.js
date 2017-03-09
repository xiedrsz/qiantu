'use strict';

import Vue from 'vue'
import {
  ext, dataApi, localDB
}
from '../libs'
import table from './table'

/**
 * 表字段
 * lists Array 支出列表, 与数据库同步
 * amount String 今日支出, 从支出列表中获取
 * outItems Array 支出项目
 * itemDetail Object 项目详情 { date, Address, money, type, mess, img }
 */
let expenseTB = new table({
  today: dataApi.format("YYYY年MM月DD日"),
  amount: '0.00',
  lists: [],
  outItems: [],
  itemDetail: {}
})

/**
 * 拉取,从服务器上拉去最新列表, 若失败则使用本地数据
 * @param callback 回调函数
 */
expenseTB.pull = (callback) => {
  Vue.http.get('/expense/pull').then((data) => {
    let res = data.data;
    // 同步到本地
    localDB.syn(res.lists)
    deal(res);
    !!callback && callback()
  }, (e) => {
    // 连接失败，使用本地
    let res = {
      lists: localDB.localEList()
    }
    deal(res);
    !!callback && callback()
  })

  // 处理结果
  function deal(res) {
    // 更新列表
    expenseTB.temp.lists = expenseTB.temp.lists.concat(res.lists)
      // 计算今日支出
    let temp = expenseTB.temp.lists.filter((item) => {
      return item.date == expenseTB.temp.today
    });
    !!temp[0] && (expenseTB.temp.amount = temp[0].amount);
    !!callback && callback(res)
  }
}

/**
 * 推, 将最新账单信息推向服务器
 * @param callback 回调函数
 */
expenseTB.push = (callback) => {
  // 收集未提交列表
  let list = [],
    unPullEList = localDB.queryDict("unPullEList") || []
  unPullEList.forEach((item) => {
    let tmp = localDB.queryDict(item)
    list.push(tmp)
  })

  // 没有未提交数据
  if (!list[0]) {
    !!callback && callback(1)
    return
  }

  // 提交
  Vue.http.post('/expense/push', {
    expensesList: JSON.stringify(list)
  }).then((data) => {
    // SUCCESS
    localDB.saveDict("unPullEList", []);
    !!callback && callback(1)
  }, (e) => {
    // FAIL
    !!callback && callback(0)
  })
}

// 获取支出类型
/**
 * @param callback 回调函数
 */
expenseTB.getOutItems = (callback) => {
  Vue.http.get('/dict/getItem', {
    params: {
      name: "outItems"
    }
  }).then((data) => {
    let lists = data.data.value;
    // 保存到本地
    localDB.saveDict("outItems", lists);
    deal(lists)
  }, (e) => {
    let lists = localDB.queryDict("outItems")
    deal(lists)
  })

  // 处理数据
  function deal(lists) {
    expenseTB.temp.outItems = expenseTB.temp.outItems.concat(lists)

    !!callback && callback({
      outItems: lists
    })
  }
}

// 保存支出项目
/**
 * @param itemDetail 项目详情
 * @param callback 回调函数
 */
expenseTB.saveOutItem = (itemDetail, callback) => {
  let date = itemDetail.date,
    detail = {
      img: itemDetail.img,
      type: itemDetail.type,
      mess: itemDetail.mess,
      money: parseFloat(itemDetail.money).toFixed(2)
    },
    amount = parseFloat(detail.money),
    temp = expenseTB.temp.lists.filter((item) => {
      return item.date == date
    })

  // 更新支出列表
  if (temp[0]) {
    temp[0].detail.push(detail)
    amount += parseFloat(temp[0].amount)
    temp[0].amount = amount.toFixed(2)
    localDB.update(temp[0])
  } else {
    temp = {
      date: date,
      amount: amount.toFixed(2),
      detail: [detail]
    }
    expenseTB.temp.lists.push(temp)
    localDB.update(temp)
  }

  // 更新今日支出
  if (date == expenseTB.temp.today) {
    let acTmp = expenseTB.temp.amount
    acTmp = parseFloat(detail.money) + parseFloat(acTmp)
    expenseTB.temp.amount = acTmp.toFixed(2)
  }

  // 回调
  !!callback && callback()
}

export default expenseTB