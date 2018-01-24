import Vue from 'vue'
import store from '../store'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
const commit = store.commit || store.dispatch
let util = {
  toastShow (obj = {}) {
    let o = {
      width: '18.9em',
      time: Vue.tpUtil.config.toastTimeout,
      type: 'text',
      text: 'Loading'
    }
    Object.assign(o, obj)
    Vue.$vux.toast.show(o)
  }
}

function plugin (Vue) {
  Vue.tpUtil = Object.assign(Vue.tpUtil, util)
  // 弹出提示
  let prompt = (msg, callback, cancel) => {
    commit('SET_PROMPT', {
      msg: msg,
      callback: callback,
      cancel: cancel
    })
  }

  Vue.prompt = prompt

  Object.defineProperties(Vue.prototype, {
    $prompt: {
      get () {
        return prompt
      }
    }
  })
}

Vue.use(plugin)
