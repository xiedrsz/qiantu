<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar :title="account.name" leftArrow @click-left="goBack">
      <!-- 行情 -->
      <van-icon slot="right" name="plus" @click="gotoQuotation()"></van-icon>
    </van-nav-bar>
    <!-- 账户概要 -->
    <div>
      <van-row>
        <p style="padding-left:15px">总市值（元）</p>
      </van-row>
      <van-cell size="large" isLink @click="gotoProperty">
        <div>
          <span style="font-size:27px">{{ account.capitalization }}</span>
          <span v-if="account.share">({{ account.share }}份)</span>
        </div>
      </van-cell>
      <van-row type="flex" justify="space-around">
        <van-col>流入1200.87</van-col>
        <van-col>流出1234.98</van-col>
      </van-row>
    </div>
    <div style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px">
      <van-button icon="star-o" size="large" type="info" @click="gotoBill()">记一笔</van-button>
    </div>
    <!-- 账单列表 -->
    <div>
      <van-cell-group>
        <p slot="title">
          <span>12月</span>
          <span style="float:right">+12000，-8000</span>
        </p>
        <van-cell title="定投计划" isLink icon="star-o" @click="gotoBill(11)">+ ￥400</van-cell>
        <van-cell title="收益浮动" isLink icon="star-o">+ ￥2.48</van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="定投计划" isLink icon="star-o">+ ￥400</van-cell>
        <van-cell title="收益浮动" isLink icon="star-o">+ ￥2.48</van-cell>
        <p slot="title">
          <span>11月</span>
          <span style="float:right">+12000，-8000</span>
        </p>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Cell, Col, Button, CellGroup } from 'vant'
export default {
  name: 'Account',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    gotoQuotation () {
      let id = this.id
      this.$router.push({
        path: '/quotation',
        query: {
          id
        }
      })
    },
    gotoProperty () {
      let id = this.id
      this.$router.push({
        path: '/newproperty',
        query: {
          id
        }
      })
    },
    gotoBill (id) {
      let options = {
        path: '/newbill'
      }
      if (id !== undefined) {
        options.query = {
          id
        }
      }
      this.$router.push(options)
    }
  },
  mounted () {
    this.id = +this.$route.query.id
    this.$store.commit('SET_CURRENT', this.id)
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"h-p","options":{"ref":"cmp0100"},"childs":["总市值（元）"]}]},{"node":"vant-cell","options":{"ref":"cmp011"},"childs":[{"node":"h-div","options":{"ref":"cmp0110"},"childs":[{"node":"h-span","options":{"ref":"cmp01100"},"childs":["2580.07"]},{"node":"h-span","options":{"ref":"cmp01101"},"childs":["(200.89份)"]}]}]},{"node":"vant-row","options":{"ref":"cmp012"},"childs":[{"node":"vant-col","options":{"ref":"cmp0120"},"childs":["流入1200.87"]},{"node":"vant-col","options":{"ref":"cmp0121"},"childs":["流出1234.98"]}]}]},{"node":"h-div","options":{"ref":"cmp02"},"childs":[{"node":"vant-button","options":{"ref":"cmp020"},"childs":["记一笔"]}]},{"node":"h-div","options":{"ref":"cmp03"},"childs":[{"node":"vant-cell-group","options":{"ref":"cmp030"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0300"},"childs":["+ ￥400"]},{"node":"vant-cell","options":{"ref":"cmp0301"},"childs":["+ ￥2.48"]},{"node":"h-p","options":{"ref":"cmp0302","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp03020"},"childs":["12月"]},{"node":"h-span","options":{"ref":"cmp03021"},"childs":["+12000，-8000"]}]}]},{"node":"vant-cell-group","options":{"ref":"cmp031"},"childs":[{"node":"vant-cell","options":{"ref":"cmp0310"},"childs":["+ ￥400"]},{"node":"vant-cell","options":{"ref":"cmp0311"},"childs":["+ ￥2.48"]},{"node":"h-p","options":{"ref":"cmp0312","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp03120"},"childs":["11月"]},{"node":"h-span","options":{"ref":"cmp03121"},"childs":["+12000，-8000"]}]}]}]}]}
</vvv>
