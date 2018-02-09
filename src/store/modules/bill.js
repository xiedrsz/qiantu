/**
 * @Description 账单数据流
 */
import _ from 'lodash'

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
      result.push({
        date: key,
        list: item
      })
    })
    return result
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
