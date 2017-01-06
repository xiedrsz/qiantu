define(['mock', 'dataApi'], function (Mock, dataApi) {
  'use strict';

  var conf = {},
    today = dataApi.format("YYYY年MM月DD日");

  conf.config = function () {
    Mock
      .mock(/expense\/pull/, function () { // 更新账单列表
        return {
          lists: [{
            date: today,
            amount: '32.00',
            detail: [{
              img: './assets/img/food.png',
              type: '餐饮食品',
              mess: '午餐16元',
              money: '-16.00'
            }, {
              img: './assets/img/food.png',
              type: '餐饮食品',
              mess: '午餐16元',
              money: '-16.00'
            }]
         }]
        };
      })
      // 提交账单列表
      .mock(/expense\/push/, function (req) {
        var data = req.body;
        return {
          result: "OK"
        };
      })
      .mock(/expense\/getOutItems/, function () {
        return {
          outItems: [{
            src: './assets/img/food.png',
            name: '餐饮食品'
                    }, {
            src: './assets/img/clothes.png',
            name: '衣服饰品'
                    }, {
            src: './assets/img/life.png',
            name: '居家生活'
                    }, {
            src: './assets/img/traffic.png',
            name: '行车交通'
                    }, {
            src: './assets/img/enter.png',
            name: '休闲娱乐'
                    }, {
            src: './assets/img/jiaoyu.png',
            name: '文化教育'
                    }, {
            src: './assets/img/yiliao.png',
            name: '健康医疗'
                    }, {
            src: './assets/img/touzi.png',
            name: '投资支出'
                    }, {
            src: './assets/img/other.png',
            name: '其他支出'
                    }]
        };
      });
  };

  return conf;
});