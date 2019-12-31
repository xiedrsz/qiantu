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
    name: 'Backup',
    component: function () {
      return import(/* webpackChunkName: "backup" */ '../views/Backup.vue')
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: function () {
      return import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
    }
  },
  {
    path: '/newbill',
    name: 'NewBill',
    component: function () {
      return import(/* webpackChunkName: "newbill" */ '../views/NewBill.vue')
    }
  },
  {
    path: '/newevent',
    name: 'NewEvent',
    component: function () {
      return import(/* webpackChunkName: "newevent" */ '../views/NewEvent.vue')
    }
  },
  {
    path: '/newplan',
    name: 'NewPlan',
    component: function () {
      return import(/* webpackChunkName: "newplan" */ '../views/NewPlan.vue')
    }
  },
  {
    path: '/newproperty',
    name: 'NewProperty',
    component: function () {
      return import(/* webpackChunkName: "newproperty" */ '../views/NewProperty.vue')
    }
  },
  {
    path: '/newquotation',
    name: 'NewQuotation',
    component: function () {
      return import(/* webpackChunkName: "newquotation" */ '../views/NewQuotation.vue')
    }
  },
  {
    path: '/quotation',
    name: 'Quotation',
    component: function () {
      return import(/* webpackChunkName: "quotation" */ '../views/Quotation.vue')
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: function () {
      return import(/* webpackChunkName: "report" */ '../views/Report.vue')
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: function () {
      return import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: function () {
      return import(/* webpackChunkName: "account" */ '../views/Account.vue')
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: function () {
      return import(/* webpackChunkName: "collection" */ '../views/Collection.vue')
    }
  },
  {
    path: '/plan',
    name: 'Plan',
    component: function () {
      return import(/* webpackChunkName: "plan" */ '../views/Plan.vue')
    }
  },
  {
    path: '/planinfo',
    name: 'PlanInfo',
    component: function () {
      return import(/* webpackChunkName: "planinfo" */ '../views/PlanInfo.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
