<template>
  <div>
    <!-- 股票 -->
    <div class="header">
      <van-nav-bar title="股票" left-text="返回" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
      <div class="main">
        <p class="opacity-68">
          <span>今日盈亏(元)</span>
          <van-icon class="eye" name="eye-o" />
        </p>
        <p class="money">-428.13</p>
        <p><span>持仓盈亏：</span><span>2,330.80</span></p>
        <van-row class="mg-t-20">
          <van-col :span="8">
            <p class="opacity-68">总资产(元)</p>
            <p class="anly">+2.34</p>
          </van-col>
          <van-col :span="8">
            <p class="opacity-68">持股市值(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
          <van-col :span="8">
            <p class="opacity-68">可用资金(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-grid class="btns" :column-num="4" :icon-size="22" :border="false">
      <van-grid-item icon="/icon/buy.svg" text="买入" />
      <van-grid-item icon="/icon/sell.svg" text="卖出" />
      <van-grid-item icon="/icon/transfer.svg" text="转账" />
      <van-grid-item icon="/icon/fee.svg" text="费用" />
    </van-grid>
    <div class="detail">
      <van-grid class="head" :column-num="4" :border="false" :center="false" >
        <van-grid-item class="grid-no-padding">
          <div class="lh-15">
            <p>名称/市值</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p>持股/可卖</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p>盈亏/盈亏比</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-r lh-15">
            <p>现价/成本</p>
          </div>
        </van-grid-item>
      </van-grid>
      <van-grid class="item bdb" :column-num="4" :border="false" :center="false">
        <van-grid-item class="grid-no-padding">
          <div class="lh-15">
            <p class="value">方大特钢</p>
            <p class="desc">2,000.00</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p class="value">1,000</p>
            <p class="desc">1,000</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p class="value red">-2,004.00</p>
            <p class="desc red">-50.10%</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-r lh-15">
            <p class="value">4.98</p>
            <p class="desc">2.98</p>
          </div>
        </van-grid-item>
      </van-grid>
      <van-grid class="item bdb" :column-num="4" :border="false" :center="false">
        <van-grid-item class="grid-no-padding">
          <div class="lh-15">
            <p class="value">方大特钢</p>
            <p class="desc">2,000.00</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p class="value">1,000</p>
            <p class="desc">1,000</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-c lh-15">
            <p class="value green">-2,004.00</p>
            <p class="desc green">-50.10%</p>
          </div>
        </van-grid-item>
        <van-grid-item class="grid-no-padding">
          <div class="txt-r lh-15">
            <p class="value">4.98</p>
            <p class="desc">2.98</p>
          </div>
        </van-grid-item>
      </van-grid>
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
@tangerine: #f25635;
@lightTangerine: #f27256;

.header {
  position: relative;
  padding-top: .09rem;
  background: linear-gradient(180deg, @tangerine 30%, @lightTangerine 80%, transparent);
  .van-nav-bar {
    background: @tangerine;
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
  .head {
    font-size: 12px;
    padding: .01rem .03rem;
    color: @gray;
  }
  .item {
    padding: .03rem;
    background:@white;
    font-size: @smaller;
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
  }
}
.divider {
  position: relative;
  top: -0.11rem;
  font-size: @smaller;
  padding: 0 .03rem;
}
</style>
