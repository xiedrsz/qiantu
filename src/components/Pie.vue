<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import Pie from '@/libs/pie'

export default {
  name: 'Pie',
  props: {
    list: {
      type: Array,
      default () {
        return [{
          amount: 100,
          name: '储蓄'
        }, {
          amount: 100,
          name: '基金'
        }]
      }
    }
  },
  watch: {
    list (val) {
      this.chart.changeData(val)
      let legends = this.chart.getLegendItems()
      this.$emit('refresh', legends.type)
    }
  },
  mounted () {
    this.chart = new Pie(this.$refs.canvas, this.list)
    let legends = this.chart.getLegendItems()
    this.$emit('refresh', legends.type)
  },
  methods: {
    // 对外方法
    tipLegend (type) {
      this.chart.tipLegend(type)
    }
  }
}
</script>
