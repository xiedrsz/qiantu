<template>
  <div class="ui-chart">
    <div class="ctitle">{{title}}</div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <div class="mask" @click="create" v-if="!chart">
      <img src="../assets/img/chart.svg" />
    </div>
  </div>
</template>
<script>
import F2, {G} from '@antv/f2'
import { fmoney } from '@/libs/util'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
const Shape = G.Shape
// F2 全局配置
F2.Global.pixelRatio = window.devicePixelRatio
// 注册自定义图形
F2.Shape.registerShape('interval', 'borderRadius', {
  draw (cfg, container) {
    const points = this.parsePoints(cfg.points)
    const x = points[1].x
    const y = points[1].y
    const width = points[2].x - x
    const height = points[0].y - y
    const radius = width / 5
    const fillColor = cfg.color
    let item = new Shape.Rect({
      zIndex: 0,
      visible: true,
      attrs: {
        x,
        y,
        height,
        width,
        fill: fillColor,
        radius
      }
    })
    container.add(item)
  }
})

// 创建图片
function createChart (el, data) {
  const chart = new F2.Chart({
    el: el,
    width: WIDTH,
    height: HIGHT,
    padding: [30, 10, 30, 10]
  })

  chart.source(data)

  chart.axis('month', {
    label: {
      font: 'PS-Helvetica,  Helvetica, sans-serif, Arial',
      fill: '#79839D'
    },
    line: null,
    grid: null
  })
  chart.axis('tem', {
    label: null,
    grid: null
  })

  chart
    .interval()
    .position('month*tem')
    .color('isProfit', isProfit => (isProfit ? '#FF4858' : '#6774E4'))
    .shape('borderRadius')
    .size(15)

  chart.animate({
    type: 'scaley'
  })

  chart.tooltip({
    showItemMarker: false,
    onShow: ev => {
      let items = ev.items
      items[0].name = null
      items[0].value = '¥ ' + fmoney(items[0].origin.tem)
    }
  })

  chart.render()
  return chart
}

export default {
  name: 'Chart',
  props: {
    title: {
      type: String,
      default: '累计收益曲线'
    },
    list: {
      type: Array,
      default () {
        return [
          { tem: 200, month: '1月', isProfit: 0 },
          { tem: 510, month: '2月', isProfit: 1 },
          { tem: 59, month: '3月', isProfit: 1 },
          { tem: 50, month: '4月', isProfit: 0 },
          { tem: 450, month: '5月', isProfit: 1 },
          { tem: 140, month: '6月', isProfit: 0 },
          { tem: 690, month: '7月', isProfit: 1 },
          { tem: 36, month: '8月', isProfit: 1 },
          { tem: 146, month: '9月', isProfit: 1 },
          { tem: 1046, month: '10月', isProfit: 0 },
          { tem: 316, month: '11月', isProfit: 1 },
          { tem: 349, month: '12月', isProfit: 1 }
        ]
      }
    }
  },
  data () {
    return {
      width: WIDTH,
      height: HIGHT,
      chart: null
    }
  },
  watch: {
    list (val) {
      if (this.chart) {
        this.chart.changeData(val)
      }
    }
  },
  methods: {
    create () {
      this.chart = createChart(this.$refs.canvas, this.list)
    }
  }
}
</script>
