<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar title="总资产" :leftArrow="showBack" @click-left="goBack">
      <van-icon slot="right" name="plus" @click="add"></van-icon>
    </van-nav-bar>
    <!-- 账户概要 -->
    <div>
      <van-row>
        <p style="padding-left:15px">总市值（元）</p>
      </van-row>
      <van-cell size="large">
        <div>
          <span style="font-size:27px">2580.07</span>
          <span>(200.89份)</span>
        </div>
      </van-cell>
      <van-row type="flex" justify="space-around">
        <van-col>流入1200.87</van-col>
        <van-col>流出1234.98</van-col>
      </van-row>
    </div>
    <!-- 子级账户 -->
    <div>
      <van-cell-group>
        <p slot="title" @click="changeCollection">
          <span>基金</span>
          <span style="float:right">21899.99</span>
        </p>
        <van-cell title="理财通" isLink icon="star-o" @click="gotoAccount">400</van-cell>
        <van-cell title="支付宝" isLink icon="star-o">2.48</van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="东莞证券" isLink icon="star-o">400</van-cell>
        <van-cell title="平安证券" isLink icon="star-o">2.48</van-cell>
        <p slot="title">
          <span>股票</span>
          <span style="float:right">8000</span>
        </p>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Cell, Col, CellGroup } from 'vant'
export default {
  name: 'Collection',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      showBack: false
    }
  },
  watch: {
    $route (value) {
      let query = value.query
      let { current } = query
      this.showBack = current !== undefined
    }
  },
  mounted () {
    let query = this.$route.query
    let { current } = query
    this.showBack = current !== undefined
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    add () {
      this.$router.push({
        path: '/newproperty'
      })
    },
    changeCollection () {
      this.$router.push({
        path: '/',
        query: {
          current: 0
        }
      })
    },
    gotoAccount () {
      this.$router.push({
        path: '/account',
        query: {
          current: 0
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"h-p","options":{"ref":"cmp0100"},"childs":["总市值（元）"]}]},{"node":"vant-cell","options":{"ref":"cmp011"},"childs":[{"node":"h-div","options":{"ref":"cmp0110"},"childs":[{"node":"h-span","options":{"ref":"cmp01100"},"childs":["2580.07"]},{"node":"h-span","options":{"ref":"cmp01101"},"childs":["(200.89份)"]}]}]},{"node":"vant-row","options":{"ref":"cmp012"},"childs":[{"node":"vant-col","options":{"ref":"cmp0120"},"childs":["流入1200.87"]},{"node":"vant-col","options":{"ref":"cmp0121"},"childs":["流出1234.98"]}]}]},{"node":"h-div","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell-group","options":{"ref":"cmp020"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0200"},"childs":["400"]},{"node":"vant-cell","options":{"ref":"cmp0201"},"childs":["2.48"]},{"node":"h-p","options":{"ref":"cmp0202","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp02020"},"childs":["基金"]},{"node":"h-span","options":{"ref":"cmp02021"},"childs":["21899.99"]}]}]},{"node":"vant-cell-group","options":{"ref":"cmp021"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0210"},"childs":["400"]},{"node":"vant-cell","options":{"ref":"cmp0211"},"childs":["2.48"]},{"node":"h-p","options":{"ref":"cmp0212","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp02120"},"childs":["股票"]},{"node":"h-span","options":{"ref":"cmp02121"},"childs":["8000"]}]}]}]}]}
</vvv>
