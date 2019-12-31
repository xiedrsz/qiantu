/**
 * @module selectBox 模块
 */

/**
 * prop table
 * ================================
 *   node   checked  pos  childs
 *  节点名称  是否展开  位置  子节点
 * ================================
 */

const state = {
  // 选择框
  selectBox: {
    name: '',
    pos: '',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    actions: ['add', 'up', 'down', 'copy', 'delete']
  }
}

const getters = {}

const mutations = {
  SET_SELECTBOX (state, selectBox) {
    Object.assign(state.selectBox, selectBox)
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
