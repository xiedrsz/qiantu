<template>
  <div class="ui-chart">
    <div class="ctitle">收益曲线</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import F2 from '@antv/f2'
const WIDTH = document.documentElement.clientWidth * 0.96
const HIGHT = WIDTH * 0.8
F2.Global.pixelRatio = window.devicePixelRatio
export default {
  name: 'Graph',
  mounted () {
    const data = [
      { time: '一', tem: 5010, city: 'beijing' },
      { time: '二', tem: 5022, city: 'beijing' },
      { time: '三', tem: 5020, city: 'beijing' },
      { time: '四', tem: 5026, city: 'beijing' },
      { time: '五', tem: 5020, city: 'beijing' },
      { time: '六', tem: 5026, city: 'beijing' },
      { time: '日', tem: 5028, city: 'beijing' }
    ]
    const chart = new F2.Chart({
      el: this.$refs.canvas,
      width: WIDTH,
      height: HIGHT,
      padding: [30, 10, 30, 30]
    })
    const defs = {
      time: {
        tickCount: 7,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 10,
        min: 5000,
        formatter (val) {
          if (val === 5000) {
            return '5K'
          } else {
            return val - 5000
          }
        }
      }
    }
      // 配置time刻度文字样式
    const label = {
      fill: '#979797',
      font: '14px san-serif',
      offset: 6
    }
    chart.axis('time', {
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
    chart.axis('tem', {
      min: 8,
      label: {
        fontSize: 14
      }
    })
    chart.source(data, defs)

    let canvas = this.$refs.canvas
    let linearGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 500)
    linearGradient.addColorStop(0.5, '#fff')
    linearGradient.addColorStop(0, 'rgb(15, 141, 232)')
    // 绘制渐变色区域图
    chart.area().position('time*tem')
      .color('city', function (city) {
        if (city === 'beijing') {
          return linearGradient
        }
        return 'rgba(1, 1, 1, 0)'
      })
      .style({
        opacity: 0.6
      })
      .shape('smooth')

    chart.line().size(2).position('time*tem')
      .color('city')
      .shape('smooth')

    chart.render()
  }
}
</script>
