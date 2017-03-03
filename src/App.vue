<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    <!-- 以下是公共组件 -->
    <loading v-model="showLoading" text="载入中"></loading>
    <toast v-model="toastOPT.show" type="text" :width="toastOPT.width">
      <div slot>
        <img v-show="toastOPT.type!='text'" class="g-toast-img" :src="'/static/img/' +toastOPT.type+ '.png'" />
        <p :class="{ 'g-toast-p':toastOPT.type!='text' }">{{toastOPT.msg}}</p>
      </div>
    </toast>
  </div>
</template>

<script>
  import store from './vuex/store'

  import {
    Loading,
    Toast
  }
  from 'vux'

  export default {
    store: store,
    computed: {
      direction() {
        return this.$store.state.direction
      },
      showLoading() {
        return this.$store.state.showLoading
      },
      toastOPT() {
        return this.$store.state.toastOPT
      }
    },
    components: {
      Loading,
      Toast
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>