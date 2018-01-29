/**
 * @Description 设备信息
 */
const HEIGHT = document.documentElement.clientHeight
const state = {
  // 设备高度
  height: HEIGHT,
  // 是否在同步
  isSyn: 0
}

const getters = {}

const mutations = {
  // 设置同步状态
  dv_set_issyn (state, status) {
    if (status !== undefined) {
      state.isSyn = status
    } else {
      state.isSyn = !state.isSyn
    }
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
