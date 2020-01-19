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
import _ from 'lodash'
import { getBillList, putBill } from '@/db'
import Finance from '@/libs/finance'

const state = {
  // 列表
  list: [],
  current: ''
}

const getters = {
  bill (state) {
    let { list, current } = state
    return new Finance().setBills(list).getBillOfAccount(current)
  }
}

const mutations = {
  INIT_B_LIST (state, list) {
    state.list = list
  },
  SET_B_CURRENT (state, id) {
    state.current = +id
  },
  PUT_BILL (state, bill) {
    let id = bill.id
    let last = _.find(state.list, {
      id
    })
    if (last) {
      Object.assign(last, bill)
    } else {
      state.list.push(bill)
    }
  }
}

const actions = {
  async get_Bills ({
    commit
  }) {
    let list = await getBillList()
    commit('INIT_B_LIST', list)
  },
  async put_bill ({
    commit
  }, bill) {
    bill.id = await putBill(bill)
    commit('PUT_BILL', bill)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
