/**
 * 路由配置文件
 * xiedrsz
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from '../App'
import store from '../vuex/store'

// 引入路由插件
Vue.use(VueRouter)

const commit = store.commit || store.dispatch

// 创建路由
const router = new VueRouter({
  routes
})

// 转场设计，待优化
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((
  to, from, next
) => {
  // 转场控制
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }

  next()
})

// 启动路由
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
