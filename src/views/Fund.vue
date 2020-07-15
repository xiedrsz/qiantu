<template>
  <div>
    <!-- 基金 -->
    <div class="header">
      <van-nav-bar title="基金" left-text="财富" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
      <div class="main">
        <p class="opacity-68">
          <span>总金额(元)</span>
          <van-icon class="eye" name="eye-o" />
        </p>
        <p class="money">14,631.13</p>
        <van-row class="mg-t-20">
          <van-col :span="8">
            <p class="opacity-68">昨日收益(元)</p>
            <p class="anly">+2.34</p>
          </van-col>
          <van-col :span="8">
            <p class="opacity-68">持有收益(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
          <van-col :span="8">
            <p class="opacity-68">年化收益率(%)</p>
            <p class="anly">6.84</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-grid class="btns" :column-num="4" :icon-size="22" :border="false">
      <van-grid-item icon="/icon/file_full.svg" text="收益明细" />
      <van-grid-item icon="/icon/coins.svg" text="交易记录" />
      <van-grid-item icon="/icon/time.svg" text="我的定投" />
      <van-grid-item icon="/icon/notebook.svg" text="专项计划" />
    </van-grid>
    <div class="detail">
      <van-cell class="item">
        <div slot="title" class="normal">
          <span>鹏华产业债债券</span>
        </div>
        <template slot="label">
          <van-grid :column-num="3" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>金额</p>
                <p class="value">2,000.00</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-c lh-15">
                <p>昨日收益</p>
                <p class="value green">-3.19</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>持有收益</p>
                <p class="value red">+159.08</p>
              </div>
            </van-grid-item>
          </van-grid>
          <div class="notice">
            <van-icon class="top-2" name="volume-o" size="13px" color="#6093fd"/>
            <span class="title">重大提醒</span>
            <span>您的基金将在04月14日进行分红</span>
          </div>
        </template>
      </van-cell>
      <van-cell class="item warning">
        <div slot="title" class="normal">
          <span>鹏华产业债债券</span>
        </div>
        <template slot="label">
          <van-grid :column-num="3" :border="false" :center="false">
            <van-grid-item class="grid-no-padding">
              <div class="lh-15">
                <p>金额</p>
                <p class="value">2,000.00</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-c lh-15">
                <p>昨日收益</p>
                <p class="value green">-3.19</p>
              </div>
            </van-grid-item>
            <van-grid-item class="grid-no-padding">
              <div class="txt-r lh-15">
                <p>持有收益</p>
                <p class="value red">+159.08</p>
              </div>
            </van-grid-item>
          </van-grid>
          <div class="notice">
            <van-icon class="top-2" name="volume-o" size="13px" color="#6093fd"/>
            <span class="title">重大提醒</span>
            <span>您的基金将在04月14日进行分红</span>
          </div>
        </template>
      </van-cell>
    </div>
    <van-divider class="divider">没有了哦</van-divider>
  </div>
</template>

<script>
import { NavBar, Cell, Icon, Grid, GridItem, Col, Row, Divider } from 'vant'

export default {
  name: 'Regular',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/variable.less';
@blue: #266eff;
@lightBlue: #6093fd;
@blueBg: #f4fafe;
@pinkBg: #fef3ea;
@lightPinkBg: #fff9f4;

.header {
  position: relative;
  padding-top: .09rem;
  background: linear-gradient(180deg, @blue 30%, @lightBlue 80%, transparent);
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
}
.main {
  position: relative;
  text-align: center;
  font-size: @small;
  padding: .028rem 0 .15rem 0;
  color: @white;
  .eye {
    margin-left: .01rem;
    font-size: @normal;
    position: relative;
    top: 3px;
  }
  .money {
    font-size: 32px;
    font-weight: bold;
    line-height: 2;
  }
  .anly {
    font-size: @big;
    font-weight: 500;
    line-height: 2;
  }
}
.btns {
  margin: 0 .03rem;
  background: @white;
  border-radius: .008rem;
  position: relative;
  top: -.14rem;
}
.detail {
  position: relative;
  top: -0.11rem;
  padding: 0 .03rem;
  .item {
    border-radius: .008rem;
    padding: .03rem;
    margin-bottom: .03rem;
    .value {
      font-size: @small;
      font-weight: 500;
      color: @black;
    }
    .green {
      color: @green;
    }
    .red {
      color: @red;
    }
    .notice {
      line-height: 30px;
      margin-top: .01rem;
      padding: 0 .02rem;
      border-radius: .008rem;
      background: @blueBg;
      .title {
        font-size: 13px;
        color: @black;
        font-weight: 500;
        padding: 0 .01rem;
      }
    }
  }
  .warning {
    background: @lightPinkBg;
    .notice {
      background: @pinkBg;
    }
  }
}
.divider {
  position: relative;
  top: -0.11rem;
  font-size: @smaller;
  padding: 0 .03rem;
}
</style>
