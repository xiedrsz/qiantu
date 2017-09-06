<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import option from './options/line'

  function calc (datas) {
    let date, sum, data
    date = datas.map(item => {
      return item.date
    })
    sum = 0
    data = datas.map(item => {
      sum += +item.spread
      return sum
    })

    return {
      date: date,
      data: data
    }
  }

  export default {
    name: 'line-chart',
    props: {
      data: {
        type: Array,
        default () {
          return [
            {
              spread: 1000,
              date: '2017年4月13日'
            }, {
              spread: 50,
              date: '2017年4月14日'
            }, {
              spread: -29,
              date: '2017年4月15日'
            }
          ]
        }
      }
    },
    mounted () {
      // 创建图表
      let chartData = calc(this.data)
      option.xAxis.data = chartData.date
      option.series[0].data = chartData.data
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)
    }
  }
</script>
