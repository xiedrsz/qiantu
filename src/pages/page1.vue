<template>
  <div>
    <div class="ui-ui">
      <div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>
      <x-header :left-options="{showBack: false}" title="国寿嘉年月月盈">
        <i slot="left" class="iconfont icon-menu c-white"></i>
        <p class="c-white title">
          <a class="flex-1 underline">详情</a>
          <a class="flex-1">分析</a>
        </p>
      </x-header>
      <div class="number">
        <p>理财通</p>
        <p>
          <span class="main">13,489.00</span>
        </p>
        <p class="mgt-5">
          <span>月增长速度:</span>
          <span class="yuan">200.39</span>
        </p>
      </div>
    </div>
    <div class="ui-plan">
      <scroller lock-y>
        <div class="ui-list">
          <div class="item">
            <p>国盈</p>
            <p>23.67%</p>
          </div>
          <div class="item">
            <p>民财</p>
            <p>28.12%</p>
          </div>
          <div class="item">
            <p>中券</p>
            <p>31.98%</p>
          </div>
          <div class="item">
            <p>零通</p>
            <p>63.07%</p>
          </div>
        </div>
      </scroller>
    </div>
    <scroller v-show="tabIndex===0" lock-x ref="scroller" height="267px">
      <div class="ui-wealthes">
        <div>
          <div class="bill">
            <div class="date">10/01/2018</div>
            <div class="detail">
              <img src="/static/img/shbank.png" />
              <div class="flex">
                <div class="flex-1">国寿嘉年月月盈</div>
                <div class="money c-blue">+ 5.78</div>
              </div>
            </div>
            <div class="detail">
              <img src="/static/img/shbank.png" />
              <div class="flex">
                <div class="flex-1">民生加银月度理财</div>
                <div class="money c-red1">&minus; 30.45</div>
              </div>
            </div>
          </div>
          <div class="bill">
            <div class="date">09/01/2018</div>
            <div class="detail">
              <img src="/static/img/shbank.png" />
              <div class="flex">
                <div class="flex-1">国寿嘉年月月盈</div>
                <div class="money c-blue">+ 5.78</div>
              </div>
            </div>
            <div class="detail">
              <img src="/static/img/shbank.png" />
              <div class="flex">
                <div class="flex-1">民生加银月度理财</div>
                <div class="money c-red1">&minus; 30.45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <div class="ui-add">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider } from 'vux'

export default {
  name: 'Page1',
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
    XHeader, Group, XInput, XButton, Selector, Tab, TabItem, Swiper, SwiperItem, Scroller, Flow, FlowState, FlowLine, Divider
  }
}
</script>
