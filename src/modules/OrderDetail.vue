<template>
  <div>
    <group>
      <cell v-show="!!detail.loanAmount" title="贷款金额" :value="detail.loanAmount|suffix('元')"></cell>

      <cell v-show="detail.loanTerm" title="贷款期限(月)" :value="detail.loanTerm"></cell>

      <cell v-show="!!detail.periodPay" title="期供" :value="detail.periodPay|suffix('元')"></cell>

      <cell v-show="detail.principalInterestAmount" title="累计还款金额" :value="detail.principalInterestAmount|suffix('元')"></cell>

      <cell v-show="detail.principalInterestAmount" title="应还利息" :value="detail.principalInterestAmount-detail.loanAmount|suffix('元')"></cell>

      <cell v-show="detail.totalinsuredAmount" title="保额" :value="detail.totalinsuredAmount|suffix('元')"></cell>

      <cell v-show="detail.expectRate" title="履约险费率" :value="detail.expectRate"></cell>

      <cell v-show="detail.totalActualPremium" title="履约险保费" :value="detail.totalActualPremium|suffix('元')"></cell>

      <cell v-show="detail.vehicleInsuredNo" title="车险投保单号" :value="detail.vehicleInsuredNo"></cell>

      <cell v-show="detail.vehicleInsuredYears" title="车险保单年限" :value="detail.vehicleInsuredYears"></cell>

      <cell v-show="detail.vehicleFrameNo" title="车架号" :value="detail.vehicleFrameNo"></cell>

      <cell v-show="detail.carBrands" title="贷款车型" :value="detail.carBrands"></cell>

      <cell v-show="detail.productName" title="购买产品" :value="detail.productName"></cell>

      <cell v-show="detail.repayTypeName" title="还款方式" :value="detail.repayTypeName"></cell>

      <cell v-show="detail.loanTime" title="放款时间" :value="detail.loanTime|time"></cell>

      <cell v-show="detail.applicationDate" title="申请时间" :value="detail.applicationDate|time"></cell>

      <cell v-show="detail.applyNo" title="订单号" :value="detail.applyNo"></cell>

      <cell v-show="detail.underPrescription" title="承保时效止期" :value="detail.underPrescription|time"></cell>

      <cell v-show="detail.getCarCode" title="提车码" :value="detail.getCarCode"></cell>
    </group>

    <group>
      <cell title="上传影像" :link="'/uploadimage/'+detail.supplyMaterialCode"></cell>
      <cell title="查看进度" isLink></cell>
    </group>
  </div>
</template>

<script>
  import {
    Cell, Group
  }
  from 'vux'

  import ordersTB from "../tables/ordersTB"
  import imageTB from "../tables/imageTB"

  export default {
    data() {
        return {
          detail: {}
        }
      },
      created() {
        let vm = this,
          applyNo = this.$route.params.applyNo
        ordersTB.getDetail(applyNo, (orderInfo) => {
          vm.detail = orderInfo
        })
      },
      components: {
        Group,
        Cell
      }
  }
</script>

<style>

</style>