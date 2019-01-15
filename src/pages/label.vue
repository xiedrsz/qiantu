<template>
  <div>
    <div class="ui-analyze">
      <!-- <div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div> -->
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
        <pie title="储蓄分布图" :list="children" v-show="children.length" />
        <chart :list="trchange" />
        <graph :list="trdaily" />
        <div style="height: 1px"></div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { XHeader, Scroller } from 'vux'
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
    trchange () {
      return this.$store.getters.get_tr_change
    },
    trdaily () {
      return this.$store.getters.get_tr_daily
    }
  },
  created () {
    let height = this.$store.state.device.height
    height = height - 90
    this.sheight = `${height}px`
  },
  mounted () {
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
