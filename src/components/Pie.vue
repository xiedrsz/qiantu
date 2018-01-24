<template>
  <div class="ui-chart">
    <div class="ctitle">总资产分布图</div>
    <canvas ref="canvas"></canvas>
    <div class="total">
      <p>总资产</p>
      <p>482927.89</p>
    </div>
    <div class="list">
      <div class="list-item">
        <i></i>
        <span>国寿嘉年月月盈</span>
        <span>28,988.08</span>
        <span>29.98%</span>
      </div>
      <div class="list-item">
        <i></i>
        <span>国寿嘉年月月盈</span>
        <span>28,988.08</span>
        <span>29.98%</span>
      </div>
      <div class="list-item">
        <i></i>
        <span>国寿嘉年月月盈</span>
        <span>28,988.08</span>
        <span>29.98%</span>
      </div>
    </div>
  </div>
</template>
<script>
import F2 from '@antv/f2'
import _ from 'lodash'
import data from './data.json'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
const r = WIDTH * 0.34 - 44
// 外延距离
const OFFSET = 18
const lineHeight = 24
const totalHeight = 2 * r + 2 * OFFSET + lineHeight
const LABEL_LEN = 50
const lineStyle = {
  lineWidth: 1,
  fill: 'transparent',
  stroke: '#999999',
  opacity: 0.3,
  z: false
}
// F2 全局配置， Todo 待整出
F2.Global.pixelRatio = window.devicePixelRatio

// 计算距离圆心center r 处坐标
function getEndPoint (center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  }
}
// 计算点与圆心的角度
function getPointAngle (center, point) {
  return Math.atan2(point.y - center.y, point.x - center.x)
}
// 绘制标签
function drawLabel (label, chart) {
  const origin = label._origin
  const canvas = chart.get('canvas')
  // 标签位置
  let pos = {
    y: label.y
  }
  // 绘制文字下面横线
  if (label._side === 'left') { // 具体文本的位置
    pos.x = 70
    label.textAlign = 'left'
    F2.Graphic.drawLine(pos, {
      x: pos.x - LABEL_LEN,
      y: pos.y
    }, canvas, lineStyle)
  } else {
    pos.x = WIDTH - 20
    label.textAlign = 'right'
    F2.Graphic.drawLine(pos, {
      x: pos.x,
      y: pos.y
    }, canvas, lineStyle)
  }
  // 绘制圆点
  F2.Graphic.drawCircle({ // anchor
    x: label._anchor.x,
    y: label._anchor.y
  }, 3, canvas, {
    fill: label._color
  })
  // 绘制标签
  F2.Graphic.drawText(origin.abbreviation, {
    x: label._side === 'left' ? pos.x - LABEL_LEN : pos.x,
    y: pos.y - 4
  }, canvas, _.assign({}, label, { fill: '#79839D', fontSize: 14, fontFamily: 'PS-Helvetica,  Helvetica, sans-serif, Arial' }))
  // 绘制引线, 引线由三点连结
  F2.Graphic.drawLines([label._anchor, label._router, pos], canvas, lineStyle)
}
// 防碰撞
function antiCollision (chart, center, half, isRight) {
  const startY = center.y - r - OFFSET - lineHeight / 2
  let overlapping = true
  let totalH = totalHeight
  let i
  let maxY = 0
  let minY = Number.MIN_VALUE
  const boxes = half.map(label => {
    const labelY = label.y
    if (labelY > maxY) {
      maxY = labelY
    }
    if (labelY < minY) {
      minY = labelY
    }
    return {
      size: lineHeight,
      targets: [labelY - startY]
    }
  })
  if ((maxY - startY) > totalH) {
    totalH = maxY - startY
  }

  while (overlapping) {
    boxes.forEach(box => {
      const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2
      box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size)
    })

    // detect overlapping and join boxes
    overlapping = false
    i = boxes.length
    while (i--) {
      if (i > 0) {
        const previousBox = boxes[i - 1]
        const box = boxes[i]
        if (previousBox.pos + previousBox.size > box.pos) { // overlapping
          previousBox.size += box.size
          previousBox.targets = previousBox.targets.concat(box.targets)

          // overflow, shift up
          if (previousBox.pos + previousBox.size > totalH) {
            previousBox.pos = totalH - previousBox.size
          }
          boxes.splice(i, 1) // removing box
          overlapping = true
        }
      }
    }
  }

  // step 4: normalize y and adjust x
  i = 0
  boxes.forEach(b => {
    let posInCompositeBox = startY // middle of the label
    b.targets.forEach(() => {
      half[i].y = b.pos + posInCompositeBox + lineHeight / 2
      posInCompositeBox += lineHeight
      i++
    })
  })

  // (x - cx)^2 + (y - cy)^2 = totalR^2
  half.forEach(label => {
    const rPow2 = label.r * label.r
    const dyPow2 = Math.pow(Math.abs(label.y - center.y), 2)
    if (rPow2 < dyPow2) {
      label.x = center.x
    } else {
      const dx = Math.sqrt(rPow2 - dyPow2)
      if (!isRight) { // left
        label.x = center.x - dx
      } else { // right
        label.x = center.x + dx
      }
    }
    drawLabel(label, chart)
  })
}
export default {
  name: 'Chart',
  mounted () {
    // 创建图表
    let chart = new F2.Chart({
      el: this.$refs.canvas,
      width: WIDTH,
      height: HIGHT
    })
    // 载入数据源
    chart.source(data)
    // 设置坐标系
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.34
    })
    // 设置坐标轴
    chart.axis(false)
    // 配置图表类型等属性
    chart.interval()
      .position('namekey*ratio')
      .size(88)
      .color('abbreviation')
      .adjust('stack')
    // 渲染图表
    chart.render()

    const geom = chart.get('geoms')[0]
    const shapesData = geom.get('shapeDatas')
    const coord = geom.get('coord')
    const center = coord.center
    let sum = 0

    // 分离标签
    // step 1: 分离标签
    const labels = []
    const halves = [
      [], // left
      [] // right
    ]
    shapesData.forEach(data => {
      const label = {}
      let angle
      const percent = label._percent = data._origin.ratio
      if (_.isNumber(data.x)) {
        angle = getPointAngle(center, {
          x: data.x,
          y: data.y[0]
        })
      } else {
        const startAngle = getPointAngle(center, {
          x: data.x[0],
          y: data.y[0]
        })
        let endAngle = getPointAngle(center, {
          x: data.x[1],
          y: data.y[1]
        })
        if (startAngle >= endAngle) {
          endAngle = endAngle + Math.PI * 2
        }
        angle = (startAngle + endAngle) / 2
      }
      const edgePoint = getEndPoint(center, angle, r + 4)
      const routerPoint = getEndPoint(center, angle, r + OFFSET + 4)

      _.merge(label, {
        _angle: angle,
        _anchor: edgePoint,
        _router: routerPoint,
        _origin: data._origin,
        _color: data.color,
        _side: 'right',
        fontSize: 12,
        x: routerPoint.x,
        y: routerPoint.y,
        r: r + OFFSET
      })
      if ((sum + percent / 2) > 0.5 || (sum === 0.5 && percent === 0)) {
        label._side = 'left'
        halves[0].push(label)
      } else {
        halves[1].push(label)
      }
      sum += percent
      labels.push(label)
    })

    const maxCountForOneSide = parseInt(totalHeight / lineHeight, 10)

    let timer = setTimeout(() => {
      halves.forEach((half, index) => {
        // step 2: reduce labels
        if (half.length > maxCountForOneSide) {
          half.sort((a, b) => {
            return b._percent - a._percent
          })
          half.splice(maxCountForOneSide, half.length - maxCountForOneSide)
        }

        // step 3: distribute position (x and y)
        half.sort((a, b) => a.y - b.y)
        antiCollision(chart, center, half, index)
        clearTimeout(timer)
      })
    }, 2000)
  }
}
</script>
