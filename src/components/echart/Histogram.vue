<template>
  <div>
    <div style="width: 90%;height:300px;margin: 5px auto;border: 1px solid #BFBFBF;box-shadow: 4px 4px 5px #ccc;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import { option, dataAxis, data } from './options/histogram'
  
  export default {
    name: 'histogram',
    mounted() {
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)

      // Enable data zoom when user click bar.
      let zoomSize = 6;

      // 自定义点击放大事件
      myChart.on('click', (params) => {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        })
      })
    }
  }
</script>