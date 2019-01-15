<template>
  <div class="page">
    <div class="ui-ui">
      <!--<div class="sound">
        <i class="iconfont icon-heng"></i>
        <i class="iconfont icon-dian"></i>
      </div>-->
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-rise c-white" @click="goBack"></i>
        <p class="c-white title">
          <a class="flex-1 underline">账单</a>
        </p>
        <i slot="right" v-show="id" @click="remove" class="iconfont icon-trash thin c-white"></i>
      </x-header>
      <swiper v-model="tabIndex" :show-dots="false" height="100px">
        <swiper-item v-if="!id">
          <div class="ui-info">
            <img :src="'./static/img/'+treasure.icon" @click="viewInfo"/>
            <div class="flex">
              <div class="name">
                <p>{{treasure.name}}</p>
                <p class="desc">当前资产：{{treasure.amount | fmoney(2)}}</p>
              </div>
              <input type="number" v-model="amount" />
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="ui-info">
            <img :src="'./static/img/'+treasure.icon" @click="viewInfo"/>
            <div class="flex">
              <div class="name">
                <p>{{treasure.name}}</p>
                <p class="desc">
                  {{treasure.code}}
                </p>
              </div>
              <input type="number" v-model="money" />
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <scroller lock-x ref="scroller" height="202px">
      <div class="ui-wls">
        <div class="item" :class="{selected: index===selected}" v-for="(item, index) in wealth" :key="item.code" @click="selected=index">
          <img :src="'./static/img/'+item.icon" />
          <p>{{item.short}}</p>
        </div>
      </div>
    </scroller>
    <group>
      <datetime v-model="date" title="交易日期："></datetime>
    </group>
    <group>
      <x-switch title="出入账：" v-model="recorded"></x-switch>
    </group>
    <group>
      <x-textarea :max="20" placeholder="备注" v-model="note"></x-textarea>
    </group>
    <a class="ui-add" @click="save">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </a>
  </div>
</template>
<script>
import { XHeader, Group, Swiper, SwiperItem, Scroller, Datetime, XSwitch, XTextarea } from 'vux'
import moment from 'moment'
import _ from 'lodash'
import { Check } from '@/libs/check'
import mixin from '@/libs/vue/mixin'

const Today = moment().format('YYYY-MM-DD')

export default {
  name: 'Bill',
  mixins: [mixin],
  data () {
    return {
      tabIndex: 0,
      selected: 0,
      amount: '',
      money: '',
      date: Today,
      recorded: false,
      note: '',
      id: ''
    }
  },
  computed: {
    wealth () {
      return this.$store.getters.get_wealth
    },
    treasure () {
      let index = this.selected
      return this.wealth[index] || {}
    }
  },
  watch: {
    tabIndex (val, old) {
      this.calc(val)
    }
  },
  activated () {
    // 没有财富
    /* if (!this.treasure.icon) {
      this.$router.push({
        name: 'Info',
        params: {
          isCurrent: 0
        }
      })
      return
    } */
    let query = this.$route.query
    let {id, code, money, date, recorded, note} = query
    if (code) {
      this.selected = _.findIndex(this.wealth, _.matchesProperty('code', code))
      this.money = money
      this.date = date
      this.recorded = recorded
      this.note = note
      this.id = id
      this.tabIndex = 1
    }
  },
  deactivated () {
    // 退出当前页面，重置
    this.tabIndex = 0
    this.selected = 0
    this.amount = ''
    this.money = ''
    this.date = Today
    this.recorded = false
    this.note = ''
    this.id = ''
  },
  methods: {
    // 同步计算金额与总额
    calc (val) {
      let last = this.treasure.amount
      let amount = this.amount
      let money = this.money
      let lastMoney = +(this.$route.query.money || 0)
      if (val && amount !== '') {
        this.money = (amount - last + lastMoney).toFixed(2)
      } else if (!val && money !== '') {
        let diff = (money - lastMoney).toFixed(2)
        this.amount = (+last + +diff).toFixed(2)
      }
    },
    // 保存
    save () {
      this.calc(1)
      let self = this
      let trId = this.treasure.id
      let {mgdbId, code} = this.treasure
      let {id, money, date, recorded, note} = this
      let lastMoney = +(this.$route.query.money || 0)
      let lastCode = this.$route.query.code
      let diff = (money - lastMoney).toFixed(2)
      let bill = {
        id,
        trId: trId,
        trMgdbId: mgdbId,
        money,
        date,
        recorded,
        note,
        code,
        diff
      }
      // 切换了财富
      if (lastCode && lastCode !== code) {
        this.$store.dispatch('calc_amount', {
          code: lastCode,
          diff: -lastMoney
        })
        bill.diff = money
      }
      // 校验
      let flag = new Check(bill, {
        money: {
          auth: ['NotNull'],
          mess: ['请输入账单金额']
        }
      }).then((message) => {
        this.$prompt(message)
      })
      if (flag) {
        this.$store.dispatch('save_bill', {
          bill,
          handle () {
            self.goBack()
          }
        })
      }
    },
    // 删除账单
    remove () {
      let {id, code, money} = this.$route.query
      let self = this
      this.$store.dispatch('remove_bill', {
        bill: {
          id,
          code,
          money
        },
        handle () {
          self.goBack()
        }
      })
    },
    // 查看财富详情
    viewInfo () {
      let code = this.treasure.code
      this.$store.commit('tr_set_current', code)
      this.$router.push({
        name: 'Info',
        params: {
          isCurrent: 1
        }
      })
    }
  },
  components: {
    XHeader, Group, Swiper, SwiperItem, Scroller, Datetime, XSwitch, XTextarea
  }
}
</script>
