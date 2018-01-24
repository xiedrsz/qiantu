<template>
  <div class="tp-service" @click="callTelephone">
    <h3>中國太平保險(香港)有限公司客服熱線</h3>
    <h3><i class="icon-headphones"></i>(852)3716 1616</h3>
  </div>
</template>
<script>
const AlipayJSBridge = window.AlipayJSBridge
export default {
  methods: {
    // 拨打电话
    callTelephone () {
      if (AlipayJSBridge) {
        AlipayJSBridge.call('openInBrowser', {
          url: 'tel:+85237161616'
        })
      }
    }
  }
}
</script>
