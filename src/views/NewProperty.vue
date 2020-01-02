<template>
  <div>
    <van-nav-bar title="新增资产" leftArrow @click-left="goBack"></van-nav-bar>
    <van-field label="名称" inputAlign="right" placeholder="招商中证白酒指数"></van-field>
    <van-field label="代码" inputAlign="right" placeholder="161725"></van-field>
    <van-switch-cell title="集合"></van-switch-cell>
    <van-cell title="归属" isLink>理财通</van-cell>
    <van-field label="份额" inputAlign="right" placeholder="635.98"></van-field>
    <van-field label="资产" inputAlign="right" placeholder="2000"></van-field>
    <van-row class="van-cell">标签</van-row>
    <van-row type="flex" class="van-cell">
      <van-tag size="large" plain round>标签内容</van-tag>
      <van-tag size="large" plain round>标签内容</van-tag>
    </van-row>
    <van-field type="textarea" placeholder="备注"></van-field>
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
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    confirm () {
      console.log('Todo')
      this.goBack()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-field","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-field","options":{"ref":"cmp02"},"childs":[]},{"node":"vant-switch-cell","options":{"ref":"cmp03"},"childs":[]},{"node":"vant-cell","options":{"ref":"cmp04"},"childs":["理财通"]},{"node":"vant-field","options":{"ref":"cmp05"},"childs":[]},{"node":"vant-field","options":{"ref":"cmp06"},"childs":[]},{"node":"vant-row","options":{"ref":"cmp07"},"childs":["标签"]},{"node":"vant-row","options":{"ref":"cmp08"},"childs":[{"node":"vant-tag","options":{"ref":"cmp080"},"childs":["标签内容"]},{"node":"vant-tag","options":{"ref":"cmp081"},"childs":["标签内容"]}]},{"node":"vant-field","options":{"ref":"cmp09"},"childs":[]},{"node":"vant-button","options":{"ref":"cmp010"},"childs":["确定"]}]}
</vvv>
