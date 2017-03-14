<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import option from './options/line'

  export default {
    name: 'line-chart',
    mounted() {
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)
    }
  }
</script>