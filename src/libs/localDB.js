/**
 * 针对本应用的本地数据库
 * ====================
 * [1] 账单键命名规则： e-日期, eg: e-2017-02-07
 */
'use strict';

import store from "./store"

let db = {}

/**
 * @Function 更新，将单天的账单更新到服务器
 * @Param item 账单信息
 */
db.update = (item) => {
  let date = item.date,
    key = "e-"

  date = date.replace(/[年月]/g, "-").replace("日", "")
  key += date

  store.setItem(key, item)

  return key
}

/**
 * @Function 同步，将服务器最新账单列表同步到本地
 * @Param list Array 账单列表
 */
db.syn = (list) => {
  list.forEach(function (item) {
    db.update(item)
  })
}

/**
 * @Function 获取本地账单列表
 */
db.localEList = () => {
  return store.traverse(/^e(\-\d+){3}$/).reverse()
}

/**
 * @Function 保存数据字典
 * @Param item string 字典名称
 * @Param value 值
 */
db.saveDict = (item, value) => {
  store.setItem(item, value)
}

/**
 * @Function 查询数据字典
 * @Param item string 字典名称
 */
db.queryDict = (item) => {
  return store.getItem(item)
}

export default db