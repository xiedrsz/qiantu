import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Bill from '@/pages/Bill'
import Page3 from '@/pages/Page3'
import Info from '@/pages/Info'
import Backups from '@/pages/Backups'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/bill',
    name: 'Bill',
    component: Bill
  }, {
    path: '/page3',
    name: 'Page3',
    component: Page3
  }, {
    name: 'Info',
    path: '/info/:isCurrent',
    component: Info
  }, {
    name: 'Backups',
    path: '/backups/:isCurrent',
    component: Backups
  }]
})
