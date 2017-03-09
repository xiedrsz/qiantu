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
 * @Param isSyn 是否为同步
 */
db.update = (item, isSyn) => {
  let date = item.date,
    key = "e-",
    unPullEList = store.getItem("unPullEList") || []

  date = date.replace(/[年月]/g, "-").replace("日", "")
  key += date
  store.setItem(key, item)

  if (!isSyn) {
    (unPullEList.indexOf(key) < 0) && unPullEList.push(key)
    store.setItem("unPullEList", unPullEList)
  }
}

/**
 * @Function 同步，将服务器最新账单列表同步到本地
 * @Param list Array 账单列表
 */
db.syn = (list) => {
  list.forEach(function (item) {
    db.update(item, true)
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