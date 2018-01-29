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
        <i slot="right" class="iconfont icon-trash thin c-white"></i>
      </x-header>
      <swiper v-model="tabIndex" :show-dots="false" height="100px">
        <swiper-item v-for="(item, index) in wealthes" :key="index">
          <div class="ui-info" v-show="tabIndex===0">
            <img src="/static/img/shbank.png" />
            <div class="flex">
              <div class="name">
                <p>国寿嘉年月月盈</p>
                <p class="desc">财富值：￥898.98</p>
              </div>
              <input type="text" v-model="money" />
            </div>
          </div>
          <div class="ui-info" v-show="tabIndex===1">
            <img src="/static/img/shbank.png" />
            <div class="flex">
              <div class="name">
                <p>国寿嘉年月月盈</p>
                <p class="desc">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  8967
                </p>
              </div>
              <input type="text" v-model="money" />
            </div>
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
      <datetime v-model="date" title="交易日期："></datetime>
    </group>
    <group>
      <x-switch title="出入账：" v-model="job"></x-switch>
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

export default {
  name: 'Page2',
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
