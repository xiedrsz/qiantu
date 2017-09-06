import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  direction: 'forward',
  showLoading: false,
  toastOPT: {
    show: false,
    type: 'success',
    width: '',
    msg: ''
  },
  menuClass: ''
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    LOADING (state, ifShow) {
      state.showLoading = ifShow
    },
    UPDATE_TOAST (state, toastOPT) {
      state.toastOPT = {
        show: toastOPT.show || true,
        type: toastOPT.type || 'success',
        width: toastOPT.width || '',
        msg: toastOPT.msg || ''
      }
    },
    UPDATE_MENUCLASS (state, menuClass) {
      state.menuClass = menuClass
    }
  }
})
