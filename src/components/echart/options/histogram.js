import echarts from 'echarts'

// x轴标签
let dataAxis = ['旗滨股份', '鑫科材料', '大东南'];

// 图表数据
let data = [32.15, 39.85, 57.64];

// 最大高度
let yMax = 60;

// 背景数据
let dataShadow = [];
for (var i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}

let option = {
  // x轴配置
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      textStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  // y轴配置
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#999'
      }
    }
  },
  dataZoom: [{
    type: 'inside'
  }],
  series: [
    { // 背景系列
      type: 'bar',
      itemStyle: {
        normal: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      data: dataShadow,
      animation: false
    }, { // 数据系列
      type: 'bar',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#83bff6'
          }, {
            offset: 0.5,
            color: '#188df0'
          }, {
            offset: 1,
            color: '#188df0'
          }])
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#2378f7'
          }, {
            offset: 0.7,
            color: '#2378f7'
          }, {
            offset: 1,
            color: '#83bff6'
          }])
        }
      },
      data: data
    }]
};

export { option, dataAxis, data }