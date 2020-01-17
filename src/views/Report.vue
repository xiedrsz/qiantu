<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar>
      <div slot="title">
        <span style="margin-right:0.5em">理财通</span>
        <van-icon name="arrow-down" :size="12" color="#000000"></van-icon>
      </div>
    </van-nav-bar>
    <!-- 图表 -->
    <div>
      <van-row justify="space-around" type="flex" style="padding-top:10px;text-align:center">
        <van-col span="5">
          <van-icon name="arrow-left" :size="12"></van-icon>
          <span style="margin-right:12px;margin-left:12px">2月</span>
          <van-icon name="arrow" :size="12"></van-icon>
        </van-col>
        <van-col span="12">2580.07</van-col>
        <van-col span="5">
          <van-icon name="home-o"></van-icon>
          <van-icon name="home-o"></van-icon>
          <van-icon name="home-o"></van-icon>
        </van-col>
      </van-row>
      <van-radio-group
        value="1"
        style="padding-bottom:12px;display:flex;padding-left:12px;padding-right:12px;padding-top:12px"
      >
        <van-radio name="1" style="flex:1">支出</van-radio>
        <van-radio name="2" style="flex:1;text-align:none">收入</van-radio>
        <van-radio name="3">资产</van-radio>
      </van-radio-group>
      <!-- Todo -->
      <canvas id="container" width="375" height="260"></canvas>
      <div style="background-color:#f8ffd7;padding-bottom:260px;text-align:center">改成轮播图</div>
      <pie />
    </div>
    <!-- 内容 -->
    <van-cell-group>
      <van-cell label="200.89" center icon="home-o" title="易方达信用债">43%</van-cell>
      <van-cell title="招商中证白酒指数" label="899.01" center icon="home-o">57%</van-cell>
    </van-cell-group>
    <!-- MTabbar -->
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import F2 from '@antv/f2'
import { NavBar, Icon, Row, Col, RadioGroup, Radio, CellGroup, Cell } from 'vant'
import MTabbar from '@/components/Tabbar'
import Pie from '@/components/Pie'

const data = [{
  name: '股票类',
  percent: 83.59,
  a: '1'
}, {
  name: '债券类',
  percent: 2.17,
  a: '1'
}, {
  name: '现金类',
  percent: 14.24,
  a: '1'
}]

const map = {}
data.forEach(function (obj) {
  map[obj.name] = obj.percent + '%'
})

export default {
  name: 'Report',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    MTabbar,
    Pie
  },
  mounted () {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio,
      padding: [ 20, 'auto' ]
    })
    chart.source(data, {
      percent: {
        formatter: function formatter (val) {
          return val + '%'
        }
      }
    })
    chart.tooltip(false)
    chart.legend({
      position: 'right',
      itemFormatter: function itemFormatter (val) {
        return val + '    ' + map[val]
      }
    })
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.7,
      radius: 0.85
    })
    chart.axis(false)
    chart.interval()
      .position('a*percent')
      .color('name', [ '#FE5D4D', '#3BA4FF', '#737DDE' ])
      .adjust('stack')

    chart.guide().html({
      position: [ '50%', '45%' ],
      html: `<div style="width: 250px;height: 40px;text-align: center;">
      <div style="font-size: 16px">总资产</div>
      <div style="font-size: 24px">133.08 亿</div>
    </div>`
    })
    chart.render()
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"h-div","options":{"ref":"cmp000","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp0000"},"childs":["理财通"]},{"node":"vant-icon","options":{"ref":"cmp0001"},"childs":[]}]},{"node":"vant-icon","options":{"slot":"right","ref":"cmp001"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"vant-col","options":{"ref":"cmp0100"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01000"},"childs":[]},{"node":"h-span","options":{"ref":"cmp01001"},"childs":["2月"]},{"node":"vant-icon","options":{"ref":"cmp01002"},"childs":[]}]},{"node":"vant-col","options":{"ref":"cmp0101"},"childs":["2580.07"]},{"node":"vant-col","options":{"ref":"cmp0102"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01020"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01021"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01022"},"childs":[]}]}]},{"node":"vant-radio-group","options":{"ref":"cmp011"},"childs":[{"node":"vant-radio","options":{"ref":"cmp0110"},"childs":["支出"]},{"node":"vant-radio","options":{"ref":"cmp0111"},"childs":["收入"]},{"node":"vant-radio","options":{"ref":"cmp0112"},"childs":["资产"]}]},{"node":"h-div","options":{"ref":"cmp012"},"childs":["改成轮播图"]}]},{"node":"vant-cell-group","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell","options":{"ref":"cmp020"},"childs":["43%"]},{"node":"vant-cell","options":{"ref":"cmp021"},"childs":["57%"]}]}]}
</vvv>
