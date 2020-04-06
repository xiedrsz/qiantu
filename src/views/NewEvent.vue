<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar title="2019.08.01" leftArrow @click-left="goBack">
      <van-icon v-if="id" slot="right" name="delete" @click="onDelete"></van-icon>
    </van-nav-bar>
    <!-- 表单 -->
    <van-cell title="事件" isLink>休市</van-cell>
    <van-cell title="目标产品" isLink>全部产品</van-cell>
    <van-field type="textarea" placeholder="备注"></van-field>
    <van-button type="info" size="large" round @click="onConfirm">确定</van-button>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, Field, Button } from 'vant'
export default {
  name: 'NewEvent',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Field.name]: Field,
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
      // console.log('Todo')
      this.goBack()
    },
    onConfirm () {
      // console.log('Todo')
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
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-cell","options":{"ref":"cmp01"},"childs":["休市"]},{"node":"vant-cell","options":{"ref":"cmp02"},"childs":["全部产品"]},{"node":"vant-field","options":{"ref":"cmp03"},"childs":[]},{"node":"vant-button","options":{"ref":"cmp04"},"childs":["确定"]}]}
</vvv>
