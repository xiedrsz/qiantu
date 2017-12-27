/**
 * 阅读支出统计分析
 * month
 * amount
 * detail
 *  class
 *  money
 */
import {
  ext, dataApi
} from '../libs'
import Table from './Table'
import expenseTB from './expenseTB'
import wealthTB from './wealthTB'

/**
 * @Description 表字段
 * @Param month String 被统计月份
 * @Param amount Number 月度消费金额
 */
let monthlyTB = new Table({
  month: dataApi.format('YYYY年MM月'),
  amount: 0
})

/**
 * @Function recalc 重新统计月度消费
 * @Note 目前只统计月度消费总金额
 */
monthlyTB.recalc = () => {
  let lists = []
  let mon = monthlyTB.temp.month
  let amount = 0
  let temp
  ext.extend(true, lists, expenseTB.temp.lists)
  temp = lists.filter((item) => {
    return item.date.indexOf(mon) > -1
  })

  temp.forEach((item) => {
    amount -= -item.amount
  })

  monthlyTB.temp.amount = amount
}

monthlyTB.calWealth = () => {
  let result, list
  result = []
  list = wealthTB.temp.list
  calc(list)
  console.table(result)

  function calc (list) {
    let wealth, len, history, next, hisLen, fist, last, floating, name
    // 项目长度
    len = list.length

    while (len--) {
      wealth = list[len]

      if (wealth.type === '1') {
        // 账单
        history = wealth.list.filter(item => {
          return /^2017年8月/.test(item.date)
        })
        hisLen = history.length
        if (hisLen > 0) {
          fist = history[0]
          last = history[--hisLen]
          floating = last.money - fist.money
          floating = +floating.toFixed(2)
          name = wealth.name

          floating && result.push({
            name,
            floating
          })
        }
      } else {
        next = wealth.list
        calc(next)
      }
    }
  }
}

monthlyTB.earnings = () => {
  let result, list, sum
  result = []
  list = wealthTB.temp.list[2].list
  calc(list)
  console.table(result)
  sum = 0
  result.forEach(item => {
    sum += item.sum
  })
  console.log(sum)

  function calc (list) {
    let wealth, len, history, next, hisLen, last, spread, sum, name, fist, deviation
    // let wealth, len, history, next, hisLen, fist, last, floating, name
    // 项目长度
    len = list.length

    while (len--) {
      wealth = list[len]

      if (wealth.type === '1') {
        // 账单
        history = wealth.list.filter(item => {
          return +item.money === 0
        })
        hisLen = history.length
        if (hisLen > 0) {
          name = wealth.name

          last = history[--hisLen]
          last = last.index
          history = wealth.list.slice(0, last + 1)
          sum = 0
          fist = history[0]
          fist = +fist.money
          history.forEach(item => {
            spread = -item.spread
            deviation = spread / fist
            if (deviation < -0.2 || deviation > 0.2) {
              sum += spread
            }
          })
          sum = +sum.toFixed(2)

          result.push({
            name,
            sum
          })
        }
      } else {
        next = wealth.list
        calc(next)
      }
    }
  }
}

// 全局调试
window.monthlyTB = monthlyTB

export default monthlyTB
