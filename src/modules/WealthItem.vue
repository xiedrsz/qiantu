<template>
  <div>
    <x-header :left-options="{showBack: true}">
      {{name}}
      <img slot='right' @click="flip" src="/static/img/flip.png" />
    </x-header>
    <flip ref="flip">
      <div slot="front" style="height: 600px;">
        <div class="w-banner"> {{name}} 最近一次金额为： {{recent}} 元</div>
        <div class="ac-money">
          <div>
            <img id="uac-type" :src="icon" />
          </div>
          <div>
            {{name}}
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
              <input type="text" placeholder="日期" v-model="date" />
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
              <input type="text" placeholder="备注" v-model="mess" />
            </div>
          </div>
          <button class='ac-btn' @click="save">
            保存
          </button>
        </div>
      </div>
      <!-- 前 -->
      <div slot="back" style="width: 360px;">
        <line-chart></line-chart>
        <scroller height="260px" lock-x ref="scroller">
          <group>
            <cell title="2017年3月15日" inline-desc="分发红利">
              <div slot="value">
                <span style="color: green">+50.09</span>
              </div>
            </cell>
            <cell title="2017年3月15日" inline-desc="分发红利">
              <div slot="value">
                <span style="color: green">+50.09</span>
              </div>
            </cell>
            <cell title="2017年3月15日" inline-desc="分发红利">
              <div slot="value">
                <span style="color: green">+50.09</span>
              </div>
            </cell>
            <cell title="2017年3月15日" inline-desc="分发红利">
              <div slot="value">
                <span style="color: green">+50.09</span>
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

  import LineChart from '../components/echart/LineChart.vue'

  export default {
    name: 'wealth-item',
    data() {
      return {
        name: "招商招利",
        recent: 3300.87,
        icon: '/static/img/question.png',
        money: '',
        spread: '',
        date: '',
        mess: '',
        history: []
      }
    },
    mounted() {

    },
    methods: {
      flip() {
          this.$refs.flip.flip()
        },
        save() {
          // Todo
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