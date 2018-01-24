/**
 * 操作state.js数据
 * @type {String}
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_PROMPT] (state, prompt) {
    state.prompt = {
      show: prompt.show === undefined ? true : prompt.show,
      msg: prompt.msg,
      callback: prompt.callback === undefined ? null : prompt.callback,
      cancel: !!prompt.cancel
    }
  },
  [types.CLOSE_PROMPT] (state, prompt) {
    state.prompt = Object.assign(state.prompt, {
      show: false
    })
  },
  [types.UPDATE_TOAST] (state, obj) {
    state.toastOPT = {
      show: obj.show || true,
      type: obj.type || 'success',
      width: obj.width || '',
      msg: obj.msg || ''
    }
  },
  [types.SET_LOADING] (state, flag) {
    state.showLoading = flag
  }
}
export default mutations
