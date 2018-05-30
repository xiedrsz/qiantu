import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import '@/libs'
import router from './router'
import './config'
// 引入样式
require('./assets/sass/app.less')

// 路由跳转前
router.beforeEach((to, from, next) => {
  // 关闭菜单
  store.commit('dv_toggle_mode', '')
  next()
})

// 创建应用实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
