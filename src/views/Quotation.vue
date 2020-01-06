<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar title="招商中证白酒指数" leftArrow @click-left="goBack">
      <van-icon slot="right" name="plus" @click="gotoInfo()"></van-icon>
    </van-nav-bar>
    <!-- 行情走势图 -->
    <div style="height:200px;background-color:#eff9ff"></div>
    <!-- 详情 -->
    <van-cell-group title="行情">
      <van-cell isLink title="2019.08.31" @click="gotoInfo(11)">2.08</van-cell>
      <van-cell isLink title="2019.08.31">2.08</van-cell>
      <van-cell isLink title="2019.08.31">2.08</van-cell>
    </van-cell-group>
    <van-divider>没有更多了</van-divider>
  </div>
</template>

<script>
import { NavBar, Icon, CellGroup, Cell, Divider } from 'vant'
export default {
  name: 'Quotation',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Divider.name]: Divider
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    gotoInfo (id) {
      let options = {
        path: '/newquotation'
      }
      if (id) {
        options.query = { id }
      }
      this.$router.push(options)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-cell-group","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell","options":{"ref":"cmp020"},"childs":["2.08"]},{"node":"vant-cell","options":{"ref":"cmp021"},"childs":["2.08"]},{"node":"vant-cell","options":{"ref":"cmp022"},"childs":["2.08"]}]},{"node":"vant-divider","options":{"ref":"cmp03"},"childs":["没有更多了"]},{"node":"vant-tabbar","options":{"ref":"cmp04"},"childs":[{"node":"vant-tabbar-item","options":{"ref":"cmp040"},"childs":["财富"]},{"node":"vant-tabbar-item","options":{"ref":"cmp041"},"childs":["消费"]},{"node":"vant-tabbar-item","options":{"ref":"cmp042"},"childs":["计划"]},{"node":"vant-tabbar-item","options":{"ref":"cmp043"},"childs":["设置"]}]}]}
</vvv>
