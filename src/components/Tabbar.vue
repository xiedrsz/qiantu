<template>
  <van-tabbar>
    <van-tabbar-item icon="home-o">财富</van-tabbar-item>
    <van-tabbar-item icon="home-o">报表</van-tabbar-item>
    <van-tabbar-item icon="home-o">计划</van-tabbar-item>
    <van-tabbar-item icon="home-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Backup',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="less" scoped>
</style>
