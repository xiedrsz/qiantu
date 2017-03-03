/**
 * 贷款业务处理表
 * xiedrsz
 */

import Vue from 'vue'

let loanTB = {}

/**
 * 参数
 */
loanTB.param = {}

/**
 * @Function 批量导入
 * @Param request 请求
 * @Param callback 成功回调
 */
loanTB.getProgress = (request, callback) => {

  Vue.http.get('https://test-hczvf.pingan.com.cn/vf/order/get_progress_loan', {
    params: {
      userCode: "Rg45y50PHLtVSgSjYN6uc96hTndL+UuH",
      id: "2223"
    }
  }).then(function (data) {
    console.log(data)

    !!callback && callback(res)
  }, function (e) {
    console.error(e)
  })
}

/**
 * @Function 初始化, 模拟数据
 */
loanTB.init = () => {
  let mock = {
    customerName: "测试用户",
    loanAmount: "102000.00",
    state: {
      apsFlowId: "46419C7D7FEE18A9E053A30B1F0ADF5B",
      systemFlowId: "0117011743193406",
      returnState: "1",
      flowStateList: [{
        dateFlowEnd: "2017-01-1710: 29: 33",
        "workFlowSts": "000",
        "workFlowStsDes": "申请提交",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1710: 29: 33",
        "workFlowSts": "002",
        "workFlowStsDes": "初审/录入",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1713: 41: 38",
        "workFlowSts": "003",
        "workFlowStsDes": "信审中",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1713: 42: 43",
        "workFlowSts": "007",
        "workFlowStsDes": "投保中",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1713: 42: 59",
        "workFlowSts": "008",
        "workFlowStsDes": "协议确认中",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1713: 45: 10",
        "workFlowSts": "010",
        "workFlowStsDes": "获取到账信息",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1714: 08: 47",
        "workFlowSts": "011",
        "workFlowStsDes": "投资信息确认",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1714: 30: 20",
        "workFlowSts": "013",
        "workFlowStsDes": "等待放款",
        "workFlowDir": "0"
        }, {
        "dateFlowEnd": "2017-01-1714: 45: 30",
        "workFlowSts": "014",
        "workFlowStsDes": "放款完成",
        "workFlowDir": "0"
        }]
    }
  }
  
  return mock
}


module.exports = loanTB