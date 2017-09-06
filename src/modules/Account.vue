<template>
  <div>
    <x-header :left-options="{showBack: true}">
      手工记账
    </x-header>
    <div class="ac-tip" v-show="itemDetail.showTip">小主，快教教我这个账单怎么分类</div>

    <div class="ac-money">
      <div>
        <img id="uac-type" :src="itemDetail.img" />
      </div>
      <div>
        {{itemDetail.type}}
      </div>
      <div>
        <input type="number" placeholder="0.00" v-model="itemDetail.money" />
      </div>
    </div>

    <ul class="ac-inoutul">
      <li class="ac-target">支出</li>
      <li>收入</li>
    </ul>

    <out-items :out-items="outItems" @on-select="select"></out-items>

    <scroller lock-x>
      <div>
        <div class="ac-input">
          <div>
            <img src="/static/img/calander.png" />
          </div>
          <div>
            <input type="text" placeholder="2016年10月25日" v-model="itemDetail.date" />
          </div>
        </div>
        <div class="ac-input">
          <div>
            <img src="/static/img/local.png" />
          </div>
          <div>
            <span>深圳市罗湖区嘉宾路爵士大厦21B17</span>
          </div>
        </div>
        <div class="ac-input" v-show="itemDetail.showTip">
          <div>
            <img src="/static/img/key.png" />
          </div>
          <div>
            <input type="text" placeholder="关键字" v-model="itemDetail.keyWord" />
          </div>
        </div>
        <div class="ac-input" v-show="!itemDetail.showTip">
          <div>
            <img src="/static/img/edit.png" />
          </div>
          <div>
            <input type="text" placeholder="备注" v-model="itemDetail.mess" />
          </div>
        </div>
        <button class='ac-btn' @click="save">
          保存
        </button>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    XHeader, Scroller
  } from 'vux'
  import {
    OutItems
  } from '../components'

  import {
    ext
  } from '../libs'

  import expenseTB from '../tables/expenseTB'

  export default {
    data () {
      return {
        outItems: [],
        itemDetail: {},
        target: {
          x: 0,
          y: 0
        }
      }
    },
    mounted () {
      let vm = this

      // 获取支出列表
      expenseTB.getOutItems(function (res) {
        vm.outItems = vm.outItems.concat(res.outItems)
      })

      // 初始化支出详情
      this.reset()
    },
    methods: {
      select (res) {
        this.itemDetail.img = res.src
        this.itemDetail.type = res.name
      },
      // 保存收支信息
      save () {
        let vm = this
        let bill = this.$route.params.bill

        if (!!bill && bill !== ':bill') {
          bill = JSON.parse(bill)
          if (this.itemDetail.type !== bill.type) {
            this.itemDetail.oldType = bill.type
          }
        }

        expenseTB.saveOutItem(vm.itemDetail, () => {
          vm.$router.push({
            path: '/home'
          })
        })
      },
      // 重置支出详情 itemDetail
      reset () {
        let bill = this.$route.params.bill
        let today = expenseTB.getter('today')
        this.itemDetail = {
          img: '/static/img/question.png',
          type: '类别',
          date: today,
          address: '',
          money: '',
          mess: ''
        }
        if (!!bill && bill !== ':bill') {
          bill = JSON.parse(bill)
          ext.extend(this.itemDetail, bill)
          this.itemDetail.img = '/static/img/' + bill.img
        }
      }
    },
    components: {
      XHeader,
      OutItems,
      Scroller
    }
  }
</script>
