import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
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
      let posterity = getters.relationship
      let list = bills.list
      posterity = _.union(posterity, [current])
      list = _.filter(list, ({ consumption, capital }) => {
        return posterity.includes(consumption) || posterity.includes(capital)
      })
      list = _.groupBy(list, ({ date }) => {
        return +/(\d{2})月/.exec(date)[1]
      })
      list = _.map(list, collection => {
        let month = collection[0].date
        let inflow = 0
        let outflow = 0
        month = +/(\d{2})月/.exec(month)[1]
        collection = _.map(collection, ({ date, capital, consumption, money, ...other }) => {
          let day = +/(\d{2})日/.exec(date)[1]
          let total = 0
          total += posterity.includes(consumption) ? +money : 0
          total += posterity.includes(capital) ? -money : 0
          money = capital === current ? -money : money
          inflow += total > 0 ? total : 0
          outflow += total < 0 ? total : 0
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
          inflow,
          outflow,
          bills: collection
        }
      })
      return list
    },
    childProperty (state) {
      let { bills, accounts } = state
      let current = accounts.current
      bills = bills.list
      accounts = accounts.list
      return new Finance(accounts, bills).getChildProperty(current)
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
