<template>
  <div>
    <x-menu></x-menu>
    <x-header :left-options='{showBack: false}'>
      <img slot='left' @click="openMenu" src='/static/img/menu.png' />财富分布
    </x-header>

    <pie></pie>
    <div class="g-relative">
      <div class="w-sum">总财富： {{formData.sum}} 元</div>
    </div>

    <scroller height="260px" lock-x ref="scroller">
      <group>
        <cell v-for="(item, index) in formData.list" :title="item.name" :value="item.value" link="/wealthItem" is-link>
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
  import {
    XMenu
  }
  from '../components'

  import Pie from '../components/echart/Pie.vue'

  import store from '../vuex/store'
  const commit = store.commit || store.dispatch

  import wealthTB from '../tables/wealthTB'

  export default {
    name: 'wealth',
    data() {
      return {
        formData: wealthTB.temp
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      openMenu() {
        commit('UPDATE_MENUCLASS', 'menu_animation')
      }
    },
    components: {
      XHeader,
      XMenu,
      Pie,
      Group,
      Cell,
      Badge,
      Scroller
    }
  }
</script>