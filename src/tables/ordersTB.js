/**
 * 订单系统业务处理表
 * 订单列表暂存功能尚未实现
 * xiedrsz
 */
import Vue from 'vue'
import store from '../vuex/store'
const commit = store.commit || store.dispatch

let ordersTB = {}

ordersTB.showLoading = false;

/**
 * 参数
 * @Param start 当前页码
 * @Param length 每页订单长度
 * @Param applyNo 订单号
 * @Param applicationDate 日期
 * @Param state 状态
 */
ordersTB.param = {
  searchOPT: {
    start: 0,
    length: '10',
    applyNo: '',
    applicationDate: '',
    state: ''
  }
}

/**
 * @Param lists array 订单列表，对象数组
 *  @item applyNo string 订单号
 *  @item state string 订单状态
 *  @item loanAmount string 金额
 *  @item cdate string 订单日期
 */
ordersTB.param.lists = [{
  applyNo: "",
  state: "",
  loanAmount: "",
  applicationDate: ""
}]

/**
 * 设置参数
 * @Param item string 字段名
 * @Param value 字段的值
 */
ordersTB.setParam = (item, value) => {
  ordersTB.param[item] = value
  return this
}

/**
 * 设置查询选项
 * @Param item string 字段名
 * @Param value 字段的值
 */
ordersTB.setSearchOPT = (searchOPT) => {
  ordersTB.param.searchOPT = {
    start: searchOPT.start || 0,
    length: searchOPT.length || '10',
    applyNo: searchOPT.applyNo || '',
    applicationDate: searchOPT.applicationDate || '',
    state: searchOPT.state || ''
  }
  return this
}

/**
 * @Function 获取订单列表
 * @Param callback 成功回调
 */
ordersTB.getList = (callback) => {
  commit("LOADING", true)
  let option = ordersTB.param.searchOPT
  Vue.http.post('/vf_sales/order/search', option).then(function (res) {
    console.log(res);
    ordersTB.param.searchOPT.start++;
    let lists = res.data.data,
      len = lists.length;

    !!callback && callback(lists)
    commit("LOADING", false)
  }, function (e) {
    console.error(e)
    commit("LOADING", false)
  })
}

/**
 * @Function 获取订单详情
 * @Param applyNo 订单号
 * @Param callback 成功回调
 */
ordersTB.getDetail = (applyNo, callback) => {
  if (!applyNo) return

  commit("LOADING", true)
  Vue.http.post('/vf_sales/order/info', {
    applyNo: applyNo
  }).then(function (res) {
    console.log(res);
    let orderInfo = res.data;
    !!callback && callback(orderInfo)
    commit("LOADING", false)
  }, function (e) {
    console.error(e)
    commit("LOADING", false)
  })
}

/**
 * @Function 订单统计
 * @Param callback 成功回调
 */
ordersTB.getCount = (callback) => {
  commit("LOADING", true)
  Vue.http.post('/vf_sales/order/count', {}).then(function (res) {
    console.log(res);
    let data = res.data;
    !!callback && callback(data)
    commit("LOADING", false)
  }, function (e) {
    console.error(e)
    commit("LOADING", false)
  })
}

module.exports = ordersTB