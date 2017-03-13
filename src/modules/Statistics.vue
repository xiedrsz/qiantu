<template>
  <div>
    <x-menu></x-menu>
    <x-header :left-options='{showBack: false}'>
      <img slot='left' @click="openMenu" src='/static/img/menu.png' />{{title}}
    </x-header>

    <!--    <pie></pie>-->
    <!--    <dis-pie></dis-pie>-->
    <histogram></histogram>

    <group>
      <cell title="My Account" is-link>
        <img slot="icon" src="/static/img/clothes.png" style="width: .3rem;margin-right: .15rem;" />
        <input slot="value" style="width: 30%;" />
<!--        <x-input style="width: 30%;" slot="value" :min=6 :max=10 is-type=email :value.sync="value"></x-input>-->
      </cell>
    </group>

  </div>
</template>
<script>
  import {
    XHeader, Group, Cell, XInput
  }
  from 'vux'
  import {
    XMenu
  }
  from '../components'

  import Pie from '../components/echart/Pie.vue'
  import DisPie from '../components/echart/DisPie.vue'
  import Histogram from '../components/echart/Histogram.vue'

  import store from '../vuex/store'
  const commit = store.commit || store.dispatch

  import echarts from 'echarts'

  export default {
    name: 'statistics',
    data() {
      return {
        title: "收益明细"
      }
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
      DisPie,
      Histogram,
      Group, 
      Cell,
      XInput
    }
  }
</script>