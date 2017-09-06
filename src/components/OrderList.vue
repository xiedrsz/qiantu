<template>
  <scroller height="230px" lock-x ref="scroller">
    <group>
      <div v-for="(item, index) in list">
        <slot :item="item" :index="index"></slot>
      </div>
    </group>
  </scroller>
</template>
<script>
  import {
    Group, Scroller
  } from 'vux'

  import ext from '../libs/extend.min'

  export default {
    name: 'orderlist',
    props: {
      datas: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.cal()
    },
    methods: {
      cal () {
        // 排序，防止污染源
        let tmp = []
        let timer
        ext.extend(true, tmp, this.datas)

        this.$nextTick(() => {
          tmp.sort((a, b) => {
            return b.value - a.value
          })
          this.list = tmp
          timer = setTimeout(() => {
            clearTimeout(timer)
            this.$refs.scroller.reset()
          }, 100)
        })
      }
    },
    watch: {
      datas () {
        this.cal()
      }
    },
    components: {
      Group,
      Scroller
    }
  }
</script>
