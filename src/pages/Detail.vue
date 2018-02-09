<template>
  <div>
    <div class="ui-ui">
      <div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-menu c-white"></i>
        <p class="c-white title">
          <a class="flex-1 underline">详情</a>
          <a class="flex-1" @click="swipe">分析</a>
        </p>
        <div slot="right">
          <a v-show="treasure.code!=='00'" @click="up">
            <i class="iconfont icon-parent c-white"></i>
          </a>
          <a :class="{rotate: isSyn}" @click="syn">
            <i class="iconfont icon-syn c-white"></i>
          </a>
        </div>
      </x-header>
      <a class="number" @click="viewInfo">
        <p>{{treasure.name}}</p>
        <p>
          <span class="main">{{treasure.amount | fmoney(2)}}</span>
        </p>
        <p class="mgt-5">
          <span>月增长速度:</span>
          <span class="yuan">{{treasure.speed}}</span>
        </p>
      </a>
    </div>
    <div class="ui-plan">
      <scroller lock-y >
        <div class="ui-list" :style="'width:' + swidth + 'px'">
          <div class="item" v-for="item in children" :key="item.code" @click="setCurrent(item.code)">
            <p>{{item.short}}</p>
            <p>{{item.proportion | suffix("%")}}</p>
          </div>
          <a class="item" v-show="treasure.iscollection" href="#/info/0">
            <div class="icon">
              <i class="iconfont icon-new"></i>
            </div>
          </a>
        </div>
      </scroller>
    </div>
    <scroller lock-x ref="scroller" :height="sheight">
      <div class="ui-wealthes">
        <div>
          <div class="bill" v-for="(item, index) in billes" :key="index">
            <div class="date">{{item.date}}</div>
            <div class="detail" v-for="(temp, i) in item.list" :key="i" @click="view(temp)">
              <img :src="'/static/img/'+temp.icon" />
              <div class="flex">
                <div class="flex-1">{{temp.name}}</div>
                <div class="money" :class="{'c-blue': temp.money < 0, 'c-red': temp.money >= 0}">{{temp.money|signature}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <a class="ui-add" href="#/bill">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </a>
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
      let iscollection = this.treasure.iscollection
      iscollection && (len += 0.8)
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
    },
    // 设置当前财富
    setCurrent (code) {
      this.$store.commit('tr_set_current', code)
    },
    // 返回上一级
    up () {
      let code = this.treasure.code.slice(0, -3)
      this.$store.commit('tr_set_current', code)
    },
    // 查看、修改资料
    viewInfo () {
      let code = this.treasure.code
      if (code !== '00') {
        this.$router.push({
          name: 'Info',
          params: {
            isCurrent: 1
          }
        })
      }
    },
    // 查看/修改账单
    view (item) {
      this.$router.push({
        path: '/bill',
        query: {
          ...item
        }
      })
    }
  },
  components: {
    XHeader, Scroller
  }
}
</script>
