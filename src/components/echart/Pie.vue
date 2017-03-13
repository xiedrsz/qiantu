<template>
  <div>
    <div style="width: 100%;height:400px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import pieOption from './options/pieOption'
  import statisticsTB from '../../tables/statisticsTB'
  
  export default {
    name: 'pie',
    mounted () {
      // 清除过去数据
      pieOption.series[0].data = [];
      pieOption.series[1].data = [];
      // 更新数据
      [].push.apply(pieOption.series[0].data, statisticsTB.temp.wealth);
      [].push.apply(pieOption.series[1].data, statisticsTB.temp.wdetail);
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(pieOption)
    }
  }
</script>