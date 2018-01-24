import Vue from 'vue'
import config from './config.json'

function plugin (Vue) {
  Vue.tpUtil = Vue.tpUtil || {}
  Vue.tpUtil.config = config
}

Vue.use(plugin)
