import Vue from 'vue'

/**
 * @Description 前后缀
 * @Param label 标签
 * @Param isFront boolean 是否为前缀 [默认为 false/undefined]
 */
Vue.filter('suffix', (value, label, isFront) => {
  if (value === 'undefined' || value === '') {
    return ''
  }
  return !isFront ? (value + label) : (label + value)
})

/**
 * 货币格式化
 * @param  num 小数点位数
 * @return eg: 13,489.02
 */
Vue.filter('fmoney', (str, num) => {
  let n = num > 0 && num <= 20 ? num : 2
  let s = parseFloat((str + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let i = 0
  let len = l.length
  for (; i < len; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
})

/**
 * 正负符号
 * @return eg: + 8.09 OR 
 */
Vue.filter('signature', (str) => {
  let signature = '+'
  str = +str
  if (str < 0) {
    signature = '−'
    str = -str
  }
  return `${signature} ${str}`
})