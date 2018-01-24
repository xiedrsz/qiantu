<template>
  <canvas id="c1" ref="canvas"></canvas>
</template>
<script>
import F2 from '@antv/f2'
import _ from 'lodash'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
export default {
  name: 'Chart',
  mounted () {
    F2.Global.pixelRatio = window.devicePixelRatio
    // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    var data = [
      {iconType: 'learn', amount: 16, ratio: 0.1, memo: '学习', namekey: 'namekey'},
      {iconType: 'foo', amount: 16, ratio: 0.5, memo: '睡觉', namekey: 'namekey'},
      {iconType: 'foo', amount: 16, ratio: 0.05, memo: '吃饭', namekey: 'namekey'},
      {iconType: 'manner', amount: 2, ratio: 0.15, memo: '讲礼貌', namekey: 'namekey'},
      {iconType: 'other', amount: 4, ratio: 0.05, memo: '其他', namekey: 'namekey'},
      {iconType: 'sport', amount: 81, ratio: 0.1, memo: '运动', namekey: 'namekey'},
      {iconType: 'none', amount: 20, ratio: 0.05, memo: '暂无备注', namekey: 'namekey'}
    ]
    var chart = new F2.Chart({
      el: this.$refs.canvas,
      width: WIDTH, // 指定图表宽度
      height: HIGHT // 指定图表高度
    })

    // Step 2: 载入数据源
    chart.source(data)
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.8
    })
    chart.axis(false)
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval()
      .position('namekey*ratio')
      .color('memo')
      .adjust('stack')
    // Step 4: 渲染图表
    chart.render()

    // >>>>>>>>>>>>>>>>>>>>>>>>> labeling <<<<<<<<<<<<<<<<<<<<<<<<<<
  //   function distance(p1, p2) {
  //       const x = p1.x - p2.x
  //       const y = p1.y - p2.y
  //       return Math.sqrt(x * x + y * y)
  //   }
    function getEndPoint (center, angle, r) {
      return {
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle)
      }
    }
    function getPointAngle (center, point) {
      return Math.atan2(point.y - center.y, point.x - center.x)
    }

    const geom = chart.get('geoms')[0]
    const shapesData = geom.get('shapeDatas')
    const coord = geom.get('coord')
    const center = coord.center
    const r = coord.radius

    let sum = 0
    const OFFSET = 20
    const lineHeight = 32
    const totalHeight = 2 * r + 2 * OFFSET + lineHeight
  //   const LABEL_OFFSET = 20
    const LABEL_LEN = 50
    const lineStyle = {
      lineWidth: 1,
      fill: 'transparent',
      stroke: 'none',
      opacity: 0.3,
      z: false
    }

    function drawLabel (label) {
      const origin = label._origin
      const canvas = chart.get('canvas')
      const pos = { // label position
        y: label.y
      }
      if (label._side === 'left') { // 具体文本的位置
        pos.x = 120
        label.textAlign = 'left'
        F2.Graphic.drawLine(pos, {
          x: pos.x - LABEL_LEN,
          y: pos.y
        }, canvas, lineStyle)
      } else {
        pos.x = r * 2 + 200
        label.textAlign = 'right'
        F2.Graphic.drawLine(pos, {
          x: pos.x,
          y: pos.y
        }, canvas, lineStyle)
      }
      F2.Graphic.drawCircle({ // anchor
        x: label._anchor.x,
        y: label._anchor.y
      }, 1, canvas, {
        fill: 'grey'
      })
      F2.Graphic.drawText(origin.memo, { // memo
        x: label._side === 'left' ? pos.x - LABEL_LEN : pos.x,
        y: pos.y - 4
      }, canvas, label)
      F2.Graphic.drawText(origin.amount.toFixed(2), { // amount
        x: label._side === 'left' ? pos.x - LABEL_LEN : pos.x,
        y: pos.y + 12
      }, canvas, _.assign({}, label, { fill: '#8A8A8F' }))
      F2.Graphic.drawLines([label._anchor, label._router, pos], canvas, lineStyle)
    }

    // distribute labels
    // step 1: separate labels
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
      const edgePoint = getEndPoint(center, angle, r)
      const routerPoint = getEndPoint(center, angle, r + OFFSET)

      _.merge(label, {
        _angle: angle,
        _anchor: edgePoint,
        _router: routerPoint,
        _origin: data._origin,
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
    const startY = center.y - r - OFFSET - lineHeight / 2

    setTimeout(() => {
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
        antiCollision(half, index)
      })
    }, 2000)

    function antiCollision (half, isRight) {
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
        drawLabel(label)
      })
    }
  }
}
</script>
