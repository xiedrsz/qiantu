<template>
  <div>
    <div class="ce-chart" style="width: 100%;height: 320px;" ref="main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import option from './options/disPie'

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
      // 排序
      let data = []
      ext.extend(true, data, this.data)
      data.sort((a, b) => {
        return a.value - b.value;
      });
      // 清除过去数据
      option.series[0].data = [];
      // 更新数据
      [].push.apply(option.series[0].data, data);
      // 创建图表
      let myChart = echarts.init(this.$refs.main)
      myChart.setOption(option)
    }
  }
</script>