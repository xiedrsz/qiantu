define(['Vue', 'ext', 'dataApi', 'localDB'], function (Vue, ext, dataApi, localDB) {
  'use strict';
  var expense = {};

  /**
   * 表字段
   * lists Array 支出列表, 与数据库同步
   * amount String 今日支出, 从支出列表中获取
   * outItems Array 支出项目
   * itemDetail Object 项目详情 { date, Address, money, type, mess, img }
   */

  // 稳定数据
  /**
   * 用处不大，可能被删, [2016-12-21]
   */
  expense.param = {};

  // 临时数据
  expense.temp = {};

  expense.temp.today = dataApi.format("YYYY年MM月DD日");
  expense.temp.amount = '0.00';
  expense.temp.lists = [];
  expense.temp.outItems = [];
  expense.temp.itemDetail = {};

  // 读取器
  expense.getter = function (attr) {
    return this.temp[attr];
  };

  // 设置器
  expense.setter = function (attr, value) {
    this.temp[attr] = value;
    return this;
  };

  // 设置多个参数
  /**
   * @Param data 数据源
   * @Param attr1 
   * @Param attr2
   */
  expense.setmore = function () {
    // 未完成
  };

  // 校验
  expense.check = function () {

  };

  /**
   * 拉取,从服务器上拉去最新列表, 若失败则使用本地数据
   * @param callback 回调函数
   */
  expense.pull = function (callback) {
    console.log("pull");
    Vue.http.get('/expense/pull').then(function (data) {
      var res = data.data;

      // 同步到本地
      localDB.syn(res.lists);

      deal(res);
    }, function (e) {
      // 连接失败，使用本地
      var res = {
        lists: localDB.localEList()
      };
      deal(res);
    });
    // 处理结果
    function deal(res) {
      ext.extend(true, expense.param, res);
      ext.extend(true, expense.temp, res);

      // 让 view 更新
      !!expense.temp.lists[0] && expense.temp.lists.$set(0, expense.temp.lists[0]);

      // 计算今日支出
      var temp = expense.temp.lists.filter(function (item) {
        return item.date == expense.temp.today;
      });
      !!temp[0] && (expense.temp.amount = temp[0].amount);

      !!callback && callback(res);
    }
  };

  /**
   * 推， 将最新账单信息推向服务器, 未完成
   * @param list Array 待更新账单
   * @param callback 回调函数
   */
  expense.push = function (list, callback) {
    console.log("push");
    /*var list = [{
      date: "2017-01-04",
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
    }];*/

    Vue.http.post('/expense/push', {
      expensesList: JSON.stringify(list)
    }).then(function (data) {
      console.log(data);
    }, function (e) {
      var unPullEList = localDB.queryDict("unPullEList") || [],
        tmp;
      list.forEach(function (item) {
        tmp = localDB.update(item);
        (unPullEList.indexOf(tmp) < 0) && unPullEList.push(tmp);
      });
      localDB.saveDict("unPullEList", unPullEList);
      console.log(e);
    });

  };

  // 获取支出类型
  /**
   * @param callback 回调函数
   */
  expense.getOutItems = function (callback) {
    Vue.http.get('/dict/getItem', {
      params: {
        name: "outItems"
      }
    }).then(function (data) {
      var lists = data.data.value;
      // 保存到本地
      localDB.saveDict("outItems", lists);
      deal(lists);
    }, function (e) {
      var lists = localDB.queryDict("outItems");
      deal(lists);
    });

    // 处理数据
    function deal(lists) {
      ext.extend(true, expense.param.outItems, lists);
      ext.extend(true, expense.temp.outItems, lists);

      !!callback && callback({
        outItems: lists
      });
    }
  };

  // 保存支出项目
  /**
   * @param itemDetail 项目详情
   * @param callback 回调函数
   */
  expense.saveOutItem = function (itemDetail, callback) {
    console.log(itemDetail);
    var date = itemDetail.date,
      detail = {
        img: itemDetail.img,
        type: itemDetail.type,
        mess: itemDetail.mess,
        money: parseFloat(itemDetail.money).toFixed(2)
      },
      amount = parseFloat(detail.money),
      temp = expense.temp.lists.filter(function (item) {
        return item.date == date;
      });

    // 更新支出列表
    if (temp[0]) {
      temp[0].detail.push(detail);
      amount += parseFloat(temp[0].amount);
      temp[0].amount = amount.toFixed(2);
      expense.push(temp);
    } else {
      temp = {
        date: date,
        amount: amount.toFixed(2),
        detail: [detail]
      };
      expense.temp.lists.push(temp);
      expense.push([temp]);
    }

    // 更新今日支出
    if (date == expense.temp.today) {
      var acTmp = expense.temp.amount;
      acTmp = parseFloat(detail.money) + parseFloat(acTmp);
      expense.temp.amount = acTmp.toFixed(2);
    }

    // 回调
    !!callback && callback();
  };

  return expense;
});