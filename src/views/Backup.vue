<template>
  <div>
    <van-nav-bar title="导入/备份" leftArrow>
      <van-icon slot="right" name="search"></van-icon>
      <van-icon slot="right" name="search"></van-icon>
    </van-nav-bar>
    <van-field type="textarea" placeholder="预设内容"></van-field>
    <van-tabbar>
      <van-tabbar-item icon="home-o">财富</van-tabbar-item>
      <van-tabbar-item icon="home-o">消费</van-tabbar-item>
      <van-tabbar-item icon="home-o">计划</van-tabbar-item>
      <van-tabbar-item icon="home-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Icon, Field, Tabbar, TabbarItem } from 'vant'
export default {
  name: 'backup',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]},{"node":"vant-icon","options":{"slot":"right","ref":"cmp001"},"childs":[]}]},{"node":"vant-field","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-tabbar","options":{"ref":"cmp02"},"childs":[{"node":"vant-tabbar-item","options":{"ref":"cmp020"},"childs":["财富"]},{"node":"vant-tabbar-item","options":{"ref":"cmp021"},"childs":["消费"]},{"node":"vant-tabbar-item","options":{"ref":"cmp022"},"childs":["计划"]},{"node":"vant-tabbar-item","options":{"ref":"cmp023"},"childs":["设置"]}]}]}
</vvv>
