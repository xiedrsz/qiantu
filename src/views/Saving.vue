<template>
  <div>
    <!-- 储蓄 -->
    <div class="header">
      <van-nav-bar title="储蓄" left-text="返回" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
    </div>
    <div class="detail">
      <van-cell>
        <span slot="title" class="normal">活期</span>
        <span>12,998.08</span>
      </van-cell>
      <div class="item">
        <div class="main">
          <img src="/img/pa.png" />
          <van-grid :column-num="2" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>平安银行</p>
                <p class="value">6222 0220 0998 7129</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>2,000.00</p>
                <p class="value">编辑银行卡</p>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="footer"></div>
      </div>
      <div class="item">
        <div class="main">
          <img src="/img/pa.png" />
          <van-grid :column-num="2" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>平安银行</p>
                <p class="value">6222 0220 0998 7129</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>2,000.00</p>
                <p class="value">编辑银行卡</p>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <div class="detail">
      <van-cell>
        <span slot="title" class="normal">定期</span>
        <span>12,998.08</span>
      </van-cell>
      <div class="item">
        <div class="main">
          <img src="/img/pa.png" />
          <van-grid :column-num="2" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>平安银行</p>
                <p class="value">6222 0220 0998 7129</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>2,000.00</p>
                <p class="value">编辑银行卡</p>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="footer"></div>
      </div>
      <div class="item">
        <div class="main">
          <img src="/img/pa.png" />
          <van-grid :column-num="2" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>平安银行</p>
                <p class="value">6222 0220 0998 7129</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>2,000.00</p>
                <p class="value">编辑银行卡</p>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, Icon, Grid, GridItem, Col, Row } from 'vant'

export default {
  name: 'Regular',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Col.name]: Col,
    [Row.name]: Row
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/variable.less';
@blue: #1677ff;
@lightBlue: #5fd0fa;

.header {
  position: relative;
  padding-top: .09rem;
  background: @blue;
  height: 200px;
  .van-nav-bar {
    background: @blue;
    &__title {
      color: @white;
      font-size: @big;
    }
    &__text {
      color: @white;
      font-size: @normal;
    }
    .van-icon {
      color: @white;
    }
  }
  &::after {
    background: @blue;
    content: ' ';
    position: absolute;
    bottom: -.042rem;
    border-radius: 50%;
    width: 100%;
    height: .096rem;
  }
}
.detail {
  padding: 0 .03rem;
  position: relative;
  top: -.36rem;
  margin: 0 .03rem .03rem;
  background: #ffffff;
  padding: .012rem 0;
  border-radius: .016rem;
  .item {
    margin: .03rem;
    padding: .03rem;
    border-radius: 0.016rem;
    background: #ffa640;
    color: #ffffff;
    font-weight: 500;
    .main {
      position: relative;
      padding-left: .116rem;
      img {
        border-radius: 50%;
        width: .062rem;
        height: .062rem;
        padding: .012rem;
        background: #FFFFFF;
        position: absolute;
        left: 0;
      }
    }
    .footer {
      height: .096rem;
    }
    .value {
      font-size: @smaller;
      font-weight: 200;
    }
  }
}
</style>
