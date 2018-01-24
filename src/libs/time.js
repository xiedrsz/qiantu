/**
 * @Description 格式化事件
 */
function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * @Description 獲取年齡
 * @Param birthDate String 出生日期 1991-01-01
 * @Return Number 年齡 23
 * @Error => -n
 */
function getAge (birthDate) {
  let fullDate = birthDate.split('-')
  let year = fullDate[0]
  let month = fullDate[1]
  let day = fullDate[2]
  let cuDateNew = formatDate(new Date(), 'yyyy-MM-dd').split('-')
  let yearC = cuDateNew[0]
  let monthC = cuDateNew[1]
  let dayC = cuDateNew[2]
  let age = yearC - year - 1
  yearC >= year && (monthC > month || (monthC === month && dayC >= day)) && (age += 1)
  return age
}
function getStartDate140 () {
  let cuDateNew = formatDate(new Date(), 'yyyy-MM-dd').split('-')
  let yearC = cuDateNew[0]
  let monthC = cuDateNew[1]
  let dayC = cuDateNew[2]
  let year = yearC - 140
  let startDate = year + '-' + monthC + '-' + dayC
  return startDate
}
function getEndDate18 () {
  let cuDateNew = formatDate(new Date(), 'yyyy-MM-dd').split('-')
  let yearC = cuDateNew[0]
  let monthC = cuDateNew[1]
  let dayC = cuDateNew[2]
  let year = yearC - 18
  let endDate = year + '-' + monthC + '-' + dayC
  return endDate
}

export {
  getAge,
  formatDate,
  getEndDate18,
  getStartDate140
}
