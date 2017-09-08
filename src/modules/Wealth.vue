<template>
  <div>
    <x-menu></x-menu>
    <x-header :left-options='{showBack: false}'>
      <img slot='left' @click="openMenu" src='/static/img/menu.png' />财富分布
      <img slot='right' @click="flip(null)" src="/static/img/flip.png" />
    </x-header>

    <flip ref="flip">
      <div slot="front" style="height: 570px;">
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
        <out-items :out-items="outItems" :deviate="{x:10,y:0}" @on-select="select"></out-items>
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
        <pie :data="datas.list"></pie>
        <div class="g-relative">
          <div class="w-sum">总财富： {{datas.value.toFixed(2)}} 元</div>
        </div>
        <order-list :datas="datas.list" ref="orderlist">
          <template scope="props">
            <cell is-link>
              <img slot="icon" :src="props.item.icon" class="w-cell-icon" />
              <div slot="after-title" @click="flip(props.item)">{{props.item.name}}</div>
              <div class="w-val" @click="go(props.item)">
                <span>{{props.item.value.toFixed(2)}}</span>
                <badge :text="props.item.account"></badge>
              </div>
            </cell>
          </template>
        </order-list>
      </div>
    </flip>
  </div>
</template>
<script>
  import {
    XHeader, Group, Cell, Badge, Selector
  } from 'vux'
  
  import {
    XMenu, Flip, OutItems, OrderList
  } from '../components'

  import Pie from '../components/echart/Pie.vue'
  import store from '../vuex/store'
  import ext from '../libs/extend.min'
  import wealthTB from '../tables/wealthTB'
  
  const commit = store.commit || store.dispatch

  export default {
    name: 'wealth',
    data () {
      return {
        datas: wealthTB.temp,
        form: {
          icon: '',
          name: '',
          value: 0.00,
          account: '0.00%',
          mess: '',
          list: []
        },
        defaultIcon: '/static/img/question.png',
        outItems: wealthTB.getIcons()
      }
    },
    methods: {
      openMenu () {
        commit('UPDATE_MENUCLASS', 'menu_animation')
      },
      go (item) {
        let index = item.pos
        this.$router.push({
          name: 'fund',
          params: {
            index: index
          }
        })
      },
      flip (item) {
        this.reset()
        if (item !== null) {
          ext.extend(this.form, item)
        }
        this.$refs.flip.flip()
      },
      select (res) {
        this.form.icon = res.src
      },
      save () {
        // Todo, check
        wealthTB.save(this.form, () => {
          this.flip()
          // 保存到服务器
          wealthTB.push()
          this.$refs.orderlist.cal()
        })
      },
      reset () {
        this.form = {
          icon: '',
          name: '',
          value: 0.00,
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
      Flip,
      OutItems,
      Selector,
      OrderList
    }
  }
</script>