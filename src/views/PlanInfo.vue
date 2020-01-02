<template>
  <div>
    <van-nav-bar title="计划详情" leftArrow @click-left="goBack"></van-nav-bar>
    <div>
      <van-row>
        <p style="padding-left:15px;text-align:none;margin-top:0;margin-bottom:0">招商中证白酒指数</p>
      </van-row>
      <van-cell title="每两周二" label="从 余额+ 转入 400元" center>管理计划</van-cell>
    </div>
    <div>
      <van-row>
        <van-col span="12" style="text-align:center">
          <div>累计转入了</div>
          <div>10期</div>
        </van-col>
        <van-col span="12" style="text-align:center">
          <div>累计转入了</div>
          <div>4000元</div>
        </van-col>
      </van-row>
      <van-steps direction="vertical">
        <van-step>
          <p>
            <span>08月08日</span>
            <span>转日400元</span>
            <span>成功</span>
          </p>
        </van-step>
        <van-step>
          <p>
            <span>08月08日</span>
            <span>转日400元</span>
            <span>成功</span>
          </p>
        </van-step>
        <van-step>
          <p>
            <span>08月08日</span>
            <span>转日400元</span>
            <span>成功</span>
          </p>
        </van-step>
      </van-steps>
    </div>
    <van-button size="large">查看计划产品</van-button>
  </div>
</template>

<script>
import { NavBar, Row, Cell, Col, Steps, Step, Button } from 'vant'
export default {
  name: 'PlanInfo',
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Steps.name]: Steps,
    [Step.name]: Step,
    [Button.name]: Button
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"h-p","options":{"ref":"cmp0100"},"childs":["招商中证白酒指数"]}]},{"node":"vant-cell","options":{"ref":"cmp011"},"childs":["管理计划"]}]},{"node":"h-div","options":{"ref":"cmp02"},"childs":[{"node":"vant-row","options":{"ref":"cmp020"},"childs":[{"node":"vant-col","options":{"ref":"cmp0200"},"childs":[{"node":"h-div","options":{"ref":"cmp02000"},"childs":["累计转入了"]},{"node":"h-div","options":{"ref":"cmp02001"},"childs":["10期"]}]},{"node":"vant-col","options":{"ref":"cmp0201"},"childs":[{"node":"h-div","options":{"ref":"cmp02010"},"childs":["累计转入了"]},{"node":"h-div","options":{"ref":"cmp02011"},"childs":["4000元"]}]}]},{"node":"vant-steps","options":{"ref":"cmp021"},"childs":[{"node":"vant-step","options":{"ref":"cmp0210"},"childs":[{"node":"h-p","options":{"ref":"cmp02100"},"childs":[{"node":"h-span","options":{"ref":"cmp021000"},"childs":["08月08日"]},{"node":"h-span","options":{"ref":"cmp021001"},"childs":["转日400元"]},{"node":"h-span","options":{"ref":"cmp021002"},"childs":["成功"]}]}]},{"node":"vant-step","options":{"ref":"cmp0211"},"childs":[{"node":"h-p","options":{"ref":"cmp02110"},"childs":[{"node":"h-span","options":{"ref":"cmp021100"},"childs":["08月08日"]},{"node":"h-span","options":{"ref":"cmp021101"},"childs":["转日400元"]},{"node":"h-span","options":{"ref":"cmp021102"},"childs":["成功"]}]}]},{"node":"vant-step","options":{"ref":"cmp0212"},"childs":[{"node":"h-p","options":{"ref":"cmp02120"},"childs":[{"node":"h-span","options":{"ref":"cmp021200"},"childs":["08月08日"]},{"node":"h-span","options":{"ref":"cmp021201"},"childs":["转日400元"]},{"node":"h-span","options":{"ref":"cmp021202"},"childs":["成功"]}]}]}]}]},{"node":"vant-button","options":{"ref":"cmp03"},"childs":["查看计划产品"]}]}
</vvv>
