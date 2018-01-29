<template>
  <swiper v-model="tabIndex" :show-dots="false" :height="height" :threshold="200">
    <swiper-item>
      <detail @swipe="swipe" />
    </swiper-item>
    <swiper-item>
      <analyze @swipe="swipe" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from 'vux'
import Detail from './Detail'
import Analyze from './Analyze'
export default {
  name: 'Home',
  data () {
    return {
      tabIndex: 0
    }
  },
  computed: {
    height () {
      return `${this.$store.state.device.height}px`
    }
  },
  methods: {
    swipe (index) {
      this.tabIndex = index
    }
  },
  components: {
    Swiper, SwiperItem, Detail, Analyze
  }
}
</script>
