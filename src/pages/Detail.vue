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
          <a class="flex-1" @click="swipe">分析</a>
        </p>
        <a slot="right" :class="{rotate: isSyn}" @click="syn">
          <i class="iconfont icon-syn c-white"></i>
        </a>
      </x-header>
      <div class="number">
        <p>{{treasure.name}}</p>
        <p>
          <span class="main">{{treasure.amount | fmoney(2)}}</span>
        </p>
        <p class="mgt-5">
          <span>月增长速度:</span>
          <span class="yuan">{{treasure.speed}}</span>
        </p>
      </div>
    </div>
    <div class="ui-plan">
      <scroller lock-y >
        <div class="ui-list" :style="'width:' + swidth + 'px'">
          <div class="item" v-for="item in children" :key="item.code">
            <p>{{item.short}}</p>
            <p>{{item.proportion | suffix("%")}}</p>
          </div>
        </div>
      </scroller>
    </div>
    <scroller lock-x ref="scroller" :height="sheight">
      <div class="ui-wealthes">
        <div>
          <div class="bill" v-for="(item, index) in billes" :key="index">
            <div class="date">{{item.date}}</div>
            <div class="detail" v-for="(temp, i) in item.list" :key="i">
              <img src="/static/img/shbank.png" />
              <div class="flex">
                <div class="flex-1">{{temp.name}}</div>
                <div class="money" :class="{'c-blue': temp.money < 0, 'c-red': temp.money >= 0}">{{temp.money|signature}}</div>
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
import { XHeader, Scroller } from 'vux'

export default {
  name: 'Detail',
  data () {
    return {
      list: [{
        key: 'cx',
        value: '储蓄'
      }]
    }
  },
  computed: {
    isSyn () {
      return this.$store.state.device.isSyn
    },
    treasure () {
      return this.$store.getters.get_treasure
    },
    children () {
      return this.$store.getters.get_children
    },
    swidth () {
      let list = this.children
      let len = list.length
      return 80 * len
    },
    sheight () {
      let height = this.$store.state.device.height
      let list = this.children
      let len = list.length
      height = height - 330
      height = len ? height - 50 : height
      return `${height}px`
    },
    billes () {
      return this.$store.getters.get_billes
    }
  },
  methods: {
    // 分析
    swipe () {
      this.$emit('swipe', 1)
    },
    // 同步
    syn () {
      this.$store.commit('dv_set_issyn')
    }
  },
  components: {
    XHeader, Scroller
  }
}
</script>
