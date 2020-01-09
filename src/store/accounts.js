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
import _ from 'lodash'

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
      parent: ''
    }
  ]
}

const getters = {
  collection (state) {
    let list = state.list
    return list.filter(({ isCollection }) => isCollection)
  }
}

const mutations = {
  INIT_LIST (state, list) {
    state.list = list
  },
  PUSH_ACCOUNT (state, account) {
    state.list.push(account)
  }
}

const actions = {
  get_Accounts ({
    commit,
    state
  }, cb) {
    let data = [{
      id: '1',
      code: '',
      name: '总资产',
      capitalization: 8000,
      share: '',
      isCollection: true,
      tags: '',
      note: '',
      parent: ''
    }, {
      id: '2',
      code: '',
      name: '基金',
      capitalization: 8000,
      share: '',
      isCollection: true,
      tags: '',
      note: '',
      parent: '1'
    }, {
      id: '3',
      code: '',
      name: '理财通',
      capitalization: 8000,
      share: '',
      isCollection: true,
      tags: '',
      note: '',
      parent: '2'
    }]
    commit('INIT_LIST', data)
  },
  save_account ({
    commit,
    state
  }, account) {
    let id = account.id
    if (id) {
      let list = state.list
      let last = _.find(list, {
        id
      })
      Object.assign(last, account)
      commit('INIT_LIST', list)
    } else {
      account.id = _.random(1000) + ''
      commit('PUSH_ACCOUNT', account)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
