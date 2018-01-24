<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 以下是公共组件 -->
    <loading v-model="showLoading" text="载入中"></loading>
    <toast v-model="toastOPT.show" type="text" :width="toastOPT.width" :class="{ 'toast-text':toastOPT.type =='text' }">
      <div slot>
        <img v-show="toastOPT.type!='text'" class="g-toast-img" :src="'../static/img/' +toastOPT.type+ '.png'"/>
        <p :class="{ 'g-toast-p':toastOPT.type!='text' }">{{toastOPT.msg}}</p>
      </div>
    </toast>
    <!-- 样式待优化 -->
    <x-dialog v-model="prompt.show" class="g-dialog">
      <h3 class="popue-title">中国太平保險(香港)</h3>
      <div class="popue-content">
        {{prompt.msg}}
      </div>
      <div class="popue-footer">
        <button class="defaul_btn" @click="closePromp">確定</button>
        <button v-show="prompt.cancel" class="defaul_btn" @click="prompt.show=false">取消</button>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Loading, XDialog, Toast } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  methods: {
    closePromp () {
      this.closePromt()
      let callback = this.prompt.callback
      !!callback && callback()
    },
    ...mapMutations({
      closePromt: 'CLOSE_PROMPT'
    })
  },
  computed: {
    ...mapGetters([
      'prompt',
      'showLoading',
      'toastOPT'
    ])
  },
  components: {
    Loading, XDialog, Toast
  }
}

</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
