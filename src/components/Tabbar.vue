<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/">财富</van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/report">报表</van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/plan">计划</van-tabbar-item>
    <van-tabbar-item icon="home-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Backup',
  props: {
    actived: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="less" scoped>
</style>
