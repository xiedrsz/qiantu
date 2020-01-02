<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar title="新增计划" leftArrow @click-left="goBack">
      <van-icon v-if="id" slot="right" name="delete" @click="onDelete"></van-icon>
    </van-nav-bar>
    <!-- 表单 -->
    <van-cell title="产品" isLink>招商中证白酒指数</van-cell>
    <van-field label="金额" value="400" inputAlign="right"></van-field>
    <van-cell title="计划周期" isLink>每两周二</van-cell>
    <van-switch-cell title="非交易日顺延" value></van-switch-cell>
    <van-cell title="资金账户" isLink>余额+</van-cell>
    <van-row style="padding-top:10px;padding-bottom:10px;padding-right:16px;padding-left:16px">标签</van-row>
    <van-row style="padding-top:10px;padding-bottom:10px;padding-right:16px;padding-left:16px">
      <van-tag plain round size="medium" color="#000000">标签内容</van-tag>
      <van-tag plain color="#000000" round size="medium">标签内容</van-tag>
    </van-row>
    <p style="padding-left:16px">
      <span>下个转入日</span>
      <span style="color:#3a4dff">08月20日</span>
      <span>，遇非交易日顺延</span>
    </p>
    <van-button type="info" size="large" round @click="confirm">确定</van-button>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, Field, SwitchCell, Row, Tag, Button } from 'vant'
export default {
  name: 'NewPlan',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [SwitchCell.name]: SwitchCell,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onDelete () {
      console.log('Todo')
      this.goBack()
    },
    confirm () {
      console.log('Todo')
      this.goBack()
    }
  },
  mounted () {
    let id = this.$route.query.id
    this.id = id
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-cell","options":{"ref":"cmp01"},"childs":["招商中证白酒指数"]},{"node":"vant-field","options":{"ref":"cmp02"},"childs":[]},{"node":"vant-cell","options":{"ref":"cmp03"},"childs":["每两周二"]},{"node":"vant-switch-cell","options":{"ref":"cmp04"},"childs":[]},{"node":"vant-cell","options":{"ref":"cmp05"},"childs":["余额+"]},{"node":"vant-tabbar","options":{"ref":"cmp06"},"childs":[{"node":"vant-tabbar-item","options":{"ref":"cmp060"},"childs":["财富"]},{"node":"vant-tabbar-item","options":{"ref":"cmp061"},"childs":["消费"]},{"node":"vant-tabbar-item","options":{"ref":"cmp062"},"childs":["计划"]},{"node":"vant-tabbar-item","options":{"ref":"cmp063"},"childs":["设置"]}]},{"node":"vant-row","options":{"ref":"cmp07"},"childs":["标签"]},{"node":"vant-row","options":{"ref":"cmp08"},"childs":[{"node":"vant-tag","options":{"ref":"cmp080"},"childs":["标签内容"]},{"node":"vant-tag","options":{"ref":"cmp081"},"childs":["标签内容"]}]},{"node":"h-p","options":{"ref":"cmp09"},"childs":[{"node":"h-span","options":{"ref":"cmp090"},"childs":["下个转入日"]},{"node":"h-span","options":{"ref":"cmp091"},"childs":["08月20日"]},{"node":"h-span","options":{"ref":"cmp092"},"childs":["，遇非交易日顺延"]}]},{"node":"vant-button","options":{"ref":"cmp010"},"childs":["确定"]}]}
</vvv>
