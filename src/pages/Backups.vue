<template>
  <div class="page">
    <div class="ui-ui">
      <x-header :left-options="{showBack: false}">
        <i slot="left" class="iconfont icon-rise c-white" @click="goBack"></i>
        <p class="c-white title">
          <a class="flex-1 underline">备份</a>
        </p>
      </x-header>
    </div>
    <group>
      <x-textarea :rows="23" placeholder="请输入备份数据" v-model="note"></x-textarea>
    </group>
    <a class="ui-add" @click="save">
      <i class="iconfont icon-add c-white"></i>
      <div class="heng"></div>
    </a>
  </div>
</template>
<script>
import { XHeader, Group, XTextarea } from 'vux'
// import _ from 'lodash'
import mixin from '@/libs/vue/mixin'

export default {
  name: 'Backups',
  mixins: [mixin],
  data () {
    return {
      note: ''
    }
  },
  activated () {
    let treasure = this.$store.state.treasure.list
    let bill = this.$store.state.bill.list
    let data = {treasure, bill}
    this.note = JSON.stringify(data)
  },
  methods: {
    // 保存
    save () {
      let data = this.note
      let self = this
      this.$store.dispatch('dv_import_db', {
        data,
        cb () {
          self.note = ''
          self.$prompt('导入完成，请返回首页刷新页面')
        }
      })
    }
  },
  components: {
    XHeader, Group, XTextarea
  }
}
</script>
