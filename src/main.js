import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import '@/libs'
import router from './router'
import './config'
// 引入样式
require('./assets/sass/app.less')

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
