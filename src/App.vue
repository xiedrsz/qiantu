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
      <h3 class="popue-title">提示</h3>
      <div class="popue-content">
        {{prompt.msg}}
      </div>
      <div class="popue-footer">
        <button class="defaul_btn" @click="closePromp">好的</button>
        <button v-show="prompt.cancel" class="defaul_btn" @click="prompt.show=false">取消</button>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Loading, XDialog, Toast } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
import { diff } from '@/libs/util'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'prompt',
      'showLoading',
      'toastOPT'
    ]),
    tList () {
      return this.$store.getters.get_tList
    },
    bList () {
      return this.$store.getters.get_bList
    }
  },
  watch: {
    tList: {
      handler (val, old) {
        let todoList = diff(val, old)
        console.log('tList')
        console.log(todoList)
        todoList = _.map(todoList, item => {
          return {
            ...item,
            flag: 'treasure'
          }
        })
        this.$store.dispatch('dv_syn_dev', {
          todoList
        })
      },
      deep: true
    },
    bList (val, old) {
      let todoList = diff(val, old)
      console.log('bList')
      console.log(todoList)
      todoList = _.map(todoList, item => {
        return {
          ...item,
          flag: 'bill'
        }
      })
      this.$store.dispatch('dv_syn_dev', {
        todoList
      })
    }
  },
  mounted () {
    this.$store.dispatch('dv_init_loc')
  },
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
  components: {
    Loading, XDialog, Toast
  }
}

</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
