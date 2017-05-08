<template>
  <div>
    <x-header :left-options="{showBack: true}">
      {{datas.name}}
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
          <div class="w-form">
            <div class="i-icon">
              <img src="/static/img/classify.png" />
            </div>
            <div class="r-txt-left">
              <selector placeholder="请选择财富类型" :options="list" v-model="form.type" :readonly="form.value>0"></selector>
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
        <dis-pie :data="datas.list"></dis-pie>
        <div class="g-relative">
          <div class="w-sum">总财富： {{datas.value.toFixed(2)}} 元</div>
        </div>

        <order-list :datas="datas.list" ref="orderlist">
          <template scope="props">
            <cell is-link>
              <img slot="icon" :src="props.item.icon" class="w-cell-icon" />
              <div slot="after-title" @click="flip(props.item)">{{props.item.name}}</div>
              <div class="w-val" @click="go(props.item)">
                <span>{{props.item.value}}</span>
                <badge class="g-bgc-b" :text="props.item.account"></badge>
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
  }
  from 'vux'

  import {
    Flip, OutItems, OrderList
  }
  from '../components'

  import DisPie from '../components/echart/DisPie.vue'

  import ext from '../libs/extend.min'
  import wealthTB from '../tables/wealthTB'

  export default {
    name: 'fund',
    data() {
      return {
        datas: {
          name: '',
          value: '',
          list: []
        },
        form: {
          icon: '',
          name: '',
          value: 0.00,
          account: '0.00%',
          type: '',
          mess: ''
        },
        list: [{
          key: '0',
          value: '小分类'
        }, {
          key: '1',
          value: '财富'
        }],
        defaultIcon: '/static/img/question.png',
        outItems: wealthTB.getIcons(),
        index: ''
      }
    },
    mounted() {},
    methods: {
      flip(item) {
          this.reset()
          if (item !== null) {
            ext.extend(this.form, item)
          }
          this.$refs.flip.flip()
        },
        select(res) {
          this.form.icon = res.src
        },
        save() {
          // Todo, check
          wealthTB.save(this.form, () => {
            this.flip(null);
            // 保存到服务器
            wealthTB.push()
            this.$refs.orderlist.cal()
          })
        },
        reset() {
          let index = this.index + "-"
          this.form = {
            pos: index,
            icon: '',
            name: '',
            value: 0.00,
            account: '0.00%',
            type: '',
            mess: '',
            list: []
          }
        },
        go(item) {
          let pos = item.pos,
            type = item.type
          if (type == '0') {
            this.$router.push({
              name: 'fund',
              params: {
                index: pos
              }
            })
            this.refresh()
          } else {
            this.$router.push({
              name: 'wealthItem',
              params: {
                index: pos
              }
            })
          }
        },
        refresh() {
          let index = "" + this.$route.params.index,
            arr = index.split("-").reverse(),
            len = arr.length
          this.index = index
          this.datas = wealthTB.temp
          while (len) {
            index = +arr[--len]
            this.datas = this.datas.list[index]
          }
        }
    },
    created() {
      this.refresh()
    },
    watch: {
      '$route.params': 'refresh'
    },
    components: {
      XHeader,
      DisPie,
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