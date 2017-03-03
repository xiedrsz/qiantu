<template>
  <div>
    <x-menu></x-menu>
    <x-header :left-options='{showBack: false}'>
      <img slot='left' @click="openMenu" src='/static/img/menu.png' /> 口袋管家
      <img slot='right' @click="syn" :class="synOption.class" :src="synOption.img" />
    </x-header>
    <div class='h-in-out'>
      <div>
        <h3>本月支出</h3>
        <p>1100</p>
      </div>
      <div>
        <h3>本月收入</h3>
        <p>8888</p>
      </div>
    </div>
    
    <div class='footer h-bt-6'>
      <div class='h-out'>
        <div>
          <p>今日支出</p>
        </div>
        <div>
          <span>{{formData.amount}}</span> 元
        </div>
      </div>

      <scroller lock-x style="max-height:400px">
        <e-lists :lists="formData.lists"></e-lists>
      </scroller>
    </div>
    <muti-btn @on-submit="submit"></muti-btn>
  </div>
</template>
<script>
  import { XHeader, Scroller } from 'vux'
  import { XMenu, MutiBtn, ELists } from '../components'
  
  import store from '../vuex/store'
  const commit = store.commit || store.dispatch
  
  import expenseTB from '../tables/expenseTB'
  import { analyzer } from '../libs'
    
  export default {
    name: 'home',
    data() {
      return {
        formData: expenseTB.temp,
        synOption: {
          class: '',
          img: "/static/img/syn.png"
        }
      }
    },
    created() {
      !expenseTB.temp.lists.length && expenseTB.pull();
    },
    methods: {
      openMenu () {
        commit('UPDATE_MENUCLASS', 'menu_animation')
      },
      syn () {
        console.log("gg");
      },
      submit (mess) {
        let result = analyzer.analyze(mess)
        
        this.$router.push({
          name: 'account',
          params: {
            bill: JSON.stringify(result)
          }
        })
      }
    },
    components: {
      XHeader,
      XMenu,
      Scroller,
      MutiBtn,
      ELists
    }
  }
</script>