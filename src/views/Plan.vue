<template>
  <div>
    <van-nav-bar title="我的计划">
      <van-icon slot="right" name="more-o"></van-icon>
    </van-nav-bar>
    <div>
      <van-row>
        <p style="padding-left:15px;text-align:center">总计划数</p>
      </van-row>
      <van-row>
        <p style="padding-left:15px;text-align:center;font-size:32px;margin-top:0;margin-bottom:0">4</p>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col>流入1200.87</van-col>
        <van-col>流出1234.98</van-col>
      </van-row>
    </div>
    <div>
      <van-row>
        <p style="padding-left:15px">详情</p>
      </van-row>
      <van-panel>
        <van-cell slot="header" title="招商中证白酒指数" isLink label="余额+" center>累计转入800</van-cell>
        <van-row>
          <van-col span="8" style="text-align:center">
            <div>计划日期</div>
            <div>每两周二</div>
          </van-col>
          <van-col span="8" style="text-align:center">
            <div>计划金额</div>
            <div>400</div>
          </van-col>
          <van-col span="8" style="text-align:center">
            <div>下个执行日</div>
            <div>2019.12.22</div>
          </van-col>
        </van-row>
      </van-panel>
      <van-panel style="margin-top:10px">
        <van-cell slot="header" title="招商中证白酒指数" isLink label="余额+" center>累计转入800</van-cell>
        <van-row>
          <van-col span="8" style="text-align:center">
            <div>计划日期</div>
            <div>每两周二</div>
          </van-col>
          <van-col span="8" style="text-align:center">
            <div>计划金额</div>
            <div>400</div>
          </van-col>
          <van-col span="8" style="text-align:center">
            <div>下个执行日</div>
            <div>2019.12.22</div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, Panel, Cell } from 'vant'
export default {
  name: 'Plan',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Panel.name]: Panel,
    [Cell.name]: Cell
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"h-p","options":{"ref":"cmp0100"},"childs":["总计划数"]}]},{"node":"vant-row","options":{"ref":"cmp011"},"childs":[{"node":"h-p","options":{"ref":"cmp0110"},"childs":["4"]}]},{"node":"vant-row","options":{"ref":"cmp012"},"childs":[{"node":"vant-col","options":{"ref":"cmp0120"},"childs":["流入1200.87"]},{"node":"vant-col","options":{"ref":"cmp0121"},"childs":["流出1234.98"]}]}]},{"node":"h-div","options":{"ref":"cmp02"},"childs":[{"node":"vant-row","options":{"ref":"cmp020"},"childs":[{"node":"h-p","options":{"ref":"cmp0200"},"childs":["详情"]}]},{"node":"vant-panel","options":{"ref":"cmp021"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0210","slot":"header"},"childs":["累计转入800"]},{"node":"vant-row","options":{"ref":"cmp0211"},"childs":[{"node":"vant-col","options":{"ref":"cmp02110"},"childs":[{"node":"h-div","options":{"ref":"cmp021100"},"childs":["计划日期"]},{"node":"h-div","options":{"ref":"cmp021101"},"childs":["每两周二"]}]},{"node":"vant-col","options":{"ref":"cmp02111"},"childs":[{"node":"h-div","options":{"ref":"cmp021110"},"childs":["计划金额"]},{"node":"h-div","options":{"ref":"cmp021111"},"childs":["400"]}]},{"node":"vant-col","options":{"ref":"cmp02112"},"childs":[{"node":"h-div","options":{"ref":"cmp021120"},"childs":["下个执行日"]},{"node":"h-div","options":{"ref":"cmp021121"},"childs":["2019.12.22"]}]}]}]},{"node":"vant-panel","options":{"ref":"cmp022"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0220","slot":"header"},"childs":["累计转入800"]},{"node":"vant-row","options":{"ref":"cmp0221"},"childs":[{"node":"vant-col","options":{"ref":"cmp02210"},"childs":[{"node":"h-div","options":{"ref":"cmp022100"},"childs":["计划日期"]},{"node":"h-div","options":{"ref":"cmp022101"},"childs":["每两周二"]}]},{"node":"vant-col","options":{"ref":"cmp02211"},"childs":[{"node":"h-div","options":{"ref":"cmp022110"},"childs":["计划金额"]},{"node":"h-div","options":{"ref":"cmp022111"},"childs":["400"]}]},{"node":"vant-col","options":{"ref":"cmp02212"},"childs":[{"node":"h-div","options":{"ref":"cmp022120"},"childs":["下个执行日"]},{"node":"h-div","options":{"ref":"cmp022121"},"childs":["2019.12.22"]}]}]}]}]}]}
</vvv>
