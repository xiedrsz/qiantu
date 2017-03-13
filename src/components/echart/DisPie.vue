<template>
  <div>
    <div style="width: 100%;height:400px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import disPieOPtion from './options/disPieOPtion'
  
  export default {
    name: 'dis-pie',
    mounted () {
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(disPieOPtion)
    }
  }
</script>