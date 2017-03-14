<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import option from './options/pie'
  import statisticsTB from '../../tables/statisticsTB'
  
  export default {
    name: 'pie',
    mounted () {
      // 清除过去数据
      option.series[0].data = [];
      option.series[1].data = [];
      // 更新数据
      [].push.apply(option.series[0].data, statisticsTB.temp.wealth);
      [].push.apply(option.series[1].data, statisticsTB.temp.wdetail);
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)
    }
  }
</script>