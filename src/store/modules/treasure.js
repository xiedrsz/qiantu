/**
 * @Description 财富业务数据流
 */
import _ from 'lodash'
import moment from 'moment'
import Chained from '@/libs/Chained'

// 属性
const trProps = ['id', 'mgdbId', 'name', 'short', 'code', 'icon', 'note', 'iscollection', 'amount']

let calcYield = (bills, amount) => {
  bills = _.map(bills, ({date, list}) => {
    let money = _.sum(_.map(list, ({money}) => +money))
    list = _.filter(list, ({recorded}) => !recorded)
    let myield = _.sum(_.map(list, ({money}) => +money))
    amount -= money
    money = money.toFixed(2)
    myield = myield.toFixed(2)
    amount = amount.toFixed(2)
    return {
      date, money, myield, amount
    }
  })
  let result = _.reduceRight(bills, ({last, yields = []}, {date, myield, amount}) => {
    if (last) {
      let mLast = moment(last)
      let mdate = moment(date)
      let days = mdate.diff(mLast, 'days')
      let annualized = myield / amount / days * 365 * 100 || 0
      !annualized && (days = 0)
      annualized = annualized.toFixed(2)
      yields.push({
        annualized,
        days
      })
    }
    return {
      last: date,
      yields
    }
  }, {})
  result = result.yields
  let totalDays = _.sum(_.map(result, 'days'))
  result = _.sum(_.map(result, ({annualized, days}) => annualized * days)) / totalDays || 0
  result = result.toFixed(2)
  return result
}

const state = {
  // 财富列表
  list: [],
  // 当前被选财富
  current: '00'
}

const getters = {
  // 获取列表
  get_tList (state, getters) {
    let result = _.cloneDeep(state.list)
    return result
  },
  // 获取当前财富
  get_treasure (state, getters) {
    let current = state.current
    let treasure = _.filter(state.list, {
      code: current
    })[0]
    // Todo
    return {
      ...treasure,
      speed: 239.78
    }
  },
  // 获取财富子集
  get_children (state, getters) {
    let current = state.current
    let list = state.list
    let treasure = _.filter(list, {
      code: current
    })[0] || {}
    let amount = treasure.amount || 1
    let reg = new RegExp(`^${current}-\\d{2}$`)
    let children = _.filter(list, item => (reg.test(item.code)))
    children = _.map(children, tmp => {
      let tamount = tmp.amount
      let proportion = +amount ? (tamount / amount * 100).toFixed(2) : '0.00'
      return {
        ...tmp,
        proportion
      }
    })
    // 排序
    children.sort((a, b) => {
      return b.proportion - a.proportion
    })
    return children
  },
  // 获取集合
  get_collection (state, getters) {
    let list = _.filter(state.list, {
      iscollection: true
    })
    list = _.map(list, item => ({key: item.code, value: item.name}))
    return list
  },
  // 获取财富列表，子集或自己
  get_wealth (state, getters) {
    let current = state.current
    let treasure = _.filter(state.list, {
      code: current
    })[0] || {}
    let iscollection = treasure.iscollection
    let reg
    let result
    if (!iscollection) {
      // current = current.slice(0, -3)
      // 返回自己
      return [treasure]
    }
    reg = new RegExp(`^${current}-`)
    result = _.filter(state.list, item => {
      let flag1 = reg.test(item.code)
      let flag2 = item.iscollection === false
      return flag1 && flag2
    })
    return result
  },
  // 获取子集财富
  get_child_wealth (state, getters) {
    let current = state.current
    let treasure = _.filter(state.list, {
      code: current
    })[0] || {}
    let iscollection = treasure.iscollection
    let reg
    let result
    if (!iscollection) {
      return [treasure]
    }
    reg = new RegExp(`^${current}-`)
    result = _.filter(state.list, item => {
      let flag1 = reg.test(item.code)
      let flag2 = item.iscollection === false
      return flag1 && flag2
    })
    return result
  },
  // 收益计算(年化收益率)
  get_current_yield (state, getters) {
    let current = getters.get_treasure
    let bills = getters.get_billes
    let amount = current.amount
    bills = _.map(bills, ({date, list}) => {
      let money = _.sum(_.map(list, ({money}) => +money))
      list = _.filter(list, ({recorded}) => !recorded)
      let myield = _.sum(_.map(list, ({money}) => +money))
      amount -= money
      money = money.toFixed(2)
      myield = myield.toFixed(2)
      amount = amount.toFixed(2)
      return {
        date, money, myield, amount
      }
    })
    let result = _.reduceRight(bills, ({last, yields = []}, {date, myield, amount}) => {
      if (last) {
        let mLast = moment(last)
        let mdate = moment(date)
        let days = mdate.diff(mLast, 'days')
        let annualized = myield / amount / days * 365 * 100 || 0
        !annualized && (days = 0)
        annualized = annualized.toFixed(2)
        yields.push({
          annualized,
          days
        })
      }
      return {
        last: date,
        yields
      }
    }, {})
    result = result.yields
    let totalDays = _.sum(_.map(result, 'days'))
    result = _.sum(_.map(result, ({annualized, days}) => annualized * days)) / totalDays || 0
    result = result.toFixed(2)
    return result
  },
  // 获取排行榜
  get_ranking (state, getters) {
    // Todo
    let bills = getters.get_bList
    let wealths = new Chained(state.list)
    let ranking = wealths
      .filter(({code, iscollection, amount}) => {
        return /^00-03/.test(code) && !iscollection && +amount
      })
      .map(({icon, name, id, amount}) => {
        let bill = new Chained(bills)
          .filter({trId: id})
          .groupBy('date')
          .mapValues((value, key) => {
            return {
              date: key,
              list: value
            }
          })
          .values()
          .over()
          .sort((a, b) => {
            let date1 = a.date
            let date2 = b.date
            return moment(date1).isBefore(date2)
          })
        let myield = calcYield(bill, amount)
        return {
          icon, name, myield
        }
      })
      .filter(({myield}) => +myield)
      .over()
      .sort((a, b) => {
        return b.myield - a.myield
      })
    return ranking
  }
}

const mutations = {
  // 初始化
  init_treasure (state, list) {
    state.list = list
  },
  // 保存财富
  save_treasure (state, list) {
    let listSrc = state.list
    _.forEach(list, item => {
      let {index, id} = item
      let temp = _.pick(item, trProps)
      let treasure
      if (index !== undefined) {
        treasure = listSrc[index]
        _.assign(treasure, temp)
      } else if (id !== '') {
        treasure = _.filter(listSrc, {
          id
        })[0]
        _.assign(treasure, temp)
      } else {
        listSrc.push(temp)
      }
    })
  },
  // 设置当前财富
  tr_set_current (state, code) {
    state.current = code
  },
  // 计算总额
  calc_amount (state, option) {
    let {code, diff} = option
    let list = state.list
    let temp = _.filter(list, {
      code
    })[0]
    let amount = temp.amount
    amount = (+amount + +diff).toFixed(2)
    temp.amount = amount
  }
}

const actions = {
  // 保存财富
  save_treasure ({
    dispatch,
    commit,
    state
  }, option) {
    let {treasure, handle} = option
    let {id, parent, changes, amount} = treasure
    let oldCode = treasure.code || ''
    let oldParent = oldCode.slice(0, -3)
    let list = state.list
    let code = getCode(list, parent)
    treasure = _.assign({
      id: '',
      mgdbId: '',
      code,
      amount: 0
    }, treasure)
    if (id) {
      if (~changes.indexOf('parent')) {
        console.log('归属发生了变化')
        treasure.code = code
        dispatch('calc_amount', {
          code: oldParent,
          diff: -amount
        })
        dispatch('calc_amount', {
          code: parent,
          diff: amount
        })
      }
      if (~changes.indexOf('iscollection')) {
        console.log('是否集合发生了变化')
      }
    }
    treasure = _.pick(treasure, trProps)
    commit('save_treasure', [treasure])
    handle()
  },
  // 计算金额
  calc_amount ({
    commit
  }, option) {
    let {code, diff} = option
    while (code !== '') {
      commit('calc_amount', {
        code,
        diff
      })
      code = code.slice(0, -3)
    }
  }
}

function getCode (list, parent) {
  let reg = new RegExp(`^${parent}-\\d{2}`)
  let children = _.filter(list, item => (reg.test(item.code)))
  let len = children.length
  len = `0${len}`.slice(-2)
  return `${parent}-${len}`
}

export default {
  state,
  mutations,
  actions,
  getters
}
