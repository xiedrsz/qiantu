var Mock = require('mockjs'),
  dataApi = require('../src/libs/dataApi');

var today = dataApi.format("YYYY年MM月DD日");

// 设置系统环境为 mock 状态
window.env = "mock"

Mock
  .mock(/expense\/pull/, function () { // 更新账单列表
    return {
      lists: [{
        date: today,
        amount: '32.00',
        detail: [{
          img: '/static/img/food.png',
          type: '餐饮食品',
          mess: '午餐16元',
          money: '-16.00'
        }, {
          img: '/static/img/food.png',
          type: '餐饮食品',
          mess: '午餐16元',
          money: '-16.00'
        }]
      }]
    };
  })
  // 提交账单列表
  .mock(/expense\/pusllh/, function (req) {
    var data = req.body;
    return {
      result: "OK"
    };
  })
  .mock(/dict\/getItem/, function () {
    return {
      value: [{
        src: '/static/img/food.png',
        name: '餐饮食品'
      }, {
        src: '/static/img/clothes.png',
        name: '衣服饰品'
      }, {
        src: '/static/img/life.png',
        name: '居家生活'
      }, {
        src: '/static/img/traffic.png',
        name: '行车交通'
      }, {
        src: '/static/img/enter.png',
        name: '休闲娱乐'
      }, {
        src: '/static/img/jiaoyu.png',
        name: '文化教育'
      }, {
        src: '/static/img/yiliao.png',
        name: '健康医疗'
      }, {
        src: '/static/img/touzi.png',
        name: '投资支出'
      }, {
        src: '/static/img/other.png',
        name: '其他支出'
      }]
    };
  });