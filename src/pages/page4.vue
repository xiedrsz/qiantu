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
          <a class="flex-1 underline">財富</a>
        </p>
      </x-header>
      <swiper :show-dots="false" height="100px">
        <swiper-item>
          <div class="ui-wname">
            <img src="/static/img/shbank.png" />
            <input type="text" v-model="money" />
          </div>
        </swiper-item>
      </swiper>
    </div>
    <scroller lock-x ref="scroller" height="202px">
      <div class="ui-wls">
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item selected">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
        <div class="item">
          <img src="/static/img/shbank.png" />
          <p>国盈</p>
        </div>
      </div>
    </scroller>
    <group>
      <selector title="归属：" v-model="date" :options="statuses" direction="rtl"></selector>
    </group>
    <group>
      <x-switch title="集合：" v-model="job"></x-switch>
    </group>
    <group>
      <x-textarea :max="20" placeholder="备注" ></x-textarea>
    </group>
    <div class="ui-add">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider, Datetime, XSwitch, XTextarea } from 'vux'

import F2 from '@antv/f2'

console.log(F2)
export default {
  name: 'Page4',
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
      status: '',
      money: '￥2345.09'
    }
  },
  methods: {
    save () {
      console.log('保存')
    }
  },
  components: {
    XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider, Datetime, XSwitch, XTextarea
  }
}
</script>
