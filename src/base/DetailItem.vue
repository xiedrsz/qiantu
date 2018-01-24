<template>
  <div class="page">
    <group>
      <cell title="保障簡介" is-link @click.native="show(0)"></cell>
      <cell title="主要不保事項" is-link @click.native="show(1)"></cell>
      <cell title="賠償細則" is-link @click.native="show(2)"></cell>
    </group>
    <div>
      <x-dialog v-model="itemDetail" class="dialog-detail">
        <div class="dialog-head">
          <span class="title">條款及細則</span>
          <span class="vux-close" @click="itemDetail = false"></span>
        </div>
        <detail-dailog v-model="index" ref="dd"></detail-dailog>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Cell, XDialog, Group } from 'vux'
import DetailDailog from './DetailDailog'
export default {
  data () {
    return {
      index: 0,
      itemDetail: false
    }
  },
  methods: {
    show (index) {
      this.itemDetail = true
      this.index = index
      this.$refs.dd.reset()
    }
  },
  components: { Cell, XDialog, Group, DetailDailog }
}
</script>
