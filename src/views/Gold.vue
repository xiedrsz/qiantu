<template>
  <div>
    <div class="header">
      <van-nav-bar title="黄金" left-text="返回" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
      <div class="main">
        <p class="dark">
          <span>当前持有(克)</span>
          <van-icon class="eye" name="eye-o" />
        </p>
        <p class="money">5.0322</p>
        <p class="yield">
          <span>价值</span>
          <span class="red">2,014.10</span>
          <span>元</span>
        </p>
        <p class="gold">
          <img src="/img/gold.png" />
        </p>
        <van-row class="mg-t-20">
          <van-col :span="8">
            <p class="gray">昨日收益(元)</p>
            <p class="anly">-2.09</p>
          </van-col>
          <van-col :span="8">
            <p class="gray">持有收益(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
          <van-col :span="8">
            <p class="gray">累计收益(元)</p>
            <p class="anly">+452.84</p>
          </van-col>
        </van-row>
        <van-row class="mg-t-20">
          <van-col :span="12" class="txt-r">
            <van-button class="btn left">卖出</van-button>
          </van-col>
          <van-col :span="12" class="txt-l">
            <van-button class="btn right">买入</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, Icon, Grid, GridItem, Col, Row, Swipe, SwipeItem, Button, Divider } from 'vant'

export default {
  name: 'Change',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Col.name]: Col,
    [Row.name]: Row,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Divider.name]: Divider
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/variable.less';
@gold: #db970f;
@lightGold: #f0c56e;
@goldBg: #fdf6e7;

.header {
  position: relative;
  padding-top: .09rem;
  background: linear-gradient(180deg, @gold 30%, @lightGold 80%, transparent);
  .van-nav-bar {
    background: @gold;
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
  margin: .028rem;
  background: @white;
  position: relative;
  border-radius: .016rem;
  text-align: center;
  font-size: 14px;
  padding: .088rem 0 .03rem 0;
  box-shadow: 0 0.006rem 0.006rem #f5f3f2;
  .eye {
    margin-left: .01rem;
    font-size: 16px;
    position: relative;
    top: 3px;
  }
  .money {
    font-size: 32px;
    font-weight: bold;
    line-height: 2;
  }
  .yield {
    width: 9em;
    background: #f8f8f8;
    line-height: .06rem;
    border-radius: .064rem;
    margin: 0 auto;
    color: #666666;
    padding: 0 .03rem;
  }
  .gold {
    padding-top: .016rem;
    img {
      width: .15rem;
    }
  }
  .anly {
    font-size: @big;
    font-weight: 500;
    line-height: 2;
    color: @gold;
  }
  .red {
    font-size: @normal;
    padding: 0 .01rem;
    color: @gold;
    font-weight: 500;
  }
  .btn {
    width: 90%;
    font-size: @normal;
    &.left {
      background: @goldBg;
      border-color: @goldBg;
      color: @gold;
      margin-right: .006rem;
    }
    &.right {
      background: @gold;
      border-color: @gold;
      color: @goldBg;
      margin-left: .006rem;
    }
  }
}
</style>
