<template>
  <div class="page">
    <div class="ui-ui">
      <div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>
      <x-header :left-options="{showBack: false}" title="国寿嘉年月月盈">
        <i slot="left" class="iconfont icon-rise c-white"></i>
        <p class="c-white title">
          <a class="flex-1 underline">账单</a>
          <!--<a class="flex-1">分析</a>-->
        </p>
      </x-header>
      <swiper v-model="tabIndex" :show-dots="false" height="100px">
        <swiper-item v-for="(item, index) in wealthes" :key="index">
          <div class="ui-info">
            <img src="/static/img/shbank.png" />
            <div class="flex">
              <div class="flex-1">国寿嘉年月月盈</div>
              <input type="text" />
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>

    <graph />

    <group>
      <datetime v-model="date" title="交易日期："></datetime>
    </group>
    <group>
      <x-switch title="出入账：" v-model="job"></x-switch>
    </group>
    <div class="ui-add">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider, Datetime, XSwitch } from 'vux'
import Graph from '@/components/Graph'
export default {
  name: 'Page3',
  data () {
    return {
      date: '',
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
    XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider, Datetime, XSwitch, Graph
  }
}
</script>
