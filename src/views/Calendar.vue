<template>
  <div>
    <van-nav-bar leftArrow>
      <div slot="title">
        <span style="margin-right:0.5em">2018.08</span>
        <van-icon name="arrow-down" :size="12" color="#000000"></van-icon>
      </div>
    </van-nav-bar>
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
    <van-cell-group title="重大事件">
      <van-cell title="全部产品" label="无备注" isLink center icon="home-o">休市</van-cell>
      <van-cell title="招商中证白酒指数" label="基金定投" isLink center icon="home-o">400</van-cell>
    </van-cell-group>
    <van-cell-group title="资金动向">
      <van-cell title="招商中证白酒指数" isLink center>+ ￥400</van-cell>
      <van-cell title="余额+" isLink center>- ￥400</van-cell>
      <van-cell title="总计" center>0</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, CellGroup, Cell } from 'vant'
export default {
  name: 'calendar',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"h-div","options":{"ref":"cmp000","slot":"title"},"childs":[{"node":"h-span","options":{"ref":"cmp0000"},"childs":["2018.08"]},{"node":"vant-icon","options":{"ref":"cmp0001"},"childs":[]}]}]},{"node":"h-div","options":{"ref":"cmp01"},"childs":[{"node":"vant-row","options":{"ref":"cmp010"},"childs":[{"node":"vant-col","options":{"ref":"cmp0100"},"childs":["日"]},{"node":"vant-col","options":{"ref":"cmp0101"},"childs":["一"]},{"node":"vant-col","options":{"ref":"cmp0102"},"childs":["二"]},{"node":"vant-col","options":{"ref":"cmp0103"},"childs":["三"]},{"node":"vant-col","options":{"ref":"cmp0104"},"childs":["四"]},{"node":"vant-col","options":{"ref":"cmp0105"},"childs":["五"]},{"node":"vant-col","options":{"ref":"cmp0106"},"childs":["六"]}]},{"node":"vant-row","options":{"ref":"cmp011"},"childs":[{"node":"vant-col","options":{"ref":"cmp0110"},"childs":[]},{"node":"vant-col","options":{"ref":"cmp0111"},"childs":[]},{"node":"vant-col","options":{"ref":"cmp0112"},"childs":[]},{"node":"vant-col","options":{"ref":"cmp0113"},"childs":[]},{"node":"vant-col","options":{"ref":"cmp0114"},"childs":[{"node":"h-div","options":{"ref":"cmp01140"},"childs":[{"node":"h-p","options":{"ref":"cmp011400"},"childs":[{"node":"h-span","options":{"ref":"cmp0114000"},"childs":["1"]}]},{"node":"h-p","options":{"ref":"cmp011401"},"childs":[{"node":"h-span","options":{"ref":"cmp0114010"},"childs":[]}]}]}]},{"node":"vant-col","options":{"ref":"cmp0115"},"childs":[{"node":"h-div","options":{"ref":"cmp01150"},"childs":[{"node":"h-p","options":{"ref":"cmp011500"},"childs":[{"node":"h-span","options":{"ref":"cmp0115000"},"childs":["2"]}]},{"node":"h-p","options":{"ref":"cmp011501"},"childs":[]}]}]},{"node":"vant-col","options":{"ref":"cmp0116"},"childs":[{"node":"h-div","options":{"ref":"cmp01160"},"childs":[{"node":"h-p","options":{"ref":"cmp011600"},"childs":[{"node":"h-span","options":{"ref":"cmp0116000"},"childs":["3"]}]},{"node":"h-p","options":{"ref":"cmp011601"},"childs":[]}]}]}]},{"node":"vant-row","options":{"ref":"cmp012"},"childs":[{"node":"vant-col","options":{"ref":"cmp0120"},"childs":[{"node":"h-div","options":{"ref":"cmp01200"},"childs":[{"node":"h-p","options":{"ref":"cmp012000"},"childs":[{"node":"h-span","options":{"ref":"cmp0120000"},"childs":["10"]}]},{"node":"h-p","options":{"ref":"cmp012001"},"childs":[]}]}]},{"node":"vant-col","options":{"ref":"cmp0121"},"childs":[{"node":"h-div","options":{"ref":"cmp01210"},"childs":[{"node":"h-p","options":{"ref":"cmp012100"},"childs":[{"node":"h-span","options":{"ref":"cmp0121000"},"childs":["11"]}]},{"node":"h-p","options":{"ref":"cmp012101"},"childs":[{"node":"h-span","options":{"ref":"cmp0121010"},"childs":[]},{"node":"h-span","options":{"ref":"cmp0121011"},"childs":[]}]}]}]},{"node":"vant-col","options":{"ref":"cmp0122"},"childs":[{"node":"h-div","options":{"ref":"cmp01220"},"childs":[{"node":"h-p","options":{"ref":"cmp012200"},"childs":[{"node":"h-span","options":{"ref":"cmp0122000"},"childs":["12"]}]},{"node":"h-p","options":{"ref":"cmp012201"},"childs":[]}]}]},{"node":"vant-col","options":{"ref":"cmp0123"},"childs":[{"node":"h-div","options":{"ref":"cmp01230"},"childs":[{"node":"h-p","options":{"ref":"cmp012300"},"childs":[{"node":"h-span","options":{"ref":"cmp0123000"},"childs":["今"]}]},{"node":"h-p","options":{"ref":"cmp012301"},"childs":[]}]}]},{"node":"vant-col","options":{"ref":"cmp0124"},"childs":[{"node":"h-div","options":{"ref":"cmp01240"},"childs":[{"node":"h-p","options":{"ref":"cmp012400"},"childs":[{"node":"h-span","options":{"ref":"cmp0124000"},"childs":["28"]}]},{"node":"h-p","options":{"ref":"cmp012401"},"childs":[{"node":"h-span","options":{"ref":"cmp0124010"},"childs":[]}]}]}]},{"node":"vant-col","options":{"ref":"cmp0125"},"childs":[{"node":"h-div","options":{"ref":"cmp01250"},"childs":[{"node":"h-p","options":{"ref":"cmp012500"},"childs":[{"node":"h-span","options":{"ref":"cmp0125000"},"childs":["29"]}]},{"node":"h-p","options":{"ref":"cmp012501"},"childs":[{"node":"h-span","options":{"ref":"cmp0125010"},"childs":[]}]}]}]},{"node":"vant-col","options":{"ref":"cmp0126"},"childs":[{"node":"h-div","options":{"ref":"cmp01260"},"childs":[{"node":"h-p","options":{"ref":"cmp012600"},"childs":[{"node":"h-span","options":{"ref":"cmp0126000"},"childs":["30"]}]},{"node":"h-p","options":{"ref":"cmp012601"},"childs":[{"node":"h-span","options":{"ref":"cmp0126010"},"childs":[]}]}]}]}]}]},{"node":"vant-cell-group","options":{"ref":"cmp02"},"childs":[{"node":"vant-cell","options":{"ref":"cmp020"},"childs":["休市"]},{"node":"vant-cell","options":{"ref":"cmp021"},"childs":["400"]}]},{"node":"vant-cell-group","options":{"ref":"cmp03"},"childs":[{"node":"vant-cell","options":{"ref":"cmp030"},"childs":["+ ￥400"]},{"node":"vant-cell","options":{"ref":"cmp031"},"childs":["- ￥400"]},{"node":"vant-cell","options":{"ref":"cmp032"},"childs":["0"]}]}]}
</vvv>
