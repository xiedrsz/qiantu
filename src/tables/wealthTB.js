/**
 * @File 财富统计表
 */

import table from './table'

let wealthTB = new table({
  list: [
    {
      name: '基金',
      value: 37782.44,
      icon: '/static/img/fund.png',
      account: '',
      href: '',
      detail: [
        {
          value: 21531.51,
          name: '理财通',
          icon: '/static/img/fund.png',
          account: '',
          href: ''
        }, {
          value: 3218.16,
          name: '余额宝',
          icon: '/static/img/fund.png',
          account: '',
          href: ''
        }, {
          value: 6022.21,
          name: '工基',
          icon: '/static/img/fund.png',
          account: '',
          href: ''
        }, {
          value: 3003.64,
          name: '上基',
          icon: '/static/img/fund.png',
          account: '',
          href: ''
        }, {
          value: 4006.92,
          name: '招基',
          icon: '/static/img/fund.png',
          account: '',
          href: ''
        }
      ]
    }, {
      name: '储蓄',
      value: 15546.89,
      icon: '/static/img/card.png',
      account: '',
      href: '',
      detail: []
    }, {
      name: '债务',
      value: 1500.00,
      icon: '/static/img/loan.png',
      account: '',
      href: '',
      detail: []
    }, {
      name: '股市',
      value: 6097.49,
      icon: '/static/img/k.png',
      account: '',
      href: '',
      detail: [
        {
          value: 2249.77,
          name: '可取金额'
        }, {
          value: 1839.26,
          name: '16国债19'
        }, {
          value: 2000.00,
          name: '标准券'
        }
      ]
    }, {
      name: '钱包',
      value: 28.23,
      icon: '/static/img/wallet.png',
      account: '',
      href: '',
      detail: []
    }
  ],
  sum: 0
})

/**
 * @Function 更新列表
 * @Param callback 更新完成回调函数
 */
wealthTB.update = (callback) => {
  let list = wealthTB.temp.list,
    sum = 0
    // 统计总财富
  list.forEach((item) => {
    sum += item.value
  });
  wealthTB.temp.sum = sum;
  // 计算财富占比
  list.forEach((item) => {
    item.account = (item.value / sum * 100).toFixed(2) + '%'
  });
  // 排序
  list = list.sort((a, b) => {
    return b.value - a.value;
  })

  !!callback && callback()
}

wealthTB.update()

export default wealthTB