<template>
  <div>
    <div class="ui-analyze">
      <div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-menu"></i>
        <p class="title">
          <a class="flex-1" @click="swipe">详情</a>
          <a class="flex-1 underline">分析</a>
        </p>
        <a slot="right" :class="{rotate: isSyn}" @click="syn">
          <i class="iconfont icon-syn"></i>
        </a>
      </x-header>
    </div>
    <pie />
    <chart />
    <graph />
  </div>
</template>
<script>
import { XHeader, Scroller } from 'vux'

import Pie from '@/components/Pie'
import Chart from '@/components/Chart'
import Graph from '@/components/Graph'

export default {
  name: 'Analyze',
  computed: {
    isSyn () {
      return this.$store.state.device.isSyn
    }
  },
  methods: {
    // 详情
    swipe () {
      this.$emit('swipe', 0)
    },
    // 同步
    syn () {
      this.$store.commit('dv_set_issyn')
    }
  },
  components: {
    XHeader, Scroller, Pie, Chart, Graph
  }
}
</script>
