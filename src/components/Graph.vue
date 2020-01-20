<template>
  <div class="ui-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import Graph from '@/libs/graph'

export default {
  name: 'Graph',
  props: {
    list: {
      type: Array,
      default () {
        return [{
          date: '2019-01-01', amount: 18.93
        }, {
          date: '2019-01-07', amount: 18.01
        }, {
          date: '2019-01-08', amount: 13.76
        }, {
          date: '2019-01-09', amount: 12.10
        }, {
          date: '2019-01-10', amount: 10.09
        }, {
          date: '2019-01-11', amount: 9.89
        }, {
          date: '2019-01-12', amount: 4.00
        }]
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    list (val, old) {
      if (this.chart) {
        this.chart.changeData(val)
      }
    }
  },
  mounted () {
    this.chart = new Graph(this.$refs.canvas, this.list)
  }
}
</script>
