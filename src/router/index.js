import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Page2 from '@/pages/Page2'
import Page3 from '@/pages/Page3'
import Page4 from '@/pages/Page4'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/page2',
    name: 'Page2',
    component: Page2
  }, {
    path: '/page3',
    name: 'Page3',
    component: Page3
  }, {
    path: '/page4',
    name: 'Page4',
    component: Page4
  }]
})
