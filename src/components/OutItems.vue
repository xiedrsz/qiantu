<template>
  <div class="ac-items">
    <div class="ac-item" v-for="item in outItems">
      <img :src="item.src" @click="selected($event, item.src, item.name)" />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'out-items',
    props: {
      outItems: {
        type: Array,
        default () {
          return []
        }
      },
      deviate: {
        type: Object,
        default () {
          return {
            x: 0,
            y: 0
          }
        }
      }
    },
    data () {
      return {
        target: ''
      }
    },
    methods: {
      // 选择类型动画
      selected (event, src, name) {
        !this.target && (this.target = document.getElementById('uac-type'))
        let x = this.target.x - event.target.x - this.deviate.x
        let y = this.target.y - event.target.y - this.deviate.y
        let node = event.target.cloneNode(true)
        let time1
        let timer2
        // 移动动画
        node.className = 'ac-move'
        event.target.parentElement.appendChild(node)
        time1 = setTimeout(() => {
          node.setAttribute('style', '-webkit-transform: translate(' + x + 'px, ' + y + 'px);')
          clearTimeout(time1)
        }, 100)

        // 赋值
        timer2 = setTimeout(() => {
          this.$emit('on-select', {
            src, name
          })
          node.remove()
          clearTimeout(timer2)
        }, 1000)
      }
    }
  }
</script>