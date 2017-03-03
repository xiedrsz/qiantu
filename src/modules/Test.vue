<template>
  <div>
    <h1>Home</h1>
    <p>{{msg}}</p>
    <button @click='go'>tiao</button>
    <cell title="title" value="value"></cell>
  </div>
</template>
<script>
  import { Cell } from 'vux'

  export default {
      data() {
        return {
          msg: 'Hello, vue router!'
        }
      },
      methods: {
        go() {
          // 页面跳转
          this.$router.push({
            path: '/home'
          })
        }
      },
      components: {
        Cell
      }
  }
</script>