<template>
  <div>
    <van-nav-bar>
      <div slot="title">
        <span style="margin-right:0.5em">理财通</span>
        <van-icon name="arrow-down" :size="12" color="#000000"></van-icon>
      </div>
      <van-icon slot="right" name="home-o"></van-icon>
    </van-nav-bar>
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
      <div style="background-color:#f8ffd7;padding-bottom:260px;text-align:center">改成轮播图</div>
    </div>
    <van-cell-group>
      <van-cell label="200.89" isLink center icon="home-o" title="易方达信用债">43%</van-cell>
      <van-cell title="招商中证白酒指数" label="899.01" isLink center icon="home-o">57%</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, RadioGroup, Radio, CellGroup, Cell } from 'vant'
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
    [Cell.name]: Cell
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"h-div","options":{"ref":"cmp000","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp0000"},"childs":["理财通"]},{"node":"vant-icon","options":{"ref":"cmp0001"},"childs":[]}]},{"node":"vant-icon","options":{"slot":"right","ref":"cmp001"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"vant-col","options":{"ref":"cmp0100"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01000"},"childs":[]},{"node":"h-span","options":{"ref":"cmp01001"},"childs":["2月"]},{"node":"vant-icon","options":{"ref":"cmp01002"},"childs":[]}]},{"node":"vant-col","options":{"ref":"cmp0101"},"childs":["2580.07"]},{"node":"vant-col","options":{"ref":"cmp0102"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01020"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01021"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01022"},"childs":[]}]}]},{"node":"vant-radio-group","options":{"ref":"cmp011"},"childs":[{"node":"vant-radio","options":{"ref":"cmp0110"},"childs":["支出"]},{"node":"vant-radio","options":{"ref":"cmp0111"},"childs":["收入"]},{"node":"vant-radio","options":{"ref":"cmp0112"},"childs":["资产"]}]},{"node":"h-div","options":{"ref":"cmp012"},"childs":["改成轮播图"]}]},{"node":"vant-cell-group","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell","options":{"ref":"cmp020"},"childs":["43%"]},{"node":"vant-cell","options":{"ref":"cmp021"},"childs":["57%"]}]}]}
</vvv>
