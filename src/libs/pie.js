import _ from 'lodash'
import F2, { Util, G } from '@antv/f2'
const Group = G.Group
const WIDTH = document.documentElement.clientWidth
const HIGHT = WIDTH * 0.76
const COLORS = ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273', '#333333', '#33CCFF', '#660000']

/**
 * 转换列表
 * @param {Array} list 原始数据
 * @returns Array
 */
function transformList (list) {
  let total = _.sumBy(list, ({ amount }) => +amount)
  return _.map(list, ({ amount, name }, index) => {
    return {
      name,
      type: name,
      cost: +amount,
      value: `${(amount / total * 100).toFixed(2)}%`,
      marker: {
        symbol: 'circle',
        fill: COLORS[index],
        radius: 3
      }
    }
  })
}

/**
 * 绘制标签
 * @param {Shape} shape 图形
 * @param {Coord} coord 坐标
 * @param {Canvas} canvas 画布
 */
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

class Pie {
  /**
   * 环形饼状图
   * @param {Canvas} canvas 画布
   * @param {Array} list 原始数据
   */
  constructor (canvas, list) {
    let data = transformList(list)
    let sum = _.sumBy(data, 'cost')
    // 计算高度
    let nameLen = _.sumBy(data, ({ name }) => {
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
    chart.legend(false)
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.7,
      radius: 0.85
    })
    chart.axis(false)
    chart.tooltip(false)
    chart.interval().position('a*cost').color('type', COLORS).adjust('stack')

    this.guide = chart.guide().text({
      position: ['50%', '50%'],
      content: sum.toFixed(2),
      style: {
        fontSize: 22,
        fill: '#232323',
        fontWeight: 'bold'
      }
    })
    chart.render()
    this.chart = chart
  }

  /**
   * 改变数据源
   * @param {Array} list 原始数据
   */
  changeData (list) {
    let data = transformList(list)
    let sum = _.sumBy(data, 'cost')
    this.chart.changeData(data)
    this.guide.content = sum.toFixed(2)
    this.guide.repaint()
  }

  /**
   * 点击图例
   * @param {String} type 图例名称
   */
  tipLegend (type) {
    let lastClickedShape = this.lastClickedShape
    let chart = this.chart
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
      if (origin && origin._origin.type === type) {
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
        this.lastClickedShape = clickedShape
        if (clickedShape.label) {
          clickedShape.label.show()
        } else {
          drawLabel(clickedShape, coord, canvas)
        }
        canvas.draw()
      })
    }
  }

  /**
   * 活动图例
   * @returns Array 处理后的数据
   */
  getLegendItems () {
    return this.chart.getLegendItems()
  }
}

export default Pie
