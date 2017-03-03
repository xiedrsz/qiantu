<template>
  <div>
    <group class="search-group">
      <!-- <search v-model="searchOPT.applyNo" placeholder="订单号" :autoFixed="false" ></search> -->
      <search v-model="searchOPT.applyNo" top="44px" placeholder="订单号"></search>      
    </group>
    <group>
      <calendar v-model="searchOPT.applicationDate" title="日期"></calendar>
      <!--      <selector title="车商" :options="dealerList" v-model="dealer"></selector>-->
      <selector  title="状态" :options="statusList" v-model="searchOPT.state" direction="rtl"></selector>    
    </group>
    <box gap="0.2rem 0.15rem">
      <x-button plain @click.native="search" class="main-btn">搜索</x-button>
    </box>
    <group title="统计">
      <div >
        <flexbox>
          <flexbox-item>
            <div class="wb-flex-item ci-border-r">
              <h3>未完成订单</h3>
              <p>{{count-countComplete}}</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="wb-flex-item ci-border-r">
              <h3>已完成订单</h3>
              <p>{{countComplete}}</p>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="wb-flex-item">
              <h3>订单总数</h3>
              <p>{{count}}</p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </group>
  </div>
</template>

<script>
  import {
    XButton, Group, Card, Flexbox, FlexboxItem, Calendar, Selector, Search, Box
  }
  from 'vux'

  import ordersTB from "../tables/ordersTB"
  import statusList from "../libs/business/orderState.conf"

  export default {
    data() {
        return {
          searchOPT: {
            applyNo: '',
            applicationDate: '',
            state: '',
          },
          statusList: statusList,
          count: 0,
          countComplete: 0,

          show: false,
          results: [],
          value: ''
        }
      },
      created() {
        ordersTB.getCount((data) => {
          this.count = data.count
          this.countComplete = data.countComplete
        })
      },
      methods: {
        search() {
          ordersTB.setSearchOPT(this.searchOPT)
          this.$router.push({
            path: '/orders'
          })
        },
        resultClick (item) {
          alert('you click the result item: ' + JSON.stringify(item))
        },
        getResult (val) {
          this.results = val ? getResult(this.value) : []
        }
      },
      components: {
        Group,
        XButton,
        Card,
        Flexbox,
        FlexboxItem,
        Calendar,
        Selector,
        Search,
        Box
      }

  }
        function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style>
  .wb-flex-item{
      text-align: center;
      padding: .12rem .15rem;
  }
  .wb-flex-item h3{
      color: #a6a6a6;
  }
  .wb-flex-item p{
      color:#333;
  } 
  .wb-flex-item h3 + p{
    margin-top: .03rem;
  }
  .weui_cell_select .weui_select{
    padding-right: .18rem !important;
  }
  .upi-image-item {
    text-align: center;
    margin-bottom: .15rem;
  }
  
  .upi-image-item img {
    width: 100%;
  }
</style>