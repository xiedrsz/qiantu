<template>
  <div class="page">
    <tab :line-width=0 active-color='#00aaee' v-model="tabIndex">
      <tab-item class="vux-center" v-for="(item, index) in list" :key="index">
        {{item}}
      </tab-item>
    </tab>
    <swiper v-model="tabIndex" :height="xHeight" :show-dots="false">
      <swiper-item v-for="(item, index) in list1" :key="index">
        <scroller lock-x :height="xHeight" ref="scroller">
          <div class="fs-14">
            <p class="txt-left pd-5" v-for="text in item.description1">
              {{text}}
            </p>
            <table v-show="item.description2">
              <tr>
                <td rowspan="2" colspan="2">保障項目</td>
                <td colspan="2">被保險人最高保障利益(HK$)</td>
              </tr>
              <tr>
                <td>年齡18-70</td>
                <td>70歲以上</td>
              </tr>
              <tr>
                <td>(1)</td>
                <td>意外死亡</td>
                <td>1,000,000.00</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>(2)</td>
                <td>永久傷殘</td>
                <td>100,000.00</td>
                <td>50,000</td>
              </tr>
              <tr>
                <td>(3)</td>
                <td>嚴重燒傷(二級或三級程度燒傷)</td>
                <td>100,000.00</td>
                <td>50,000</td>
              </tr>
            </table>
            <p class="txt-left pd-5" v-for="text in item.description3">
              {{text}}
            </p>
            <div v-html="item.html"></div>
          </div>
        </scroller>
      </swiper-item>
    </swiper>
  </div>
  </div>
</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem, Scroller } from 'vux'
import { list, list1 } from './Introduction.json'
const appHeight = document.documentElement.clientHeight
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tabIndex: 0,
      defaultSelected: '保障簡介',
      list: list,
      list1: list1,
      xHeight: appHeight * 0.8 - 120 + 'px'
    }
  },
  created () {
    this.tabIndex = this.value
  },
  watch: {
    value (val) {
      this.tabIndex = val
    },
    tabIndex (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    reset () {
      let index = this.tabIndex
      this.$nextTick(() => {
        this.$refs.scroller[index].reset({
          top: 0
        })
      })
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller
  }
}
</script>
