import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'
import accounts from './accounts'
import bills from './bills'
import tags from './tags'
import Finance from '@/libs/finance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    bills (state, getters) {
      let { accounts, bills } = state
      let current = accounts.current
      accounts = accounts.list
      bills = bills.list
      return new Finance(accounts, bills).getBills(current)
    },
    childProperty (state) {
      let { bills, accounts } = state
      let current = accounts.current
      bills = bills.list
      accounts = accounts.list
      return new Finance(accounts, bills).getChildProperty(current)
    },
    dailyAmount (state) {
      let { bills, accounts } = state
      let current = accounts.current
      bills = bills.list
      accounts = accounts.list
      return new Finance(accounts, bills).getDailyAmount(current)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accounts,
    tags,
    bills
  }
})
