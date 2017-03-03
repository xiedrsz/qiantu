<template>
  <div class="page-uploadImage">
    <group>
      <cell :title="item.cname" :inline-desc="item.ename" :class="item.finished?'hasUp':''" v-for="item in lists" @click.native="openImage(item)">
        <span class="demo-icon myicon" :class="item.class+(item.finished?'-active':'')" slot="icon"></span>
      </cell>
    </group>

    <!--    @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide"-->
    <confirm v-model="show" :title="'上传'+curImage.cname" confirm-text="上传" @on-confirm="onConfirm">
      <p class="g-orange g-cen" v-show="curImage.maxLen>1">最多允许上传{{curImage.maxLen}}张</p>
      <scroller lock-x ref="scroller" :height="curLen<2?'200px':'400px'">
        <div>
          <div class="upi-image-item" v-for="(item,index) in curImage.imageList">
            <img :src="item.img||(item.isUpload?'/static/img/hasUpload.png':'/static/img/errImage.png')" @click="selectImage(index)" />
            <p>{{item.prompt}}
              <span v-show="curImage.maxLen>1">[{{item.positionNo}}]</span>
              <span class="g-orange" v-show="item.isUpload">已上传</span>
            </p>
          </div>
        </div>
      </scroller>
    </confirm>

    <input id="myfile" type="file" @change="convert" style="display:none;" multiple />
  </div>
</template>

<script>
  import {
    Cell, Group, Box, Icon, Confirm, Scroller
  }
  from 'vux'

  import imageTB from "../tables/imageTB"

  export default {
    data() {
        return {
          lists: imageTB.param.lists,
          curImage: {},
          show: false,
          curIndex: 0,
          curLen: 1
        }
      },
      created() {
        let supplyMaterialCode = this.$route.params.supplyMaterialCode
        imageTB.initList(supplyMaterialCode)
        imageTB.getImageInfo()
      },
      methods: {
        openImage(item) {
            this.curImage = item
            this.curLen = item.imageList.length
            this.show = true
            this.$nextTick(() => {
              this.$refs.scroller.reset({
                top: 0
              })
            })
          },
          selectImage(index) {
            document.getElementById("myfile").click()
            this.curIndex = index
          },
          onConfirm() {
            // forEach
            imageTB.upImage(this.curImage)
          },
          convert(event) {
            let reader = new FileReader(),
              index = this.curIndex
            reader.onload = (loadEvent) => {
              let total = loadEvent.total / 1024 / 1024;
              if (total < 4) {
                this.curImage.imageList[index].img = loadEvent.target.result
                imageTB.addImage(this.curImage) && (this.curLen++)
                let cheight = this.$refs.scroller.containerHeight
                this.$nextTick(() => {
                  this.$refs.scroller.reset()
                })
              } else {
                this.$store.commit("UPDATE_TOAST", {
                  type: "text",
                  width: "20em",
                  msg: "图片的大小必须小于4M"
                })
              }
            }
            reader.readAsDataURL(event.target.files[0])
          }
      },
      components: {
        Group, Cell, Box, Icon, Confirm, Scroller
      }
  }
</script>

<style>
  .myicon {
    display: block;
    content: "";
    width: .45rem;
    height: .45rem;
    background-size: cover;
    margin-right: .15rem;
  }
  
  .idCard {
    background-image: url(../../static/img/idCard.png);
  }
  
  .idJob {
    background-image: url(../../static/img/idJob.png);
  }
  
  .idIncome {
    background-image: url(../../static/img/idIncome.png);
  }
  
  .idPayroll {
    background-image: url(../../static/img/idPayroll.png);
  }
  
  .idMarriage {
    background-image: url(../../static/img/idMarriage.png);
  }
  
  .idCard-active {
    background-image: url(../../static/img/idCard-active.png);
  }
  
  .idJob-active {
    background-image: url(../../static/img/idJob-active.png);
  }
  
  .idIncome-active {
    background-image: url(../../static/img/idIncome-active.png);
  }
  
  .idPayroll-active {
    background-image: url(../../static/img/idPayroll-active.png);
  }
  
  .idMarriage-active {
    background-image: url(../../static/img/idMarriage-active.png);
  }
  
  .page-uploadImage .weui_cell_ft:after {
    display: block;
    content: "";
    width: 20px;
    height: 20px;
    background-size: cover;
    background-image: url(../../static/img/add.png);
  }
  
  .page-uploadImage .hasUp .weui_cell_ft:after {
    background-image: url(../../static/img/hasUp.png);
  }
</style>