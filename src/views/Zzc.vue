<template>
  <div>
    <div class="header">
      <van-nav-bar title="总资产" right-text="服务" :border="false" :fixed="true"></van-nav-bar>
      <div class="zhushou">
        <img class="icon" src="/img/ant_head.gif" />
        <div class="pdt-14">下午好</div>
        <div class="vice">
          <span class="opacity-72">智能理财助理陪伴你稳健财富增长</span>
          <span class="arrow">›</span>
        </div>
      </div>
    </div>
    <div class="main">
      <van-cell is-link class="bdb">
        <div slot="title" class="normal">
          <span>我的资产</span>
          <van-icon name="closed-eye" size="16" class="mgl-16" />
          <!-- <van-icon name="eye-o" size="16" class="mgl-16" /> -->
        </div>
        <div class="sys-orange">
          <van-icon name="bell" class="top-2" />
          <span class="mgl-08">重要提醒事项</span>
        </div>
      </van-cell>
      <div class="total">
        <div>
          <p class="label">总资产(元)</p>
          <p class="value black">27,123.80</p>
        </div>
        <div class="txt-r">
          <p class="label">昨日收益</p>
          <p class="value green">-9.70</p>
        </div>
      </div>
      <van-grid :column-num="2" class="items" :center="false">
        <van-grid-item>
          <p class="label">零钱</p>
          <div class="value">
            <span class="gray">0.00</span>
            <!-- <span class="red">+0.02</span> -->
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">储蓄</p>
          <div class="value">
            <span class="gray">0.00</span>
            <!-- <span class="red">+0.02</span> -->
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">定期</p>
          <div class="value">
            <span class="gray">8,057.26</span>
            <span class="red">+0.59</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">基金</p>
          <div class="value">
            <span class="gray">14,632.03</span>
            <span class="green">-9.81</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">黄金</p>
          <div class="value">
            <span class="gray">13.38</span>
            <span class="green">-0.02</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">股票</p>
          <div class="value">
            <span class="gray">4,432.13</span>
            <span class="red">+50.29</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">外汇</p>
          <div class="value">
            <span class="gray">1,432.13</span>
            <span class="red">+0.29</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label"></p>
          <div class="value">
            <span class="gray"></span>
            <!-- <span class="red">+0.29</span> -->
          </div>
        </van-grid-item>
      </van-grid>
      <van-row type="flex" justify="center" class="seemore">
        <van-col>
          <span>去看看更多理财产品</span>
          <van-icon name="arrow" class="top-2"/>
        </van-col>
      </van-row>
    </div>
    <div class="main">
      <van-cell title="我的额度" :border="false">
        <div slot="title" class="normal">
          <span>我的额度</span>
        </div>
      </van-cell>
      <van-grid :column-num="2" class="items" :center="false">
        <van-grid-item>
          <p class="label">花呗</p>
          <div class="value">
            <span class="gray">10,000</span>
            <!-- <span class="red">+0.02</span> -->
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">YOUNG</p>
          <div class="value">
            <span class="gray">30,000</span>
            <span class="green">-6,798.02</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">平安信用卡</p>
          <div class="value">
            <span class="gray">70,000</span>
            <span class="green">-390.23</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <p class="label">VISA</p>
          <div class="value">
            <span class="gray">70,000</span>
            <!-- <span class="green">-9.81</span> -->
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, Icon, Grid, GridItem, Col, Row } from 'vant'

export default {
  name: 'Zzc',
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

.header {
  background: @blue;
  position: relative;
  padding: 46px 0 .05rem;
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
  }
  &:after {
    content: ' ';
    width: 100%;
    position: absolute;
    background: @blue;
    padding-top: .04rem;
    bottom: -.032rem;
    border-radius: 0 0 100% 100%;
    transform: scale(1, 2.4);
  }
}
.zhushou {
  color: #fff;
  padding: .028rem .028rem .028rem .12rem;
  position: relative;
  font-size: 16px;
  font-weight: bold;
  .icon {
    width: 0.094rem;
    position: absolute;
    left: .016rem;
  }
  .vice {
    font-size: 14px;
    font-weight: normal;
  }
  .arrow {
    display: inline-block;
    background: rgba(255,255,255,.72);
    margin-left: .006rem;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    text-align: center;
    line-height: 12px;
    opacity: .95;
  }
}
.main {
  margin: 0 .028rem;
  background: #fff;
  position: relative;
  border-radius: .016rem;
  top: -.05rem;
  margin-bottom: .014rem;
  .van-cell {
    background-color: transparent;
  }
  .van-cell__right-icon {
    font-size: 14px;
    color: orange;
  }
}
.total {
  display: flex;
  padding: .028rem;
  > div {
    flex: 1;
  }
  .label {
    font-size: 14px;
    color: #999999;
  }
  .value {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.28;
    padding-top: .008rem;
  }
}
.items {
  .label {
    font-size: 14px;
  }
  .value {
    font-size: 12px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
.seemore {
  font-size: 14px;
  line-height: 2.8;
  color: #999999;
}
// unit
.normal {
  font-size: 16px;
  font-weight: bold;
}
.pdt-14 {
  padding-top: .014rem;
}
.opacity-72 {
  opacity: .72;
}
.mgl-16 {
  margin-left: .016rem;
}
.mgl-08 {
  margin-left: .008rem;
}
.sys-orange {
  color: orange;
}
.top-2 {
  top: 2px;
}
.bdb {
  position: relative;
  &:after {
    content: ' ';
    height: 1px;
    transform: scaleY(0.5);
    background: @bg;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.black {
  color: #000000;
}
.gray {
  color: #999999;
}
.red {
  color: #e8541e;
}
.green {
  color: #0ba194;
}
.txt-r {
  text-align: right;
}
</style>
