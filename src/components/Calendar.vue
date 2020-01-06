<template>
  <div>
    <van-row justify="space-around" type="flex" style="padding-top:10px;text-align:center">
      <van-col span="3">日</van-col>
      <van-col span="3">一</van-col>
      <van-col span="3">二</van-col>
      <van-col span="3">三</van-col>
      <van-col span="3">四</van-col>
      <van-col span="3">五</van-col>
      <van-col span="3">六</van-col>
    </van-row>
    <van-row justify="space-around" type="flex" style="padding-top:10px;text-align:center">
      <van-col span="3"></van-col>
      <van-col span="3"></van-col>
      <van-col span="3"></van-col>
      <van-col span="3"></van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>1</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px">
            <span
              style="background-color:#ff0000;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px"
            ></span>
          </p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>2</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px"></p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>3</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px"></p>
        </div>
      </van-col>
    </van-row>
    <van-row justify="space-around" type="flex" style="padding-top:10px;text-align:center">
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>10</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px"></p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>11</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px">
            <span
              style="background-color:#ff0000;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px"
            ></span>
            <span
              style="background-color:#1665f3;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;margin-left:3px"
            ></span>
          </p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>12</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px"></p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>今</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px"></p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>28</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px">
            <span
              style="background-color:#ff0000;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px"
            ></span>
          </p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span
              style="background-color:#ffaf43;display:inline-block;width:1.5em;height:1.5em;border-top-left-radius:1.5em;border-top-right-radius:1.5em;border-bottom-right-radius:1.5em;border-bottom-left-radius:1.5em;font-size:12px;color:#ffffff;padding-top:2px;padding-right:2px;padding-left:2px;padding-bottom:2px"
            >29</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px">
            <span
              style="background-color:#ff0000;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px"
            ></span>
          </p>
        </div>
      </van-col>
      <van-col span="3">
        <div>
          <p style="margin-top:0;margin-bottom:0">
            <span>30</span>
          </p>
          <p style="margin-top:0;margin-bottom:0;line-height:4px">
            <span
              style="background-color:#ff0000;display:inline-block;width:6px;height:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px"
            ></span>
          </p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col } from 'vant'

export default {
  name: 'MCalendar',
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
}
</script>

<style lang="less" scoped>
</style>
