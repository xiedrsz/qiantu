<template>
  <div class="ui-chart">
    <div class="ctitle">{{title}}</div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <div class="mask" @click="create" v-if="!chart">
      <img src="../assets/img/graph.svg" />
    </div>
  </div>
</template>
<script>
import F2 from '@antv/f2'
import _ from 'lodash'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
F2.Global.pixelRatio = window.devicePixelRatio

// 创建Graph
function createGraph (canvas, data) {
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

  /* chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
    onShow: ev => {
      let items = ev.items
      items[0].name = null
      items[0].value = items[0].origin.amount.toFixed(2)
      ev.items.pop()
    }
  }) */

  // 绘制渐变色区域图
  chart.area().position('date*amount')
    .color('l(90) 0:#1890ff 1:#f7f7f7')
    .shape('smooth')

  // Todo 渐变色有BUG, 暂时屏蔽
  // chart.line().size(2).color('l(90) 0:#1890FF 1:#f7f7f7').position('date*amount')
  chart.line().size(2).color('#1890FF').position('date*amount')
    .shape('smooth')

  chart.render()
  return chart
}

export default {
  name: 'Graph',
  props: {
    title: {
      type: String,
      default: '曲线图'
    },
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
      width: WIDTH,
      height: HIGHT,
      chart: null
    }
  },
  watch: {
    list (val, old) {
      if (this.chart) {
        let len = val.length
        val = len > 1 ? val : []
        this.chart.changeData(val)
      }
    }
  },
  methods: {
    create () {
      let list = this.list
      let len = list.length
      list = len > 1 ? list : []
      this.chart = createGraph(this.$refs.canvas, list)
    }
  }
}
</script>
