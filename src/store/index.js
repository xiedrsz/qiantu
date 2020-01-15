import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import accounts from './accounts'
import bills from './bills'
import tags from './tags'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    bills (state) {
      let { accounts, bills } = state
      let current = accounts.current
      let list = bills.list
      list = _.filter(list, ({ consumption, capital }) => {
        return consumption === current || capital === current
      })
      list = _.groupBy(list, ({ date }) => {
        return +/(\d{2})月/.exec(date)[1]
      })
      list = _.map(list, collection => {
        let month = collection[0].date
        let inflow = 0
        let outflow = 0
        month = +/(\d{2})月/.exec(month)[1]
        collection = _.map(collection, ({ date, capital, money, ...other }) => {
          let day = +/(\d{2})日/.exec(date)[1]
          money = capital === current ? -money : money
          inflow += money > 0 ? +money : 0
          outflow += money < 0 ? +money : 0
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
