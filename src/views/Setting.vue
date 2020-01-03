<template>
  <div>
    <van-nav-bar title="设置"></van-nav-bar>
    <van-cell icon="home-o" title="导入/备份" isLink to="/backup"></van-cell>
    <van-cell icon="home-o" title="投资日历" isLink to="/calendar"></van-cell>
    <!-- MTabbar -->
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import { NavBar, Icon, Cell } from 'vant'
import MTabbar from '@/components/Tabbar'

export default {
  name: 'Setting',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    MTabbar
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-cell","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-cell","options":{"ref":"cmp02"},"childs":[]},{"node":"vant-tabbar","options":{"ref":"cmp03"},"childs":[{"node":"vant-tabbar-item","options":{"ref":"cmp030"},"childs":["财富"]},{"node":"vant-tabbar-item","options":{"ref":"cmp031"},"childs":["消费"]},{"node":"vant-tabbar-item","options":{"ref":"cmp032"},"childs":["计划"]},{"node":"vant-tabbar-item","options":{"ref":"cmp033"},"childs":["设置"]}]}]}
</vvv>
