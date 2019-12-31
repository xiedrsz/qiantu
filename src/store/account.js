/**
 * @module account 账户
 */

/**
 * prop table
 * ================================
 *   node   checked  pos  childs
 *  节点名称  是否展开  位置  子节点
 * ================================
 */

const state = {
  // 列表
  list: [
    {
      // id
      id: '1',
      // 代码
      code: '',
      // 名称
      name: '总资产',
      // 市值
      capitalization: 8000,
      // 份额
      share: '',
      // 集合
      isCollection: false,
      // 标签
      tags: '',
      // 备注
      note: '',
      // 归属
      parant: ''
    }
  ]
}

const getters = {}

const mutations = {
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
