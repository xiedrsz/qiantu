<template>
  <van-tabbar route>
    <van-tabbar-item to="/">
      <van-icon slot="icon" class-prefix="iconfont" name="wealth" />
      <span>财富</span>
    </van-tabbar-item>
    <van-tabbar-item to="/report">
      <van-icon slot="icon" class-prefix="iconfont" name="report" />
      <span>报表</span>
    </van-tabbar-item>
    <van-tabbar-item to="/plan">
      <van-icon slot="icon" class-prefix="iconfont" name="plan" />
      <span>计划</span>
    </van-tabbar-item>
    <van-tabbar-item icon="setting" to="/setting">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from 'vant'
export default {
  name: 'MTabbar',
  props: {
    actived: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  }
}
</script>

<style lang="less" scoped>
</style>
