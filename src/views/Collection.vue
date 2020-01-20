<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar :title="account.name" :leftArrow="!!id" @click-left="goBack">
      <van-icon slot="right" name="plus" @click="gotoProperty()"></van-icon>
    </van-nav-bar>
    <!-- 账户概要 -->
    <div>
      <van-row>
        <p style="padding-left:15px">总市值（元）</p>
      </van-row>
      <van-cell size="large" :isLink="!!id" @click="gotoProperty(id)">
        <div>
          <span style="font-size:27px">{{ capitalization }}</span>
        </div>
      </van-cell>
      <!-- <van-row type="flex" justify="space-around">
        <van-col>流入1200.87</van-col>
        <van-col>流出1234.98</van-col>
      </van-row> -->
    </div>
    <!-- 子级账户 -->
    <div>
      <template v-for="collection in children">
        <van-cell-group v-if="collection.children.length" :key="collection.id">
          <p slot="title" @click="gotoAccount(collection.id, collection.isCollection)">
            <span>{{collection.name}}</span>
          </p>
          <van-cell v-for="item in collection.children" :key="item.id" :title="item.name" isLink @click="gotoAccount(item.id, item.isCollection)">
            <van-icon slot="icon" class-prefix="iconfont" :name="item.icon" />
          </van-cell>
        </van-cell-group>
        <van-cell v-else :key="collection.id" :title="collection.name" isLink @click="gotoAccount(collection.id, collection.isCollection)">
          <van-icon slot="icon" class-prefix="iconfont" :name="collection.icon" />
        </van-cell>
      </template>
    </div>
    <!-- MTabbar -->
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import _ from 'lodash'
import { NavBar, Icon, Row, Cell, Col, CellGroup } from 'vant'
import MTabbar from '@/components/Tabbar'

export default {
  name: 'Collection',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    MTabbar
  },
  computed: {
    id () {
      let { id } = this.$route.query
      return id
    },
    account () {
      return this.$store.getters.account
    },
    children () {
      return this.$store.getters.children
    },
    capitalization () {
      let bills = this.$store.getters.bills
      return _.sumBy(bills, ({ inflow, outflow }) => inflow + outflow)
    }
  },
  watch: {
    $route (value) {
      let id = value.query.id
      this.$store.commit('SET_A_CURRENT', id)
    }
  },
  mounted () {
    let id = this.$route.query.id
    this.$store.commit('SET_A_CURRENT', id)
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    gotoProperty (id) {
      let options = {
        path: '/newproperty'
      }
      if (id) {
        options.query = {
          id
        }
      }
      this.$router.push(options)
    },
    gotoAccount (id, isCollection) {
      let path = isCollection ? '/' : '/account'
      this.$router.push({
        path,
        query: {
          id
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
