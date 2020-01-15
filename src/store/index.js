import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import accounts from './accounts'
import bills from './bills'
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
    },
    bill (state) {
      let { current, bills } = state
      let list = bills.list
      list = _.filter(list, ({ consumption, capital }) => {
        return consumption === current || capital === current
      })
      list = _.groupBy(list, ({ date }) => {
        return +/(\d{2})月/.exec(date)[1]
      })
      list = _.map(list, collection => {
        let month = collection[0].date
        month = +/(\d{2})月/.exec(month)[1]
        collection = _.map(collection, ({ date, capital, money, ...other }) => {
          let day = +/(\d{2})日/.exec(date)[1]
          money = capital === current ? -money : money
          return {
            ...other,
            date,
            capital,
            money,
            day
          }
        })
        return {
          month,
          bills: collection
        }
      })
      return list
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
    tags,
    bills
  }
})
