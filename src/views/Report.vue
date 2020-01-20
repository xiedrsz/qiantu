<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar>
      <div slot="title" @click="showPicker">
        <span class="mgr-5">{{account.name}}</span>
        <van-icon :name="show ? 'arrow-up' : 'arrow-down'" :size="12" color="#000000"></van-icon>
      </div>
    </van-nav-bar>
    <!-- 图表 -->
    <div>
      <van-row justify="space-around" type="flex" style="padding-top:10px;text-align:center">
        <van-col span="5">
          <van-icon name="arrow-left" :size="12"></van-icon>
          <span style="margin-right:12px;margin-left:12px">2月</span>
          <van-icon name="arrow" :size="12"></van-icon>
        </van-col>
        <van-col span="12">2580.07</van-col>
        <van-col span="5">
          <van-icon name="home-o"></van-icon>
          <van-icon name="home-o"></van-icon>
          <van-icon name="home-o"></van-icon>
        </van-col>
      </van-row>
      <van-radio-group
        value="1"
        style="padding-bottom:12px;display:flex;padding-left:12px;padding-right:12px;padding-top:12px"
      >
        <van-radio name="1" style="flex:1">支出</van-radio>
        <van-radio name="2" style="flex:1;text-align:none">收入</van-radio>
        <van-radio name="3">资产</van-radio>
      </van-radio-group>
      <!-- <div style="background-color:#f8ffd7;padding-bottom:260px;text-align:center">改成轮播图</div> -->
      <pie ref="pie" :list="childProperty" @refresh="setLegends" />
    </div>
    <!-- 内容 -->
    <van-cell-group>
      <van-cell v-for="item in childProperty" :key="item.id" :label="item.amount" center :title="item.name" @click="tipLegend(item.name)">
        <van-icon slot="icon" class-prefix="iconfont" :name="item.icon" :style="{color: colors[item.name]}" />
        <span>{{item.value}}</span>
      </van-cell>
    </van-cell-group>
    <!-- MTabbar -->
    <m-tabbar></m-tabbar>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="归属" :columns="accounts" value-key="name" @cancel="hidePicker" @confirm="onSelect" />
    </van-popup>
  </div>
</template>

<script>
import _ from 'lodash'
import { NavBar, Icon, Row, Col, RadioGroup, Radio, CellGroup, Cell, Picker, Popup } from 'vant'
import MTabbar from '@/components/Tabbar'
import Pie from '@/components/Pie'

export default {
  name: 'Report',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    MTabbar,
    Pie
  },
  data () {
    return {
      colors: {},
      show: false
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    },
    childProperty () {
      let list = this.$store.getters.childProperty
      let total = _.sumBy(list, 'amount')
      let res = _.map(list, ({ amount, ...other }) => {
        let value = `${(amount / total * 100).toFixed(2)}%`
        return {
          ...other,
          amount,
          value
        }
      })
      return res
    },
    accounts () {
      return this.$store.state.accounts.list
    }
  },
  watch: {
    accounts (value) {
      console.log(value)
    }
  },
  methods: {
    setLegends (legends) {
      this.colors = _.transform(legends, (res, { name, marker: { fill } }) => {
        res[name] = fill
        return res
      }, {})
    },
    tipLegend (name) {
      this.$refs.pie.tipLegend(name)
    },
    showPicker () {
      this.show = true
    },
    hidePicker () {
      this.show = false
    },
    onSelect (item) {
      this.$store.commit('SET_A_CURRENT', item.id)
      this.hidePicker()
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"h-div","options":{"ref":"cmp000","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp0000"},"childs":["理财通"]},{"node":"vant-icon","options":{"ref":"cmp0001"},"childs":[]}]},{"node":"vant-icon","options":{"slot":"right","ref":"cmp001"},"childs":[]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"vant-col","options":{"ref":"cmp0100"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01000"},"childs":[]},{"node":"h-span","options":{"ref":"cmp01001"},"childs":["2月"]},{"node":"vant-icon","options":{"ref":"cmp01002"},"childs":[]}]},{"node":"vant-col","options":{"ref":"cmp0101"},"childs":["2580.07"]},{"node":"vant-col","options":{"ref":"cmp0102"},"childs":[{"node":"vant-icon","options":{"ref":"cmp01020"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01021"},"childs":[]},{"node":"vant-icon","options":{"ref":"cmp01022"},"childs":[]}]}]},{"node":"vant-radio-group","options":{"ref":"cmp011"},"childs":[{"node":"vant-radio","options":{"ref":"cmp0110"},"childs":["支出"]},{"node":"vant-radio","options":{"ref":"cmp0111"},"childs":["收入"]},{"node":"vant-radio","options":{"ref":"cmp0112"},"childs":["资产"]}]},{"node":"h-div","options":{"ref":"cmp012"},"childs":["改成轮播图"]}]},{"node":"vant-cell-group","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell","options":{"ref":"cmp020"},"childs":["43%"]},{"node":"vant-cell","options":{"ref":"cmp021"},"childs":["57%"]}]}]}
</vvv>
