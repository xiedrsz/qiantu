<template>
  <div>
    <div class="ui-analyze">
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-menu" @click="toggleMenu"></i>
        <p class="title">
          <a class="flex-1" @click="swipe">详情</a>
          <a class="flex-1 underline">分析</a>
        </p>
        <a slot="right" :class="{rotate: isSyn}" @click="syn">
          <i class="iconfont icon-syn"></i>
        </a>
      </x-header>
    </div>
    <scroller lock-x ref="scroller" :height="sheight">
      <div>
        <pie title="资产分布" :list="children" v-show="children.length" />
        <chart title="累计收益" :list="monthYields" />
        <graph title="资产变动" :list="dailyProperty" />
        <graph title="年化收益率" :list="yields"/>
        <div style="height: 1px"></div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { XHeader, Scroller } from 'vux'
import _ from 'lodash'
import Pie from '@/components/Pie'
import Chart from '@/components/Chart'
import Graph from '@/components/Graph'

export default {
  name: 'Analyze',
  data () {
    return {
      sheight: ''
    }
  },
  computed: {
    isSyn () {
      return this.$store.state.device.isSyn
    },
    children () {
      return this.$store.getters.get_children
    },
    monthYields () {
      let res = this.$store.getters.get_month_yield
      return _.map(res, ({month, yields}) => {
        return {
          tem: yields,
          month: `${month}月`,
          isProfit: yields >= 0
        }
      })
    },
    dailyProperty () {
      let res = this.$store.getters.get_daily_property
      return _.map(res, ({date, property}) => {
        return {
          date,
          amount: property
        }
      })
    },
    yields () {
      let res = this.$store.getters.get_annual_yield
      return _.map(res, ({date, yields}) => {
        return {
          date,
          amount: yields
        }
      })
    }
  },
  created () {
    let height = this.$store.state.device.height
    height = height - 90
    this.sheight = `${height}px`
  },
  methods: {
    // 详情
    swipe () {
      this.$emit('swipe', 0)
    },
    // 同步
    syn () {
      this.$store.commit('dv_set_issyn')
    },
    // 收展菜单
    toggleMenu () {
      this.$store.commit('dv_toggle_mode')
    }
  },
  components: {
    XHeader, Scroller, Pie, Chart, Graph
  }
}
</script>
