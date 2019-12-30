import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/backup',
    name: 'backup',
    component: function () {
      return import(/* webpackChunkName: "backup" */ '../views/Backup.vue')
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: function () {
      return import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
    }
  },
  {
    path: '/newbill',
    name: 'newBill',
    component: function () {
      return import(/* webpackChunkName: "newbill" */ '../views/NewBill.vue')
    }
  },
  {
    path: '/newevent',
    name: 'newEvent',
    component: function () {
      return import(/* webpackChunkName: "newevent" */ '../views/NewEvent.vue')
    }
  },
  {
    path: '/newplan',
    name: 'newPlan',
    component: function () {
      return import(/* webpackChunkName: "newplan" */ '../views/NewPlan.vue')
    }
  },
  {
    path: '/newproperty',
    name: 'newProperty',
    component: function () {
      return import(/* webpackChunkName: "newproperty" */ '../views/NewProperty.vue')
    }
  },
  {
    path: '/newquotation',
    name: 'newQuotation',
    component: function () {
      return import(/* webpackChunkName: "newquotation" */ '../views/NewQuotation.vue')
    }
  },
  {
    path: '/quotation',
    name: 'quotation',
    component: function () {
      return import(/* webpackChunkName: "quotation" */ '../views/Quotation.vue')
    }
  },
  {
    path: '/report',
    name: 'report',
    component: function () {
      return import(/* webpackChunkName: "report" */ '../views/Report.vue')
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: function () {
      return import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
