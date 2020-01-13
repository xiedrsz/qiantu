/**
 * @module tag 标签
 * @todo 暂时存储到 localStorage 中
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
  INIT_T_LIST (state, list) {
    state.list = list
  },
  PUT_T_TAG (state, tag) {
    state.list.push(tag)
  }
}

const actions = {
  get_Tags ({
    commit
  }) {
    let list = localStorage.getItem('tags') || '指数基金,债券基金,资金账户,涵涵'
    list = list.split(',')
    commit('INIT_T_LIST', list)
    return new Promise(resolve => {
      resolve(list)
    })
  },
  put_Tag ({
    state,
    commit
  }, tag) {
    commit('PUT_T_TAG', tag)
    let list = state.list
    list = list.join(',')
    localStorage.setItem('tags', list)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
