// 路由映射配置
/**
 * {
 *  path: '/loanprogress',
 *   meta: {
 *    title: "贷款进度"
 *  },
 *   component: LoanProgress
 * }
 */

import {
  Home,
  Account,
  Statistics,
  Wealth,
  Fund,
  WealthItem
}
from '../modules'

module.exports = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    name: 'account',
    path: '/account/:bill',
    component: Account
  }, {
    path: '/statistics',
    component: Statistics
  }, {
    path: '/wealth',
    component: Wealth
  }, {
    path: '/fund/:index',
    component: Fund
  }, {
    path: '/wealthItem/',
    component: WealthItem
  }
]