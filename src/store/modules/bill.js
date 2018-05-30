/**
 * @Description 账单数据流
 */
import _ from 'lodash'
import moment from 'moment'

// 属性
const bProps = ['id', 'mgdbId', 'trId', 'trMgdbId', 'money', 'date', 'recorded', 'note']

const state = {
  // 账单列表
  list: []
}

const getters = {
  // 获取列表
  get_bList (state, getters) {
    let result = _.cloneDeep(state.list)
    return result
  },
  // 获取当前财富账单
  get_billes (state, getters) {
    let children = getters.get_child_wealth
    let list = state.list
    let result = []
    list = mapTrBl(list, children)
    list = _.groupBy(list, 'date')
    _.forEach(list, (item, key) => {
      // 根据账单金额排序
      item.sort((a, b) => {
        return b.money - a.money
      })
      result.push({
        date: key,
        list: item
      })
    })
    // 排序
    result.sort((a, b) => {
      let date1 = a.date
      let date2 = b.date
      return moment(date1).isBefore(date2)
    })
    return result
  },
  // 获取当前财富近一年各月变动
  get_tr_change (state, getters) {
    let children = getters.get_child_wealth
    let list = state.list
    let sum = {}
    let curM = moment().month() + 1
    let result = []
    list = mapTrBl(list, children)
    // 筛掉一年前的账单
    list = _.filter(list, ({date}) => {
      let temp = moment(date)
      let dif = moment().diff(temp, 'months')
      return dif < 12
    })
    // 计算总值
    _.forEach(list, ({date, money}) => {
      let m = moment(date).month() + 1
      sum[m] ? (sum[m] += +money) : (sum[m] = +money)
    })
    // 赋值
    for (let i = 0; i < 12; i++) {
      let m = (12 + curM - i) % 12 || 12
      sum[m] = sum[m] || 0
      result.push({
        tem: sum[m],
        month: `${m}月`,
        isProfit: sum[m] >= 0
      })
    }
    return result.reverse()
  },
  // 获取当前财富近一月每日变动, Todo
  get_tr_daily (state, getters) {
    // 财富子集
    let children = getters.get_child_wealth
    // 当前财富
    let treasure = getters.get_treasure
    // 当前财富额
    let amount = treasure.amount
    // 账单列表
    let list = state.list
    let now = moment()
    let monago = moment().subtract(31, 'days').format('YYYY-MM-DD')
    let result = []
    list = mapTrBl(list, children)
    // 筛掉一月前的账单
    list = _.filter(list, ({date}) => {
      let temp = moment(date)
      let dif = now.diff(temp, 'days')
      return dif < 31
    })
    let tmpTime = now
    while (tmpTime.isAfter(monago)) {
      tmpTime = tmpTime.format('YYYY-MM-DD')
      let listTmp = _.filter(list, {
        date: tmpTime
      })
      let money = _.sum(_.map(listTmp, ({money}) => +money)) || 0
      result.push({
        date: tmpTime,
        amount: +amount
      })
      amount -= money
      tmpTime = moment(tmpTime).subtract(1, 'days')
    }
    return result.reverse()
  },
  // 获取当前财富近一年各月收益情况,(针对非储蓄财富)
  get_tr_profit (state, getters) {
    // Todo
  }
}

const mutations = {
  // 初始化
  init_bill (state, list) {
    state.list = list
  },
  // 保存账单
  save_bill (state, list) {
    let listSrc = state.list
    _.forEach(list, item => {
      let {index, id} = item
      let temp = _.pick(item, bProps)
      let bill
      if (index !== undefined) {
        bill = listSrc[index]
        _.assign(bill, temp)
      } else if (id !== '') {
        bill = _.filter(listSrc, {
          id
        })[0]
        _.assign(bill, temp)
      } else {
        listSrc.push(temp)
      }
    })
  },
  // 删除账单
  remove_bill (state, id) {
    let list = state.list.slice(0)
    _.remove(list, _.matchesProperty('id', id))
    state.list = list
  }
}

const actions = {
  // 保存账单
  save_bill ({
    dispatch,
    commit
  }, option) {
    let {bill, handle} = option
    let {code, diff} = bill
    bill = _.pick(bill, bProps)
    commit('save_bill', [bill])
    dispatch('calc_amount', {
      code,
      diff
    })
    handle()
  },
  // 删除账单
  remove_bill ({
    dispatch,
    commit,
    state
  }, option) {
    let {bill, handle} = option
    let {id, code, money} = bill
    commit('remove_bill', id)
    dispatch('calc_amount', {
      code,
      diff: -money
    })
    handle()
  }
}

// 配对 bill 与 treasure
function mapTrBl (list, children) {
  let maps = {}
  let result = []
  _.forEach(children, (item, index) => {
    let id = `_${item.id}`
    maps[id] = index
  })
  _.forEach(list, item => {
    let trId = `_${item.trId}`
    let index = maps[trId]
    let treasure
    if (index >= 0) {
      treasure = children[index]
      result.push({
        ...treasure,
        ...item
      })
    }
  })
  return result
}

export default {
  state,
  mutations,
  actions,
  getters
}
