<!-- 待整理 -->
<template>
  <div class="box viewport-flip">
    <a class="list flip" :class="fClass">
      <slot name="front"></slot>
    </a>
    <a class="list flip" :class="bClass">
      <slot name="back"></slot>
    </a>
  </div>
</template>
<script>
  export default {
    name: 'flip',
    data() {
      return {
        fClass: "out",
        bClass: "in"
      }
    },
    methods: {
      flip() {
        let tmp = this.bClass;
        if (tmp == "in") {
          this.bClass = "out"
        } else {
          this.fClass = "out"
        }
        setTimeout(() => {
          if (tmp == "in") {
            this.fClass = "in"
          } else {
            this.bClass = "in"
          }
        }, 225)
      }
    }
  }
</script>

<style>
  .box {
    width: 100%;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  
  .list {
    position: absolute;
    width: 100%;
  }
  
  .viewport-flip {
    -webkit-perspective: 1000;
    perspective: 1000;
    position: absolute;
  }
  
  .flip {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateX(0);
    backface-visibility: hidden;
    transform: translateX(0);
  }
  
  .flip.out {
    -webkit-transform: rotateY(-90deg) scale(.9);
    -webkit-animation-name: flipouttoleft;
    -webkit-animation-duration: 175ms;
    transform: rotateY(-90deg) scale(.9);
    animation-name: flipouttoleft;
    animation-duration: 175ms;
  }
  
  .flip.in {
    -webkit-animation-name: flipintoright;
    -webkit-animation-duration: 225ms;
    animation-name: flipintoright;
    animation-duration: 225ms;
  }
  
  @-webkit-keyframes flipouttoleft {
    from {
      -webkit-transform: rotateY(0);
    }
    to {
      -webkit-transform: rotateY(-90deg) scale(.9);
    }
  }
  
  @keyframes flipouttoleft {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(-90deg) scale(.9);
    }
  }
  
  @-webkit-keyframes flipintoright {
    from {
      -webkit-transform: rotateY(90deg) scale(.9);
    }
    to {
      -webkit-transform: rotateY(0);
    }
  }
  
  @keyframes flipintoright {
    from {
      transform: rotateY(90deg) scale(.9);
    }
    to {
      transform: rotateY(0);
    }
  }
</style>