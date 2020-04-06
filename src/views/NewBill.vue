<template>
  <div>
    <!-- 标题头 -->
    <van-nav-bar :title="id ? '账单修改' : '新增账单'" leftArrow @click-left="goBack">
      <van-icon v-if="id" slot="right" name="delete" @click="onDelete"></van-icon>
    </van-nav-bar>
    <!-- 表单 -->
    <van-cell title="账单类型" isLink @click="showPicker('type')">{{form.type | mapDict(billTypes)}}</van-cell>
    <van-cell title="消费/产品" isLink @click="showPicker('consumption')">{{form.consumption | mapDict(accounts, 'id')}}</van-cell>
    <van-cell v-if="form.type !== '02' && form.type !== '06'" title="资金账户" isLink @click="showPicker('capital')">{{form.capital | mapDict(capitals, 'id')}}</van-cell>
    <van-cell title="日期" isLink @click="showPicker('date')">{{form.date}}</van-cell>
    <van-field v-if="form.type !== '02' && form.type !== '05'" v-model="form.share" label="份额" inputAlign="right"></van-field>
    <van-field v-model="form.money" label="金额" inputAlign="right"></van-field>
    <van-field v-model="form.note" type="textarea" placeholder="备注"></van-field>
    <van-button type="info" size="large" round @click="confirm">确定</van-button>
    <!-- 底部弹框 -->
    <van-popup v-model="show" position="bottom">
      <van-picker v-if="pickerType !== 'date'" show-toolbar :title="pickerTitle" :columns="columns" value-key="name" @cancel="onClear" @confirm="onSelect" cancel-button-text="清除" />
      <van-datetime-picker v-else v-model="date" type="date" @confirm="onPickTime" @cancel="hidePicker" :max-date="maxDate" />
    </van-popup>
  </div>
</template>

<script>
// Todo 想加入机器学习，为每一步操作给出推荐答案
import moment from 'moment'
import { NavBar, Icon, Cell, Field, Button, Picker, Popup, DatetimePicker } from 'vant'
import { BillTypes } from '@/db/const'
const TitleMaps = {
  type: '账单类型',
  capital: '资金账户',
  consumption: '消费/产品',
  date: '日期'
}
const Today = new Date()

export default {
  name: 'NewBill',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },
  data () {
    return {
      id: '',
      pickerType: '',
      show: false,
      form: {
        id: '',
        type: '02',
        consumption: '',
        capital: '',
        date: moment(Today).format('YYYY年MM月DD日'),
        share: '',
        money: '',
        note: ''
      },
      billTypes: BillTypes,
      date: Today,
      maxDate: Today
    }
  },
  computed: {
    capitals () {
      return this.$store.getters.capitals
    },
    accounts () {
      return this.$store.getters.accounts
    },
    pickerTitle () {
      let pickerType = this.pickerType
      return TitleMaps[pickerType]
    },
    columns () {
      let { pickerType, capitals, accounts, billTypes } = this
      return pickerType === 'type' ? billTypes : (pickerType === 'capital' ? capitals : accounts)
    }
  },
  mounted () {
    let id = this.$route.query.id
    let consumption = this.$store.state.accounts.current
    let bill
    this.id = id
    this.$store.commit('SET_B_CURRENT', id)
    bill = this.$store.getters.bill
    if (bill) {
      this.form = bill
    } else {
      this.form.consumption = consumption
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onDelete () {
      // console.log('Todo')
      this.goBack()
    },
    showPicker (type) {
      this.pickerType = type
      this.show = true
    },
    hidePicker () {
      this.show = false
    },
    onSelect (row) {
      let pickerType = this.pickerType
      this.form[pickerType] = row.id || row.code
      this.hidePicker()
    },
    onPickTime (date) {
      this.form.date = moment(date).format('YYYY年MM月DD日')
      this.hidePicker()
    },
    onClear () {
      let pickerType = this.pickerType
      this.form[pickerType] = ''
      this.hidePicker()
    },
    confirm () {
      this.$store.dispatch('put_bill', this.form)
      this.goBack()
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<vvv>
{"node":"h-div","options":{},"childs":[{"node":"vant-nav-bar","options":{"ref":"cmp00"},"childs":[{"node":"vant-icon","options":{"slot":"right","ref":"cmp000"},"childs":[]}]},{"node":"vant-cell","options":{"ref":"cmp01"},"childs":["投资计划"]},{"node":"vant-cell","options":{"ref":"cmp02"},"childs":["余额+"]},{"node":"vant-cell","options":{"ref":"cmp03"},"childs":["招商中证白酒指数"]},{"node":"vant-cell","options":{"ref":"cmp04"},"childs":["2019年12月25日"]},{"node":"vant-field","options":{"ref":"cmp05"},"childs":[]},{"node":"vant-field","options":{"ref":"cmp06"},"childs":[]},{"node":"vant-button","options":{"ref":"cmp07"},"childs":["确定"]}]}
</vvv>
