<template>
  <div class="ui-menu" :class="{'vux-pop-out-enter-active': mode === 'out', 'vux-pop-in-enter-active': mode === 'in'}">
    <div class="ui-menu-containt">
      <div class="ui-menu-head">
        <img src="../assets/img/head.jpg" />
        <h2>The Freedom Trail</h2>
        <h6>珠江琶醍</h6>
      </div>
      <ul class="ui-menu-list">
        <li>
          <a href="#/backups/0">
            <img src="../assets/img/backups.svg" />
            <span>备份与导入</span>
          </a>
        </li>
        <li>
          <img src="../assets/img/setting.svg" />
          <span>设置</span>
        </li>
      </ul>
      <div class="ui-menu-logout">
        <span>登出</span>
        <img src="../assets/img/logout.svg" />
      </div>
    </div>
    <div class="ui-menu-mask" @click="toggleMenu"></div>
  </div>
</template>
<script>
export default {
  name: 'XMenu',
  computed: {
    mode () {
      return this.$store.state.device.mode
    }
  },
  methods: {
    // 收展菜单
    toggleMenu () {
      this.$store.commit('dv_toggle_mode')
    }
  }
}
</script>
