/**
 * 业务员系统业务处理表
 * xiedrsz
 */

import Vue from 'vue'

let salesmanTB = {}

/**
 * 参数
 */
salesmanTB.param = {}

/**
 * @Function 批量导入
 * @Param request 请求
 * @Param callback 成功回调
 */
salesmanTB.batchImport = (request, callback) => {

  Vue.http.get('/expense/pull').then(function (data) {
    console.log(data)

    !!callback && callback(res)
  }, function (e) {
    console.error(e)
  })
}

module.exports = salesmanTB