/**
 * @File 财富统计表
 */
import Vue from 'vue'
import table from './table'
import {
  ext, localDB
}
from '../libs'

let wealthTB = new table({
  value: 0.00,
  list: []
})

/**
 * @Description 其他数据(外加数据)
 * @Param isSyn string 是否已同步，[0: 否, 1: 是]
 */
wealthTB.other = {
  isSyn: "1"
}

/**
 * @Function 初始化， 从服务器获取到财富
 */
wealthTB.init = () => {
  Vue.http.get('/wealth/pull').then((data) => {
    let wealth = data.body;
    (wealth.size !== 0) && ext.extend(wealthTB.temp, wealth)
    wealthTB.saveToLocal()
  }, (e) => {
    // 连接失败，使用本地
    let loc = localDB.queryDict("myWealth") || {}
    ext.extend(wealthTB.temp, loc)
  })
}

/**
 * @Function 将财富信息更新到服务器
 */
wealthTB.push = () => {
  Vue.http.post('/wealth/push', {
    wealth: JSON.stringify(wealthTB.temp)
  }).then((data) => {
    let id = data.body._id
    wealthTB.temp._id = id
    wealthTB.other.isSyn = "1"
    wealthTB.saveToLocal()
  }, (e) => {
    wealthTB.other.isSyn = "0"
    wealthTB.saveToLocal()
  })
}

/**
 * @Function 保存修改的列表项
 * @Param item Object 财富
 * @Param callback 更新完成回调函数
 * 注：
 *  使用 pos 表示位置，[undefined: 大分类新增， 0、1...: 大分类修改， 0-、1-：小分类新增，0-0、0-1：小分类修
 *  改]
 */
wealthTB.save = (item, callback) => {
  let pos = item.pos,
    i = 0,
    wealth, len, index;

  if (pos === undefined) {
    wealthTB.temp.list = wealthTB.temp.list.concat(item);
  } else {
    pos += ""
    pos = pos.split("-")
    len = pos.length
    wealth = wealthTB.temp
    for (; i < len; i++) {
      index = pos[i]
      if (i == len - 1) {
        if (index === "") {
          wealth.list = wealth.list.concat(item)
        } else {
          index = +index
          wealth.list[index] = item
        }
      } else {
        index = +index
        wealth = wealth.list[index]
      }
    }
  }

  !!callback && callback()
}

/**
 * @Function calc 计算
 * @Param index String 位置 [eg: 0-0]
 * @Param diff Number 变动金额
 */
wealthTB.calc = (index, diff) => {
  let arr = index.split("-").reverse(),
    len = arr.length,
    temp = wealthTB.temp

  temp.value = +temp.value + diff
  while (--len) {
    temp.list[arr[len]].value = +temp.list[arr[len]].value + diff
  }

  account(wealthTB.temp)
}

/**
 * @Function saveToLocal 保存到本地
 */
wealthTB.saveToLocal = () => {
  localDB.saveDict("myWealth", wealthTB.temp)
  localDB.saveDict("wealth_issyn", wealthTB.other.isSyn)
}

/**
 * @Function getIcons 获取图标
 */
wealthTB.getIcons = () => {
  return [{
    src: '/static/img/card.png',
    name: '储蓄'
  }, {
    src: '/static/img/fund.png',
    name: '基金'
  }, {
    src: '/static/img/K.png',
    name: '股票'
  }, {
    src: '/static/img/loan.png',
    name: '借贷'
  }, {
    src: '/static/img/wallet.png',
    name: '钱包'
  }]
}

/**
 * @Function account 计算百分比
 * @Param obj object 被计算对象
 */
function account(obj) {
  let type = obj.type,
    sum, rate
  if (type !== "1") {
    sum = obj.value;
    obj.list.forEach((item) => {
      rate = item.value / sum * 100
      item.account = rate.toFixed(2) + "%"
      account(item)
    })
  }
}

// ============================ 初始化 ============================
let isSyn = localDB.queryDict("wealth_issyn") || "1",
  loc = localDB.queryDict("myWealth") || {}
if (isSyn == "1") {
  wealthTB.init()
} else {
  ext.extend(wealthTB.temp, loc)
  wealthTB.push()
}

export default wealthTB