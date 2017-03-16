<template>
  <div>
    <x-menu></x-menu>
    <x-header :left-options='{showBack: false}'>
      <img slot='left' @click="openMenu" src='/static/img/menu.png' />财富分布
      <img slot='right' @click="flip(null)" src="/static/img/flip.png" />
    </x-header>
    <flip ref="flip">
      <div slot="front" style="height: 600px;">
        <div class="ac-money">
          <div>
            <img id="uac-type" :src="form.icon||defaultIcon" />
          </div>
          <div>
            <input type="text" placeholder="新集合/财富名称" v-model="form.name" />
          </div>
          <div class="g-txt-r g-color-r">
            <span>{{form.value}}</span>
          </div>
        </div>
        <out-items :out-items="outItems" @on-select="select"></out-items>
        <div class='footer'>
          <div class="ac-input">
            <div>
              <img src="/static/img/account.png" />
            </div>
            <div>
              {{form.account}}
            </div>
          </div>
          <div class="ac-input">
            <div>
              <img src="/static/img/classify.png" />
            </div>
            <div>
              财富集合
            </div>
          </div>
          <div class="ac-input">
            <div>
              <img src="/static/img/edit.png" />
            </div>
            <div>
              <input type="text" placeholder="备注" v-model="form.mess" />
            </div>
          </div>
          <button class='ac-btn' @click="save">
            保存
          </button>
        </div>
      </div>
      <!-- 前 -->
      <div slot="back" style="width: 360px;">
        <pie></pie>
        <div class="g-relative">
          <div class="w-sum">总财富： {{datas.value}} 元</div>
        </div>
        <scroller height="260px" lock-x ref="scroller">
          <group>
            <cell v-for="(item, index) in datas.list" is-link>
              <img slot="icon" :src="item.icon" class="w-cell-icon" />
              <div slot="after-title" @click="flip(index)">{{item.name}}</div>
              <div class="w-val" @click="go(index)">
                <span>{{item.value}}</span>
                <badge class="g-bgc-b" :text="item.account"></badge>
              </div>
            </cell>
          </group>
        </scroller>
      </div>
    </flip>
  </div>
</template>
<script>
  import {
    XHeader, Group, Cell, Badge, Scroller, Selector
  }
  from 'vux'
  import {
    XMenu, Flip, OutItems
  }
  from '../components'

  import Pie from '../components/echart/Pie.vue'

  import store from '../vuex/store'
  const commit = store.commit || store.dispatch

  import ext from '../libs/extend.min'

  import wealthTB from '../tables/wealthTB'
  import expenseTB from '../tables/expenseTB'

  export default {
    name: 'wealth',
    data() {
      return {
        datas: wealthTB.temp,
        form: {
          icon: '',
          name: '',
          value: '0.00',
          account: '0.00%',
          mess: '',
          list: []
        },
        defaultIcon: '/static/img/question.png',
        outItems: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })

      let vm = this;

      // 获取支出列表
      expenseTB.getOutItems((res) => {
        vm.outItems = vm.outItems.concat(res.outItems)
      })
    },
    methods: {
      openMenu() {
          commit('UPDATE_MENUCLASS', 'menu_animation')
        },
        go(index) {
          this.$router.push({
            name: 'fund',
            params: {
              index: index
            }
          })
        },
        flip(index) {
          if (index !== null) {
            ext.extend(this.form, this.datas.list[index])
            this.form.pos = index
          } else {
            this.reset()
          }
          this.$refs.flip.flip()
        },
        select(res) {
          this.form.icon = res.src
        },
        save() {
          // check

          wealthTB.save(this.form, () => {
            this.flip()
            this.reset()
          })
        },
        reset() {
          this.form = {
            icon: '',
            name: '',
            value: '0.00',
            account: '0.00%',
            mess: '',
            list: []
          }
        }
    },
    components: {
      XHeader,
      XMenu,
      Pie,
      Group,
      Cell,
      Badge,
      Scroller,
      Flip,
      OutItems,
      Selector
    }
  }
</script>