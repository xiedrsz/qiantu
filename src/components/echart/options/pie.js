import {
  ext
}
from '../../../libs'

// 默认配置
const DefaultOpt = {
  backgroundColor: '#2c343c',
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  // 图表配置
  series: [{
    name: '财富分布', // 内圈
    type: 'pie',
    selectedMode: 'single',
    radius: [0, '30%'],
    label: {
      normal: {
        position: 'inner'
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    data: [] // 内圈数据
  }, { // 外圈
    name: '财富分布',
    type: 'pie',
    radius: ['40%', '55%'],
    data: [] // 外圈数据
  }]
}

/**
 * @Function 运算
 * @Param list Array 财富列表
 * @Return ret Object 
 *  eg: {
 *    data1: [{
 *      value: 37782.44,
 *      name: '基金'
 *    }],
 *    data2: [{
 *      value: 37782.44,
 *      name: '易方达'
 *    }]
 *  }
 */
function calc(list) {
  let data1 = list.map((item) => {
      return {
        name: item.name,
        value: +item.value,
        list: item.list
      }
    }),
    temp = [],
    data2 = []

  data1 = data1.filter(item => {
    if (item.value > 0) {
      [].push.apply(temp, item.list)
      delete item.list
      return true
    }
    return false
  })

  temp.forEach(item => {
    if (+item.value > 0){
      data2.push({
        name: item.name,
        value: +item.value
      })
    }
  })

  return {
    data1: data1,
    data2: data2
  }
}

class pie extends Object {
  constructor(list) {
    let option = {},
      datas = calc(list)
    ext.extend(true, option, DefaultOpt)
    option.series[0].data = datas.data1
    option.series[1].data = datas.data2
    super(option);
  }
}

export default pie