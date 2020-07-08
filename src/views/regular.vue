<template>
  <div>
    <!-- 定期 -->
    <div class="header">
      <van-nav-bar title="定期" left-text="返回" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
      <div class="main">
        <p class="opacity-68">
          <span>总金额(元)</span>
          <van-icon class="eye" name="eye-o" />
        </p>
        <p class="money">3,428.13</p>
        <van-row class="mg-t-20">
          <van-col :span="12">
            <p class="opacity-68">昨日收益(元)</p>
            <p class="anly">+2.34</p>
          </van-col>
          <van-col :span="12">
            <p class="opacity-68">累计收益(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-grid class="btns" :column-num="3" :icon-size="20" :border="false">
      <van-grid-item icon="/icon/file.svg" text="收益明细" />
      <van-grid-item icon="/icon/coin.svg" text="交易明细" />
      <van-grid-item icon="/icon/plan.svg" text="新增计划" />
    </van-grid>
    <div class="detail">
      <van-cell class="item">
        <div slot="title" class="normal">
          <span>营利存7号67期</span>
        </div>
        <van-grid slot="label" :column-num="3" :border="false" :center="false">
          <van-grid-item class="grid-no-padding">
            <div class="lh-15">
              <p>金额</p>
              <p class="value">2,000.00</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-c lh-15">
              <p>累计收益</p>
              <p class="value">到账后查看</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-r lh-15">
              <p>距离到期</p>
              <p class="value">307天</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell class="item">
        <div slot="title" class="normal">
          <span>营利存7号67期</span>
        </div>
        <van-grid slot="label" :column-num="3" :border="false" :center="false">
          <van-grid-item class="grid-no-padding">
            <div class="lh-15">
              <p>金额</p>
              <p class="value">2,000.00</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-c lh-15">
              <p>累计收益</p>
              <p class="value">到账后查看</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-r lh-15">
              <p>距离到期</p>
              <p class="value">307天</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell class="item">
        <div slot="title" class="normal">
          <span>营利存7号67期</span>
        </div>
        <van-grid slot="label" :column-num="3" :border="false" :center="false">
          <van-grid-item class="grid-no-padding">
            <div class="lh-15">
              <p>金额</p>
              <p class="value">2,000.00</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-c lh-15">
              <p>累计收益</p>
              <p class="value">到账后查看</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-r lh-15">
              <p>距离到期</p>
              <p class="value">307天</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell class="item">
        <div slot="title" class="normal">
          <span>营利存7号67期</span>
        </div>
        <van-grid slot="label" :column-num="3" :border="false" :center="false">
          <van-grid-item class="grid-no-padding">
            <div class="lh-15">
              <p>金额</p>
              <p class="value">2,000.00</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-c lh-15">
              <p>累计收益</p>
              <p class="value">到账后查看</p>
            </div>
          </van-grid-item>
          <van-grid-item class="grid-no-padding">
            <div class="txt-r lh-15">
              <p>距离到期</p>
              <p class="value">307天</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell>
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
@blue: #0c9eff;
@lightBlue: #5fd0fa;

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
  }
}
</style>
