/**
 * @File 财富统计表
 */

import table from './table'
import ext from '../libs/extend.min'

let wealthTB = new table({
  value: 0.00,
  list: []
})

/**
 * @Function 更新列表
 * @Param callback 更新完成回调函数
 */
wealthTB.update = (callback) => {
  let list = wealthTB.temp.list,
    sum = 0
    // 统计总财富
  list.forEach((item) => {
    sum += item.value
  });
  wealthTB.temp.value = sum;
  // 计算财富占比
  list.forEach((item) => {
    item.account = (item.value / sum * 100).toFixed(2) + '%'
  });
  // 排序
  list = list.sort((a, b) => {
    return b.value - a.value;
  })

  !!callback && callback()
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

wealthTB.update()

export default wealthTB