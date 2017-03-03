<template>
  <div class='footer'>
    <div class='h-muti-btn' v-show="!typing">
      <div>
        <a href="#/account/:bill">
          <img src='/static/img/pencil.png' />
        </a>
      </div>
      <div @click="say">
        <img src='/static/img/mic.png' />
        <span>按住说话</span>
      </div>
      <div @click="chtyping">
        <img src='/static/img/type.png' />
      </div>
    </div>
    <div class='h-input-btn' v-show="typing">
      <div class="h-input">
        <input type="text" placeholder="eg: 昨天早餐4元" v-model="message" />
      </div>
      <div class="h-btn" @click="submit">
        {{btnMess}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'muti-btn',
    data() {
      return {
        typing: false,
        btnMess: "取消",
        message: ""
      }
    },
    methods: {
      // 说话
      say() {
          console.log("语音尚未集成")
        },
        // 切换输入模式
        chtyping() {
          this.typing = !this.typing
        },
        // 提交
        submit() {
          if (this.btnMess == "提交") {
            // Todo
            this.$emit('on-submit', this.message)
          }
          this.message = ""
          this.btnMess = "取消"
          this.chtyping()
        }
    },
    watch: {
      message() {
        if (!!this.message) {
          this.btnMess = "提交"
        } else {
          this.btnMess = "取消"
        }
      }
    }
  }
</script>