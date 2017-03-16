<template>
  <div>
    <x-header :left-options="{showBack: true}">
      {{datas.name}}
      <img slot='right' @click="flip" src="/static/img/flip.png" />
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
          <div class="w-form">
            <div class="i-icon">
              <img src="/static/img/classify.png" />
            </div>
            <div>
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
    Flip, OutItems
  }
  from '../components'

  import DisPie from '../components/echart/DisPie.vue'

  import ext from '../libs/extend.min'
  import wealthTB from '../tables/wealthTB'
  import expenseTB from '../tables/expenseTB'

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
        outItems: [],
        index: ''
      }
    },
    mounted() {
      let vm = this;

      // 获取支出列表
      expenseTB.getOutItems(function (res) {
        vm.outItems = vm.outItems.concat(res.outItems)
      })
    },
    methods: {
      flip(index) {
          if (index !== null) {
            ext.extend(this.form, this.datas.list[index])
            this.form.pos = this.index + "-" + index
          } else {
            this.reset()
          }
          this.$refs.flip.flip()
        },
        select(res) {
          this.form.icon = res.src
        },
        save() {
          // Todo
          wealthTB.save(this.form, () => {
            this.flip()
            this.reset()
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
            mess: ''
          }
        },
        go(index) {
          this.$router.push({
            name: 'fund',
            params: {
              index: index
            }
          })
        }
    },
    created() {
      let index = this.$route.params.index
      this.index = index
      this.datas = wealthTB.temp.list[index]
      console.log(this.datas)

      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    components: {
      XHeader,
      DisPie,
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