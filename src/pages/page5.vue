<template>
  <div>
    <div class="ui-analyze">
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-menu"></i>
        <p class="title">
          <a class="flex-1">详情</a>
          <a class="flex-1 underline">分析</a>
        </p>
      </x-header>
    </div>
    <pie />
    <chart />
    <graph />
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider } from 'vux'

import Pie from '@/components/Pie'
import Chart from '@/components/Chart'
import Graph from '@/components/Graph'

export default {
  name: 'Page5',
  data () {
    return {
      name: '',
      parant: '',
      note: '',
      list: [{
        key: 'cx',
        value: '储蓄'
      }],
      tabIndex: 0,
      labels: ['记录', '账单'],
      wealthes: ['1', '2'],
      statuses: [{
        key: '0',
        value: '未完成'
      }],
      time: '',
      job: '',
      status: ''
    }
  },
  methods: {
    save () {
      console.log('保存')
    }
  },
  components: {
    XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider, Pie, Chart, Graph
  }
}
</script>
