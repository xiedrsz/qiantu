<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import dispie from './options/disPie'

  import ext from '../../libs/extend.min'

  export default {
    name: 'dis-pie',
    props: {
      data: {
        type: Array,
        default () {
          return [
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
        }
      }
    },
    mounted() {
      this.refresh(this.data)
    },
    methods: {
      refresh (data) {
        // 创建图表
        let option = new dispie(data)
        let myChart = echarts.init(this.$refs.main)
        myChart.setOption(option)
      }
    }
  }
</script>