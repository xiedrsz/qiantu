import F2 from '@antv/f2'
import _ from 'lodash'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
F2.Global.pixelRatio = window.devicePixelRatio

class Graph {
  constructor (canvas, data) {
    const uid = _.random(100)
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
          let result = ~~val + ''
          let len = result.length
          if (len >= 5) {
            if (val % 10000) {
              val = result = result.slice(-4)
              len = 4
            } else {
              result = val / 10000
              return `${~~result}W`
            }
          }
          if (len === 4) {
            if (val % 1000) {
              return `${result.substring(1, 4)}`
            } else {
              result = val / 1000
              return `${~~result}K`
            }
          }
          return result
        }
      }
    }
    // 配置date刻度文字样式
    const label = {
      fill: '#979797',
      font: '12px san-serif',
      offset: 6
    }

    data.length < 1 && (data = [])

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
      min: 0,
      label: {
        fontSize: 10
      }
    })
    chart.source(data, defs)
    chart.guide().html({
      position: ['min', 'max'],
      html:
      `<div id="tooltipWrapper${uid}" style="height: 45px; background-color: rgba(255, 255, 200, 0.1); line-height: 45px;">
        <div id="tooltipName${uid}" style="float:left;font-size:12px;color:#2E2E2E;margin-left:18px;"></div>
        <div id="tooltipValue${uid}" style="float:right;font-size:12px;color:#2E2E2E;margin-right:18px;"></div>
      </div>`,
      offsetY: -22.5
    })
    chart.tooltip({
      showCrosshairs: true,
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange (obj) {
        let items = obj.items
        let originData = items[0].origin
        let date = originData.date
        let value = originData.amount.toFixed(2)
        let tooltipWrapper = document.getElementById(`tooltipWrapper${uid}`)
        let tooltipName = document.getElementById(`tooltipName${uid}`)
        let tooltipValue = document.getElementById(`tooltipValue${uid}`)
        tooltipWrapper.style.width = `${WIDTH}px`
        tooltipWrapper.style.left = 0
        tooltipName.innerText = `日期: ${date}`
        tooltipValue.innerText = value
        tooltipWrapper.style.display = 'block'
      },
      onHide: function onHide () {
        let tooltipWrapper = document.getElementById(`tooltipWrapper${uid}`)
        tooltipWrapper.style.display = 'none'
      }
    })
    // 绘制渐变色区域图
    chart.area().position('date*amount')
      .color('l(90) 0:#1890ff 1:#f7f7f7')
      .shape('smooth')
    chart.line().size(2).color('#1890FF').position('date*amount')
      .shape('smooth')
    chart.render()
    this.chart = chart
  }

  changeData (data) {
    data.length < 1 && (data = [])
    this.chart.changeData(data)
  }
}

export default Graph
