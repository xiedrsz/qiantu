<template>
  <div>
    <x-header :left-options="{showBack: true}">
      {{title}}
    </x-header>

    <dis-pie :data="data"></dis-pie>
    <div class="g-relative">
      <div class="w-sum">总财富： {{formData.sum}} 元</div>
    </div>

    <scroller height="260px" lock-x ref="scroller">
      <group>
        <cell v-for="item in data" :title="item.name" :value="item.value" is-link>
          <img slot="icon" :src="item.icon" class="w-cell-icon" />
          <badge class="g-bgc-b" :text="item.account"></badge>
        </cell>
      </group>
    </scroller>

  </div>
</template>
<script>
  import {
    XHeader, Group, Cell, Badge, Scroller
  }
  from 'vux'

  import DisPie from '../components/echart/DisPie.vue'

  import wealthTB from '../tables/wealthTB'

  export default {
    name: 'fund',
    data() {
      return {
        formData: wealthTB.temp,
        title: "我的股票",
        data: []
      }
    },
    created() {
      let index = this.$route.params.index;
      this.data = wealthTB.temp.list[index].detail

      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    components: {
      XHeader,
      DisPie,
      Group,
      Cell,
      Badge,
      Scroller
    }
  }
</script>