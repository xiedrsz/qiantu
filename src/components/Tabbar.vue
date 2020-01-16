<template>
  <van-tabbar route>
    <van-tabbar-item to="/">
      <van-icon slot="icon" slot-scope="props" :name="props.active ? '/logo/wealth-active.svg' : '/logo/wealth.svg'" />
      <span>财富</span>
    </van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/report">报表</van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/plan">计划</van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/setting">设置</van-tabbar-item>
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
