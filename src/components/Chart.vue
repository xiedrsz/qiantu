<template>
  <div class="ui-chart">
    <div class="ctitle">收益累计</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import F2 from '@antv/f2'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8

/**
 * @Description 该方法用来绘制一个有填充色的圆角矩形
 * @param cxt:canvas的上下文环境
 * @param x:左上角x轴坐标
 * @param y:左上角y轴坐标
 * @param width:矩形的宽度
 * @param height:矩形的高度
 * @param radius:圆的半径
 * @param fillColor:填充颜色
 **/
function fillRoundRect (cxt, x, y, width, height, radius, fillColor) {
  // 圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) {
    return false
  }
  cxt.save()
  cxt.translate(x, y)
  // 绘制圆角矩形的各个边
  drawRoundRectPath(cxt, width, height, radius)
  // 若是给定了值就用给定的值否则给予默认值
  cxt.fillStyle = fillColor || '#000'
  cxt.fill()
  cxt.restore()
}

function drawRoundRectPath (cxt, width, height, radius) {
  cxt.beginPath(0)
  // 从右下角顺时针绘制，弧度从0到1/2PI
  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2)

  // 矩形下边线
  cxt.lineTo(radius, height)

  // 左下角圆弧，弧度从1/2PI到PI
  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)

  // 矩形左边线
  cxt.lineTo(0, radius)

  // 左上角圆弧，弧度从PI到3/2PI
  cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)

  // 上边线
  cxt.lineTo(width - radius, 0)

  // 右上角圆弧
  cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

  // 右边线
  cxt.lineTo(width, height - radius)
  cxt.closePath()
}

// F2 全局配置， Todo 待整出
F2.Global.pixelRatio = window.devicePixelRatio
F2.Shape.registerShape('interval', 'borderRadius', {
  draw (cfg, canvas) {
    const points = this.parsePoints(cfg.points)
    const cxt = canvas.getContext('2d')
    const x = points[1].x
    const y = points[1].y
    const width = points[2].x - x
    const height = points[0].y - y
    const radius = width / 5
    const fillColor = cfg.color
    fillRoundRect(cxt, x, y, width, height, radius, fillColor)
  }
})

// 创建图片
function createChart (el, data) {
  // Step 1: 创建 Chart 对象
  const chart = new F2.Chart({
    el: el,
    width: WIDTH,
    height: HIGHT,
    padding: [30, 10, 30, 10]
  })
  // Step 2: 载入数据源
  chart.source(data, {
    tem: {
      tickCount: 5
    }
  })
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
  // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  chart
    .interval()
    .position('month*tem')
    .color('isProfit', isProfit => (isProfit ? '#FF4858' : '#6774E4'))
    .shape('borderRadius')
    .size(15)
  // y轴方向的缩放动画
  chart.animate({
    type: 'scaley'
  })
  // 辅助元素
  /* data.forEach((obj, index) => {
    // 文字部分
    chart.guide().html([ obj.month, obj.tem ], `<div style='color: #79839D;'><span>${fmoney(obj.tem)}</span></div>`, {
      align: 'bc',
      offset: [ 0, -24 ]
    })
  }) */
  // Step 4: 渲染图表
  chart.render()
  return chart
}

// 金额格式化
function fmoney (str, num) {
  let n = num > 0 && num <= 20 ? num : 0
  let s = parseFloat((str + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let i = 0
  let len = l.length
  let res = ''
  for (; i < len; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== len ? ',' : '')
  }
  res = t.split('').reverse().join('')
  return r ? (res + '.' + r) : res
}
export default {
  name: 'Chart',
  props: {
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
          { tem: 746, month: '10月', isProfit: 0 },
          { tem: 316, month: '11月', isProfit: 1 },
          { tem: 349, month: '12月', isProfit: 1 }
        ]
      }
    }
  },
  mounted () {
    this.chart = createChart(this.$refs.canvas, this.list)
  },
  watch: {
    // todo
    list (val, old) {
      console.log(val)
      console.log(fmoney)
      this.chart.changeData(val)
      this.chart.guide().clear()
      val.forEach((obj, index) => {
        // 文字部分
        this.chart.guide().html([ obj.month, obj.tem ], `<div style='color: #79839D;font-size: 10px'><span>${fmoney(obj.tem)}</span></div>`, {
          align: 'bc',
          offset: [ 0, -24 ]
        })
      })
      this.chart.repaint()
    }
  }
}
</script>
