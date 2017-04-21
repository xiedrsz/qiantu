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
        outItems: wealthTB.getIcons()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.datas.list.sort((a, b) => {
          return b.value - a.value
        })
        this.$refs.scroller.reset()
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

            // 保存到服务器
            wealthTB.push()

            this.$nextTick(() => {
              this.datas.list.sort((a, b) => {
                return b.value - a.value
              })
              this.$refs.scroller.reset()
            })
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