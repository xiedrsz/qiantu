<template>
  <div>
    <x-header :left-options="{showBack: true}">
      {{datas.name}}
      <img slot='right' @click="flip(null)" src="/static/img/flip.png" />
    </x-header>
    <flip ref="flip">
      <div slot="front" style="height: 570px;">
        <div class="w-banner"> 最近一次总金额为： {{datas.value}} 元</div>
        <div class="ac-money">
          <div>
            <img id="uac-type" :src="datas.icon" />
          </div>
          <div>
            {{datas.name}}
          </div>
          <div>
            <input type="number" placeholder="0.00" v-model="money" />
          </div>
        </div>
        <div class='footer'>
          <div class="ac-input">
            <div>
              <img src="/static/img/spread.png" />
            </div>
            <div>
              <input type="number" placeholder="差额" v-model="spread" />
            </div>
          </div>
          <div class="ac-input">
            <div>
              <img src="/static/img/calander.png" />
            </div>
            <div>
              <input type="text" placeholder="日期" v-model="form.date" />
            </div>
          </div>
          <div class="ac-input">
            <div>
              <img src="/static/img/local.png" />
            </div>
            <div>
              <span>深圳市罗湖区嘉宾路爵士大厦21B17</span>
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
        <line-chart :data="datas.list"></line-chart>
        <scroller height="260px" lock-x ref="scroller">
          <group>
            <cell v-for="(item, index) in datas.list" :title="item.date" :inline-desc="item.mess" @click.native="flip(index)">
              <div slot="value">
                <span :class="{ 'g-color-g': +item.spread<0, 'g-color-r': +item.spread>=0}">{{item.spread|diff}}</span>
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
    XHeader, Group, Cell, Scroller
  }
  from 'vux'

  import {
    Flip
  }
  from '../components'

  import {
    dataApi, ext
  }
  from '../libs'

  import wealthTB from '../tables/wealthTB'

  import LineChart from '../components/echart/LineChart.vue'

  let lastSpread = 0

  export default {
    name: 'wealth-item',
    data() {
      return {
        datas: {},
        form: {
          money: "",
          spread: "",
          date: dataApi.format("YYYY年MM月DD日"),
          mess: ""
        },
        money: "",
        spread: ""
      }
    },
    mounted() {

    },
    created() {
      let index = "" + this.$route.params.index,
        arr = index.split("-").reverse(),
        len = arr.length,
        i = index
      this.datas = wealthTB.temp
      while (len) {
        index = +arr[--len]
        this.datas = this.datas.list[index]
      }
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      flip(index) {
          this.reset()
          if (index !== null) {
            this.form = this.datas.list[index]
            this.spread = +this.form.spread
            this.datas.value = +this.datas.value - this.spread;
            lastSpread = this.spread
          }
          this.$refs.flip.flip()
        },
        // 保存
        save() {
          let len = this.datas.list.length,
            index = this.form.index,
            pos = "" + this.$route.params.index

          this.datas.value = +this.money;
          (index == undefined) && (this.form.index = len, this.datas.list = this.datas.list.concat([this.form]));

          // 重算财富
          wealthTB.calc(pos, this.spread - lastSpread)
          lastSpread = 0;
          // 保存到服务器
          wealthTB.push()

          this.flip(null)

          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        },
        // 重置form
        reset() {
          this.form = {
            money: "",
            spread: "",
            date: dataApi.format("YYYY年MM月DD日"),
            mess: ""
          }
          this.money = ""
        }
    },
    watch: {
      money(val, old) {
          if (val !== "") {
            let current = +val,
              recent = +this.datas.value,
              spread = current - recent;
            (spread == 0) && (spread = "")
            this.form.spread = (+spread).toFixed(2)
            this.spread = spread
          } else {
            this.spread = ""
          }
        },
        spread(val, old) {
          if (val !== "") {
            let recent = +this.datas.value,
              money = recent + val
            this.form.money = money.toFixed(2)
            this.money = money
          }
        }
    },
    components: {
      XHeader,
      Flip,
      LineChart,
      Group,
      Cell,
      Scroller
    }
  }
</script>