<template>
  <div class="orderPage">
    <scroller lock-x use-pullup :pullup-config="pullup" @on-pullup-loading="refresh" ref="scroller" height="590px">
      <div>
        <group class="ci-border marg-b15" v-for="item in lists">
          <cell :title="item.productName" :value="item.applicationDate|time" class="listAid"></cell>
          <cell :title="'订单号：'+item.applyNo" :inline-desc="'贷款：'+item.loanAmount|suffix('元')" :link="'/orderdetail/'+item.applyNo">
            <div slot="value" class="cell-value">
              
              <span>{{item.customerName}}</span><p>{{item.state|orderStateEx}}</p>
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {
    Cell, Group, Scroller
  }
  from 'vux'

  import ordersTB from "../tables/ordersTB"

  export default {
    data() {
        return {
          lists: [],
          pullup: {
            content: '上拉加载更多',
            pullUpHeight: 60,
            height: 50,
            autoRefresh: false,
            downContent: '松开加载更多',
            upContent: '上拉加载更多',
            loadingContent: '载入中',
            clsPrefix: 'xs-plugin-pullup-'
          }
        }
      },
      created() {
        this.refresh()
      },
      methods: {
        refresh() {
          ordersTB.getList((lists) => {
            let len = lists.length;
            this.lists = this.lists.concat(lists)
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
            this.$refs.scroller.donePullup();
            (len < parseInt(ordersTB.param.searchOPT.length)) && (this.$refs.scroller.disablePullup())
          })
        }
      },
      components: {
        Group,
        Cell,
        Scroller
      }
  }
</script>

<style>
  .orderPage {
    padding: 0.07rem;
    background-color: #f0f4f7;
  }
  .orderPage .weui_cells:first-of-type{
    margin-top: 0;
  }
  .orderPage .weui_cells .weui_cell:first-of-type{
        padding: .1rem .15rem;
        background-color: #f5f5f5;
  }
  .orderPage .weui_cells .weui_cell:first-of-type .weui_cell_bd > p{
    color: #a6a6a6;
    font-size: .13rem;
    line-height: .18rem;
  }
  .orderPage .weui_cell:before{
    left:0;
  }
</style>