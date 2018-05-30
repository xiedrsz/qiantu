<template>
  <div class="ui-chart">
    <div class="ctitle">收益曲线</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import F2 from '@antv/f2'
// import _ from 'lodash'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
F2.Global.pixelRatio = window.devicePixelRatio

// 创建Graph
function createGraph (canvas, data) {
  const chart = new F2.Chart({
    el: canvas,
    width: WIDTH,
    height: HIGHT,
    padding: [40, 10, 30, 40]
  })
  const defs = {
    date: {
      tickCount: 7,
      range: [ 0, 1 ],
      formatter (val) {
        return val.replace(/\d{4}-\d{2}-/, '')
      }
    },
    amount: {
      tickCount: 10,
      formatter (val) {
        let result = val % 1000
        if (result) {
          return ~~result
        } else {
          result = val / 1000
          return `${~~result}K`
        }
      }
    }
  }
  // 配置date刻度文字样式
  const label = {
    fill: '#979797',
    font: '14px san-serif',
    offset: 6
  }
  chart.axis('date', {
    label (text, index, total) {
      const cfg = label
        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
      if (index === 0) {
        cfg.textAlign = 'start'
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'end'
      }
      return cfg
    }
  })
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
  chart.axis('amount', {
    min: 8,
    label: {
      fontSize: 14
    }
  })
  chart.source(data, defs)

  let linearGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 500)
  linearGradient.addColorStop(0.5, '#fff')
  linearGradient.addColorStop(0, 'rgb(15, 141, 232)')
  // 绘制渐变色区域图
  chart.area().position('date*amount')
    .color('graph', function () {
      return linearGradient
    })
    .style({
      opacity: 0.6
    })
    .shape('smooth')

  chart.line().size(2).position('date*amount')
    .shape('smooth')

  chart.render()
  return chart
}

export default {
  name: 'Graph',
  props: {
    list: {
      type: Array,
      default () {
        return [
          { date: '1', amount: 5010 }
        ]
      }
    }
  },
  mounted () {
    this.chart = createGraph(this.$refs.canvas, this.list)
  },
  watch: {
    // todo
    list (val, old) {
      this.chart.changeData(val)
    }
  }
}
</script>
