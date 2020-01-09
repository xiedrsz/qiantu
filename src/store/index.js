import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import accounts from './accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: '1'
  },
  getters: {
    account (state) {
      let { current, accounts } = state
      let list = accounts.list
      return _.find(list, ({ id }) => id === current)
    },
    children (state) {
      let { current, accounts } = state
      let list = accounts.list
      return _.filter(list, ({ parent }) => parent === current).map(({ id, ...other }) => {
        let children = _.filter(list, ({ parent }) => parent === id)
        return {
          ...other,
          id,
          children
        }
      })
    }
  },
  mutations: {
    SET_CURRENT (state, id = '1') {
      state.current = id
    }
  },
  actions: {
  },
  modules: {
    accounts
  }
})
