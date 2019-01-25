/**
 * @desc 金融公式
 */
import _ from 'lodash'
import moment from 'moment'

// 今年
const ToYear = moment().year()

/**
 * @func 账单转换
 * @param {Array} bills 原始账单
 */
function transform (bills) {
  let res = []
  _.forEach(bills, ({date, list}) => {
    let yd = _.filter(list, {
      recorded: false
    })
    let inc = _.filter(list, {
      recorded: true
    })
    if (yd.length) {
      let money = _.sumBy(yd, ({money}) => +money)
      res.push({
        money,
        date,
        recorded: false
      })
    }
    if (inc.length) {
      let money = _.sumBy(inc, ({money}) => +money)
      res.push({
        money,
        date,
        recorded: true
      })
    }
  })
  res.sort((a, b) => {
    let date1 = moment(a.date)
    let date2 = moment(b.date)
    let flag = date2.diff(date1, 'days')
    return flag
  })
  return res
}

/**
 * @func 计算收益率
 * @param {Array} bills 已转换过的账单
 */
function calcYield (bills) {
  let yields = _.filter(bills, {
    recorded: false
  })
  if (!yields.length) {
    // 没有收益
    return 0
  }
  let lastDate = yields[0].date
  let property = _.filter(bills, ({recorded, date}) => {
    let flag = moment(date).isBefore(lastDate)
    return recorded && flag
  })
  let totalDays
  lastDate = moment(lastDate)
  property = _.map(property, ({date, ...other}) => {
    let days
    date = moment(date)
    days = lastDate.diff(date, 'days')
    return {
      ...other,
      days
    }
  })
  // 总时长
  totalDays = _.maxBy(property, 'days').days
  // 平均日收益
  yields = _.sumBy(yields, 'money') / totalDays
  // 平均日资产
  property = _.sumBy(property, ({money, days}) => money * days) / totalDays
  return yields / property * 36500
}

/**
 * @func 计算历史收益率
 * @param {Array} bills 已转换过的账单
 */
function calcYields (bills) {
  let yields
  bills = _.map(bills, (item, index) => {
    return {
      ...item,
      index
    }
  })
  yields = _.filter(bills, {
    recorded: false
  })
  yields = _.map(yields, ({index, date}) => {
    let temp = bills.slice(index)
    let res = calcYield(temp)
    return {
      date,
      yields: res
    }
  })
  return yields
}

/**
 * @func 汇总月份收益
 * @param {Array} bills 已转换过的账单
 */
function monthyYields (bills) {
  let yields = _.filter(bills, {
    recorded: false
  })
  let month = 0
  let result = []
  while (month++ < 12) {
    let temp = _.filter(yields, ({date}) => {
      month = `00${month}`.slice(-2)
      return moment(date).isSame(`${ToYear}-${month}-01`, 'month')
    })
    temp.length && result.push({
      list: temp,
      month
    })
  }
  result = _.map(result, ({month, list}) => {
    let yields = _.sumBy(list, 'money')
    return {
      month,
      yields
    }
  })
  return result
}

/**
 * @func 汇总日资产
 * @param {Array} bills 原始账单
 */
function dailyProperty (bills) {
  let last = 0
  let res = _.map(bills, ({date, list}) => {
    let total = _.sumBy(list, ({money}) => +money)
    return {
      date,
      total
    }
  })
  res.reverse()
  res = _.map(res, ({date, total}) => {
    last += total
    return {
      date,
      property: last
    }
  })
  return res
}

export default {
  transform,
  calcYield,
  calcYields,
  monthyYields,
  dailyProperty
}
