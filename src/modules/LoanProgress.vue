<template>
  <div class="timeline-demo">
    <group class="ci-border marg-b15">
      <cell title="累计还款金额" :value="loanAmount|suffix('元')">
      </cell>
    </group>
    <timeline v-show="!!flowStateList.length">
      <timeline-item v-for="item in flowStateList">
        <h4 class="recent">{{item.workFlowStsDes}}</h4>
        <p>{{item.dateFlowEnd}}</p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
  import {
    Timeline, TimelineItem, Cell, Group
  }
  from 'vux'

  import loanTB from "../tables/loanTB"

  export default {
    data() {
        return {
          loanAmount: '20000',
          flowStateList: []
        }
      },
      created() {
        let data = loanTB.init()
        this.loanAmount = data.loanAmount
        this.flowStateList = data.state.flowStateList
      },
      components: {
        Timeline, TimelineItem, Cell, Group
      }
  }
</script>

<style>
  .vux-timeline {
    padding: 0.05rem .15rem !important;
  }
  
  .vux-timeline-item-content {
    padding: 0 0 0.15rem 0.3rem!important;
  }
  
  .vux-timeline-item-color {
    background-color: #01aaef!important;
  }
  
  .vux-timeline-item-tail {
    background-color: #01aaef!important;
  }
  
  .recent {
    color: #01aaef;
  }
  
  p {
    color: #888;
    font-size: 0.16px;
  }
  
  h4 {
    color: #666;
    font-weight: normal;
  }
  
  .vux-timeline {
    background-color: #fff;
  }
</style>