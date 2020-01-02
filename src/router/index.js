import Vue from 'vue'
import VueRouter from 'vue-router'
import Collection from '../views/Collection.vue'

Vue.use(VueRouter)

const routes = [
  // 账户模块
  {
    path: '/',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/newproperty',
    name: 'NewProperty',
    component: function () {
      return import(/* webpackChunkName: "newproperty" */ '../views/NewProperty.vue')
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: function () {
      return import(/* webpackChunkName: "account" */ '../views/Account.vue')
    }
  },
  // 账单模块
  {
    path: '/newbill',
    name: 'NewBill',
    component: function () {
      return import(/* webpackChunkName: "newbill" */ '../views/NewBill.vue')
    }
  },
  // 报表模块
  {
    path: '/report',
    name: 'Report',
    component: function () {
      return import(/* webpackChunkName: "report" */ '../views/Report.vue')
    }
  },
  // 计划模块
  {
    path: '/plan',
    name: 'Plan',
    component: function () {
      return import(/* webpackChunkName: "plan" */ '../views/Plan.vue')
    }
  },
  {
    path: '/newplan',
    name: 'NewPlan',
    component: function () {
      return import(/* webpackChunkName: "newplan" */ '../views/NewPlan.vue')
    }
  },
  // 设置模块
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
    path: '/newevent',
    name: 'NewEvent',
    component: function () {
      return import(/* webpackChunkName: "newevent" */ '../views/NewEvent.vue')
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
    path: '/setting',
    name: 'Setting',
    component: function () {
      return import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
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
