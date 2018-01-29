/**
 * @Description 账单数据流
 */
const state = {}

const getters = {
  // 获取当前财富账单
  get_billes (state, getters) {
    // Todo
    return [
      {
        date: '10/01/2018',
        list: [{
          name: '国寿嘉年月月盈',
          money: 5.78
        }, {
          name: '民生加银月度理财',
          money: -0.98
        }]
      }
    ]
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
