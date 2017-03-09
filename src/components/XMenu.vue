<template>
  <div class="menu" :class="menuClass">
    <div class="leftM">
      <div class="float">
        <img class="img" src="static/img/touxiang.jpg" />
        <div>Beautiful Girl</div>
        <div class="icM">
          <img class="pic" src="static/img/camera.png" />
        </div>
      </div>
      <div class="top">
        <img src="static/img/camera.png" />
      </div>
      <div class="bottom">
        <div class="menu-item">
          <img src="static/img/note.png" />
          <span>记一笔</span>
        </div>
        <div class="menu-item">
          <img src="static/img/statistics.png" />
          <span>统计分析</span>
        </div>
        <div class="menu-item">
          <img src="static/img/logout.png" />
          <span>登出</span>
        </div>
        <div class="menu-item" @click="refresh">
          <img src="static/img/refresh.png" />
          <span>刷新</span>
        </div>
        <div class="menu-item">
          <img src="static/img/setting.png" />
          <span>设置</span>
        </div>

        <div class="logout menu-item">
          <img src="static/img/logout.png" />
          <span>登出</span>
        </div>
      </div>
    </div>
    <div class="rightM" @click="closeMenu"></div>
  </div>
</template>

<script>
  import store from '../vuex/store'
  const commit = store.commit || store.dispatch

  export default {
    name: 'x-menu',
    store: store,
    computed: {
      menuClass() {
        return this.$store.state.menuClass
      }
    },
    methods: {
      closeMenu () {
        commit('UPDATE_MENUCLASS', 'menu_animation1')
      },
      refresh () {
        window.location.reload()
      }
    }
  }
</script>