import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import accounts from './accounts'
import tags from './tags'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: '1'
  },
  getters: {
    account (state) {
      let { current, accounts } = state
      let list = accounts.list
      return _.find(list, ({ id }) => id === current) || list[0] || {}
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
    SET_CURRENT (state, id) {
      if (!id) {
        id = (state.accounts.list[0] || {}).id
      }
      state.current = id
    }
  },
  actions: {
  },
  modules: {
    accounts,
    tags
  }
})
