<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import pie from './options/pie'

  export default {
    name: 'pie',
    props: {
      data: {
        type: Array,
        default () {
          return [{
            account: "0.00%",
            icon: "/static/img/clothes.png",
            list: [{
              account: "0.00%",
              icon: "/static/img/clothes.png",
              list: [],
              mess: "易方达A",
              name: "易方达A",
              value: "0.00",
              type: "1"
            }],
            mess: "我的基金",
            name: "基金",
            value: "0.00"
          }]
        }
      }
    },
    mounted() {
      // 创建图表
      let option = new pie(this.data)
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)
    }
  }
</script>