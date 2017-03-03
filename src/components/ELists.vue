<template>
  <div>
    <div v-for="item in lists">
      <div class="h-date" v-if="item.date!=today">
        <span>{{item.date | isYestoday}}</span>
        <div>{{item.amount}}</div>
      </div>
      <div class="h-item" v-for="detail in item.detail">
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
    data() {
      let today = new Date(),
        YYYY = today.getFullYear(),
        MM = today.getMonth() + 1,
        DD = today.getDate();

      today = YYYY + "年" + MM + "月" + DD + "日";
      return {
        today: today
      }
    }
  }
</script>