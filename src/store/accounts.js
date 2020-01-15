/**
 * @module account 账户
 */
import _ from 'lodash'
import { getAccountList, putAccount } from '@/db'

/**
 * prop table
 * ================================
 *   node   checked  pos  childs  // 市值 capitalization: 8000,
 *  节点名称  是否展开  位置  子节点
 * ================================
 */

const state = {
  // 列表
  list: [],
  current: ''
}

const getters = {
  collection (state) {
    let list = state.list
    return list.filter(({ isCollection }) => isCollection)
  },
  capitals (state) {
    let list = state.list
    return list.filter(({ tags }) => tags.includes('资金账户'))
  },
  accounts (state) {
    let list = state.list
    return list.filter(({ isCollection }) => !isCollection)
  }
}

const mutations = {
  INIT_LIST (state, list) {
    state.list = list
  },
  SET_A_CURRENT (state, id) {
    if (!id) {
      id = (state.list[0] || {}).id
    }
    state.current = +id
  },
  PUT_ACCOUNT (state, account) {
    let id = account.id
    let last = _.find(state.list, {
      id
    })
    if (last) {
      Object.assign(last, account)
    } else {
      state.list.push(account)
    }
  }
}

const actions = {
  async get_Accounts ({
    commit
  }) {
    let list = await getAccountList()
    let current = list[0].id
    commit('SET_A_CURRENT', current)
    commit('INIT_LIST', list)
  },
  async save_account ({
    commit
  }, account) {
    account.id = await putAccount(account)
    commit('PUT_ACCOUNT', account)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
