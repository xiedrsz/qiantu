import _ from 'lodash'
import Vue from 'vue'

const state = {
  insurer: {
    // 香港身份证号码
    identityNoHK: '',
    // 投保人名称（中文）
    appliNameC: '',
    // 投保人名称（英文）
    appliNameE: '',
    // 郵箱
    appliEmail: '',
    // 出生日期
    birthDate: '',
    // 年龄
    appliAge: '',
    // 性别 1男 2女
    appliSex: '1',
    // 投保类型名称（产品代码）
    riskCodeTname: '公共交通意外保險',
    // 投保类型代码（产品代码）
    riskCode: '',
    // 缴费模式
    payType: '1年',
    // 保障年期
    projectCode: '1年',
    // 保险金额
    sumInsured: '',
    // 年保费
    yearPremium: '60.00',
    // 保险公司代码
    companyCode: '',
    // 保险公司名称
    companyTname: '中國太平保險(香港)有限公司',
    // 订单号
    orderId: '',
    // 产品Id
    productId: '',
    // 支付号账号
    aliPayCode: '',
    // 支付宝唯一标识
    aliPayOid: '',
    // 购买唯一标识符
    purchaseRef: '',
    // 优惠折扣，优惠20%，就传80.没有优惠传100
    discount: '80'
  },
  orderInfo: {
    // 投保类型名称（产品代码）
    riskCodeTname: '公共交通意外保險',
    // 投保类型代码（产品代码）
    riskCode: '1166',
    // 缴费模式
    payType: '1年',
    // 保障年期
    projectCode: '1年',
    // 保险金额
    sumInsured: '',
    // 年保费
    yearPremium: '60.00',
    // 保险公司代码
    companyCode: '01',
    // 保险公司名称
    companyTname: '中國太平保險(香港)有限公司',
    // 订单号
    orderId: '',
    // 年龄
    appliAge: '',
    // 保单号
    policyNo: '',
    // 随机数
    radomID: '',
    // 优惠折扣，优惠20%，就传80.没有优惠传100
    discount: '80'
  },
  productInfo: {
    // 支付宝唯一标识
    aliPayOid: '',
    // 购买唯一标识符
    purchaseRef: ''
  }
}

const getters = {}

const mutations = {
  // 給 insurer 賦值
  insure_setInsurer (state, insurer) {
    _.assign(state.insurer, insurer)
  },
  // 給 orderInfo 賦值
  insure_setOrderInfo (state, orderInfo) {
    _.assign(state.orderInfo, orderInfo)
  },
  // 給 productInfo 賦值
  insure_setProductInfo (state, productInfo) {
    _.assign(state.productInfo, productInfo)
  }
}

const actions = {
  // 生成訂單
  async saveOrderInfo ({
    commit,
    state
  }, option) {
    let insurer = option.insurer
    let res = await Vue.http.request({
      procedure: 'saveOrderInfo',
      data: {
        ...insurer
      }
    })
    let response = res.Envelope.Body.saveOrderInfoResponse.return
    let orderId = response.orderId
    let resultInfo = response.resultInfo
    let message = resultInfo.message
    let returnCode = resultInfo.returnCode
    if (returnCode === '1') {
      commit('insure_setInsurer', insurer)
      commit('insure_setOrderInfo', {
        orderId
      })
      return true
    } else {
      Vue.prompt(message)
      return false
    }
  },
  // 更新訂單
  async updateOrderInfo ({
    commit,
    state
  }, option) {
    // commit('SET_LOADING', true)
    let orderInfo = option.orderInfo
    let res = await Vue.http.request({
      procedure: 'updateOrderInfo',
      data: {
        ...orderInfo
      }
    })
    // commit('SET_LOADING', false)
    let response = res.Envelope.Body.updateOrderInfoResponse.return
    let resultInfo = response.resultInfo
    let message = resultInfo.message
    let returnCode = resultInfo.returnCode
    let orderStr = response.order_Str
    if (returnCode === '1') {
      commit('insure_setOrderInfo', orderInfo)
      return orderStr
    } else {
      Vue.prompt(message)
      return false
    }
  },
  // 自動投保
  async autoProposal ({
    commit,
    state
  }, option) {
    // commit('SET_LOADING', true)
    let orderInfo = option.orderInfo
    let res = await Vue.http.request({
      procedure: 'autoUnderWriteForProposal',
      data: {
        ...orderInfo
      }
    })
    // commit('SET_LOADING', false)
    let response = res.Envelope.Body.autoUnderWriteForProposalResponse.return
    let resultInfo = response.resultInfo
    let message = resultInfo.message
    let returnCode = resultInfo.returnCode
    let proposalNo = response.proposalNo
    let policyNo = response.policyNo
    if (returnCode === '1') {
      commit('insure_setOrderInfo', {
        policyNo
      })
      return true
    } else {
      Vue.prompt(message)
      return false
    }
  },
  // 獲取訂單詳情
  async findOrderDetail ({
    commit,
    state
  }, option) {
    let orderInfo = option.orderInfo
    let res = await Vue.http.request({
      procedure: 'getOrderInfoList',
      data: {
        ...orderInfo
      }
    })
    let response = res.Envelope.Body.getOrderInfoListResponse.return
    let resultInfo = response.resultInfo
    let message = resultInfo.message
    let returnCode = resultInfo.returnCode
    let mobileOrderInfoDto = response.mobileOrderInfoDto
    let policyNo = mobileOrderInfoDto.policyNo
    if (returnCode === '1') {
      commit('insure_setOrderInfo', {
        policyNo
      })
      return true
    } else {
      Vue.prompt(message)
      return false
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
