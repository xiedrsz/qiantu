/**
 * @module bill 账单
 */

/**
 * prop table
 * ================================
 *   node   checked  pos  childs  // 市值 capitalization: 8000,
 *  节点名称  是否展开  位置  子节点
 * ================================
 */

const state = {
  // 列表
  list: []
}

const getters = {
}

const mutations = {
  INIT_B_LIST (state, list) {
    state.list = list
  }
}

const actions = {
  get_Bills ({
    commit
  }) {
    let list = [{
      // id
      id: 1,
      // 消费
      consumption: 4,
      // 资金
      capital: 3,
      // 交易份额
      share: 200,
      // 交易金额
      money: 200,
      // 日期
      date: '2019年10月19日',
      // 交易类型
      type: '',
      // 备注
      note: ''
    }]
    commit('INIT_B_LIST', list)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
