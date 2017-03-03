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
  Account
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
  }
]