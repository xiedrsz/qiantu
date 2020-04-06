<template>
  <div>
    <van-nav-bar title="导入/备份" leftArrow @click-left="goBack">
      <van-icon slot="right" name="search" @click="onCopy"></van-icon>
    </van-nav-bar>
    <van-field type="textarea" placeholder="预设内容"></van-field>
    <van-button type="info" size="large" round @click="onImport">导入</van-button>
  </div>
</template>

<script>
import { NavBar, Icon, Field, Button } from 'vant'
export default {
  name: 'Backup',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onCopy () {
      // console.log('Todo Copy')
    },
    onImport () {
      // console.log('Todo')
      let depth = window.history.length - 2
      this.$router.go(-depth)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]},{"node":"vant-icon","options":{"slot":"right","ref":"cmp001"},"childs":[]}]},{"node":"vant-field","options":{"ref":"cmp01"},"childs":[]},{"node":"vant-tabbar","options":{"ref":"cmp02"},"childs":[{"node":"vant-tabbar-item","options":{"ref":"cmp020"},"childs":["财富"]},{"node":"vant-tabbar-item","options":{"ref":"cmp021"},"childs":["消费"]},{"node":"vant-tabbar-item","options":{"ref":"cmp022"},"childs":["计划"]},{"node":"vant-tabbar-item","options":{"ref":"cmp023"},"childs":["设置"]}]}]}
</vvv>
