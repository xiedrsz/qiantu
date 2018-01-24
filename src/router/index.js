import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '@/pages/Page1'
import Page2 from '@/pages/Page2'
import Page3 from '@/pages/Page3'
import Page4 from '@/pages/Page4'
import Page5 from '@/pages/Page5'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/Page1'
  }, {
    path: '/page1',
    name: 'Page1',
    component: Page1
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
  }, {
    path: '/page5',
    name: 'Page5',
    component: Page5
  }]
})
