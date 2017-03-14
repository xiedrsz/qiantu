<template>
  <div>
    <x-header :left-options="{showBack: true}">
      我的股票
    </x-header>

    <flip>
      <img slot="front" src="http://image.zhangxinxu.com/image/blog/201210/puke-back.png" alt="纸牌背面" />
      <div slot="back" style="width: 360px;">
        <line-chart></line-chart>
      </div>
    </flip>

  </div>
</template>
<script>
  import {
    XHeader
  }
  from 'vux'

  import {
    Flip
  }
  from '../components'

  import LineChart from '../components/echart/LineChart.vue'

  export default {
    name: 'wealth-item',
    components: {
      XHeader,
      Flip,
      LineChart
    }
  }
</script>