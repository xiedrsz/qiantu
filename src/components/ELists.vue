<template>
  <div>
    <div v-for="(item, listI) in lists">
      <div class="h-date" v-if="item.date!=today">
        <span>{{item.date | isYestoday}}</span>
        <div>{{item.amount}}</div>
      </div>
      <div class="h-item" v-for="(detail, index) in item.detail" @click="view(listI, index)">
        <div>
          <img :src="detail.img" />
        </div>
        <div>
          <h3>{{detail.type}}</h3>
          <p>{{detail.mess}}</p>
          <div>{{detail.money}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-lists',
    props: {
      lists: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      let today, YYYY, MM, DD
      today = new Date()
      YYYY = today.getFullYear()
      MM = today.getMonth() + 1
      DD = today.getDate()

      today = YYYY + '年' + MM + '月' + DD + '日'
      return {
        today: today
      }
    },
    methods: {
      view (listI, index) {
        let bill, item, detail
        item = this.lists[listI]
        detail = item.detail[index]
        bill = {
          index,
          date: item.date,
          img: detail.img.replace('/static/img/', ''),
          mess: detail.mess,
          money: +detail.money,
          showTip: false,
          type: detail.type
        }
        this.$router.push({
          name: 'account',
          params: {
            bill: JSON.stringify(bill)
          }
        })
      }
    }
  }
</script>
