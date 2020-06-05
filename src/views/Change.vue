<template>
  <div>
    <!-- Todo 元素待整理, 停滞 -->
    <div class="header">
      <van-nav-bar title="零钱" left-text="返回" left-arrow :border="false" :fixed="true" :z-index="2"></van-nav-bar>
      <div class="main">
        <p class="dark">
          <span>总金额(元)</span>
          <van-icon class="eye" name="eye-o" />
        </p>
        <p class="money">3,428.13</p>
        <p class="yield">
          <span>昨日收益</span>
          <span class="red">0.10</span>
          <span>元</span>
        </p>
        <p class="gray lh-24">总金额包含冻结金额50.00元</p>
        <van-row class="mg-t-20">
          <van-col :span="12">
            <p class="gray">累计收益(元)</p>
            <p class="anly">452.84</p>
          </van-col>
          <van-col :span="12">
            <p class="gray">七日年化(%)</p>
            <p class="anly">2.34</p>
          </van-col>
        </van-row>
        <van-row class="mg-t-20">
          <van-col :span="12" class="txt-r">
            <van-button class="btn left">转出</van-button>
          </van-col>
          <van-col :span="12" class="txt-l">
            <van-button class="btn right">转入</van-button>
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

.header {
  position: relative;
  padding-top: .09rem;
  background: linear-gradient(180deg, #ff6600 60px, #f2f2f2);
  .van-nav-bar {
    background: #ff6600;
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
  .anly {
    font-size: 18px;
    font-weight: 500;
    line-height: 2;
  }
  .red {
    font-size: 16px;
    padding: 0 .01rem;
    color: #ff6600;
    font-weight: 500;
  }
  .btn {
    width: 90%;
    font-size: 16px;
    &.left {
      background: #fef6ee;
      border-color: #fef6ee;
      color: #ff6600;
      margin-right: .006rem;
    }
    &.right {
      background: #ff6600;
      border-color: #ff6600;
      color: #fef6ee;
      margin-left: .006rem;
    }
  }
}
// ======================
.lh-24 {
  line-height: 2.4;
}
.mg-t-20 {
  margin-top: .04rem;
}
.dark {
  color: #333333;
}
@orange: #ff6600;
</style>
