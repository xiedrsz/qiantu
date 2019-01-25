<template>
  <div class="ui-chart">
    <div class="ctitle">{{title}}</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import _ from 'lodash'
import F2, {Util, G} from '@antv/f2'
const Group = G.Group
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.76
const COLORS = ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273']

// 转换列表
function transformList (list) {
  return _.map(list, ({amount, name, short, proportion}, index) => {
    return {
      a: '1',
      short,
      name,
      type: name,
      cost: +amount,
      value: `${proportion}%`,
      marker: {
        symbol: 'circle',
        fill: COLORS[index],
        radius: 3
      }
    }
  })
}

// 绘制标签
function drawLabel (shape, coord, canvas) {
  let center = coord.center
  let origin = shape.get('origin')
  let points = origin.points
  let x1 = (points[2].x - points[1].x) * 0.75 + points[1].x
  let x2 = (points[2].x - points[1].x) * 1.8 + points[1].x
  let y = (points[0].y + points[1].y) / 2
  let point1 = coord.convertPoint({
    x: x1,
    y: y
  })
  let point2 = coord.convertPoint({
    x: x2,
    y: y
  })

  let group = new Group()
  group.addShape('Line', {
    attrs: {
      x1: point1.x,
      y1: point1.y,
      x2: point2.x,
      y2: point2.y,
      lineDash: [0, 2, 2],
      stroke: '#232323'
    }
  })
  let text = group.addShape('Text', {
    attrs: {
      x: point2.x,
      y: point2.y,
      text: `${origin._origin.cost} 元`,
      fill: '#232323',
      textAlign: 'start',
      textBaseline: 'bottom'
    }
  })
  let textWidth = text.getBBox().width
  let baseLine = group.addShape('Line', {
    attrs: {
      x1: point2.x,
      y1: point2.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#232323'
    }
  })
  if (point2.x > center.x) {
    baseLine.attr('x2', point2.x + textWidth)
  } else if (point2.x < center.x) {
    text.attr('textAlign', 'end')
    baseLine.attr('x2', point2.x - textWidth)
  } else {
    text.attr('textAlign', 'center')
    text.attr('textBaseline', 'top')
  }
  canvas.add(group)
  shape.label = group
}

// 绘制图形
function createPie (canvas, data) {
  // 计算总金额
  let sum = _.sumBy(data, 'cost')
  // 计算高度
  let nameLen = _.sumBy(data, ({name}) => {
    return name.length + 3
  })
  let height = HIGHT + 0.8 * nameLen
  let chart = new F2.Chart({
    el: canvas,
    width: WIDTH,
    height: height,
    pixelRatio: window.devicePixelRatio
  })
  chart.source(data)
  let lastClickedShape
  chart.legend({
    position: 'bottom',
    offsetY: -5,
    align: 'left',
    custom: true,
    items: data,
    onClick: ev => {
      let clickedItem = ev.clickedItem
      let dataValue = clickedItem.get('name')
      let canvas = chart.get('canvas')
      let coord = chart.get('coord')
      let geom = chart.get('geoms')[0]
      let container = geom.get('container')
      // 只有带精细动画的 geom 才有 shapes 这个属性
      let shapes = geom.get('shapes')

      let clickedShape
      // 找到被点击的 shape
      Util.each(shapes, shape => {
        let origin = shape.get('origin')
        if (origin && origin._origin.type === dataValue) {
          clickedShape = shape
          return false
        }
      })

      if (lastClickedShape) {
        lastClickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (lastClickedShape.label) {
            lastClickedShape.label.hide()
          }
        }).onEnd(() => {
          lastClickedShape.set('selected', false)
        })
      }

      if (clickedShape.get('selected')) {
        clickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (clickedShape.label) {
            clickedShape.label.hide()
          }
        }).onEnd(() => {
          clickedShape.set('selected', false)
        })
      } else {
        let color = clickedShape.attr('fill')
        clickedShape.animate().to({
          attrs: {
            lineWidth: 5
          },
          duration: 350,
          easing: 'bounceOut'
        }).onStart(() => {
          clickedShape.attr('stroke', color)
          clickedShape.set('zIndex', 1)
          container.sort()
        }).onEnd(() => {
          clickedShape.set('selected', true)
          clickedShape.set('zIndex', 0)
          container.sort()
          lastClickedShape = clickedShape
          if (clickedShape.label) {
            clickedShape.label.show()
          } else {
            drawLabel(clickedShape, coord, canvas)
          }
          canvas.draw()
        })
      }
    }
  })
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85
  })
  chart.axis(false)
  chart.tooltip(false)
  chart.interval().position('a*cost').color('type', COLORS).adjust('stack')

  chart.guide().text({
    position: ['50%', '50%'],
    content: sum.toFixed(2),
    style: {
      fontSize: 22,
      fill: '#232323',
      fontWeight: 'bold'
    }
  })
  chart.render()
  return chart
}

export default {
  name: 'Pie',
  props: {
    title: {
      type: String,
      default: '总资产分布图'
    },
    list: {
      type: Array,
      default () {
        return [{
          amount: 0,
          code: '00-00',
          icon: 'defaultw.png',
          id: 2,
          iscollection: true,
          mgdbId: '',
          name: '储蓄',
          note: '',
          proportion: '0.00',
          short: '储蓄'
        }]
      }
    }
  },
  watch: {
    list (val) {
      let data = transformList(val)
      this.chart.destroy()
      this.chart = createPie(this.$refs.canvas, data)
    }
  },
  mounted () {
    let data = this.list
    data = transformList(data)
    this.chart = createPie(this.$refs.canvas, data)
  }
}
</script>
