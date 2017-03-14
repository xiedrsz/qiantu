let option = {
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
    data: []
  }, { // 外圈
    name: '财富分布',
    type: 'pie',
    radius: ['40%', '55%'],
    data: []
  }]
}

export default option