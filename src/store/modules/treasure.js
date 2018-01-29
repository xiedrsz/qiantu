/**
 * @Description 财富业务数据流
 */
const state = {}

const getters = {
  // 获取当前财富
  get_treasure (state, getters) {
    // Todo
    return {
      name: '国寿嘉年月月盈',
      amount: 13489.02,
      speed: 239.78
    }
  },
  // 获取财富子集
  get_children () {
    return [{
      name: '国寿嘉年月月盈',
      short: '国盈',
      code: '0000',
      proportion: '20.38'
    }, {
      name: '民生加银月度理财',
      short: '民银',
      code: '0001',
      proportion: '50.38'
    }, {
      name: '国寿嘉年双周盈',
      short: '国双',
      code: '0002',
      proportion: '19.08'
    }, {
      name: '余额+',
      short: '余额',
      code: '0003',
      proportion: '28.94'
    }, {
      name: '零钱通',
      short: '零通',
      code: '0004',
      proportion: '40.38'
    }]
  }
}

const mutations = {}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
