/**
 * view或者业务逻辑发出，dispatch派发事件给actions=>actions 会commit事件给mutations,操作state
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import device from './modules/device'
import treasure from './modules/treasure'
import bill from './modules/bill'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    device,
    treasure,
    bill
  }
})
