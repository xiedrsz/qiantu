import Vue from 'vue'

let yestoday = new Date(),
  YYYY, MM, DD;

yestoday.setDate(yestoday.getDate() - 1)
YYYY = yestoday.getFullYear()
MM = yestoday.getMonth() + 1
DD = yestoday.getDate()

yestoday = YYYY + "年" + MM + "月" + DD + "日"

Vue.filter('isYestoday', (value) => {
  if (value == yestoday) {
    return "昨天"
  }
  return value
})