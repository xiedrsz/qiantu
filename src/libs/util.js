import _ from 'lodash'

/**
 * @Description 深度拷贝集合，废弃
 * @Param collection 集合
 * @Return collection
 */
function copyCol (collection) {
  return _.map(collection, item => (_.assign({}, item)))
}

/**
 * @Description 比较两集合的不同
 * @Param tval 新集合
 * @Param told 旧集合
 * @Return collection
 */
function diff (tval, told) {
  let val = _.cloneDeep(tval)
  let old = _.cloneDeep(told)
  let addIdMap = {}
  let posMap = {}
  let delIdMap = {}
  let adds, dels, result
  // 初始化判斷
  if (isInit()) {
    return []
  }
  // 转换，去除id => 字符串
  val = transToString(val, addIdMap, posMap)
  old = transToString(old, delIdMap)
  // 比较，去除id比较
  adds = _.difference(val, old)
  dels = _.difference(old, val)
  // 转换，=> 对象，补上id
  adds = transToObject(adds, addIdMap, posMap)
  dels = transToObject(dels, delIdMap)
  // 操作判断
  result = combine()
  return result
  // 初始化判断
  function isInit () {
    let len = old.length
    if (!len) {
      len = _.filter(val, item => {
        return !item.id
      }).length
      if (!len) {
        return true
      }
    }
    return false
  }
  // 转成字符串
  function transToString (val, idMap, posMap) {
    let result = _.map(val, (item, index) => {
      let id = item.id
      let temp
      delete item.id
      temp = JSON.stringify(item)
      idMap[temp] = id
      posMap && (posMap[temp] = index)
      return temp
    })
    return result
  }
  // 转换成对象
  function transToObject (val, idMap, posMap) {
    let result = _.map(val, item => {
      let temp = JSON.parse(item)
      temp.id = idMap[item]
      posMap && (temp.index = posMap[item])
      return temp
    })
    return result
  }
  // 合并
  function combine () {
    let ids = _.filter(adds, item => {
      return item.id
    }).map(item => {
      return item.id
    })
    dels = _.filter(dels, item => {
      let id = item.id
      let flag = ~ids.indexOf(id)
      return !flag
    })
    adds = _.map(adds, item => {
      return {
        ...item,
        operate: 'save'
      }
    })
    dels = _.map(dels, item => {
      return {
        ...item,
        operate: 'del'
      }
    })
    // 合并
    return adds.concat(dels)
  }
}

/**
 *
 */
function compareObj (val, old) {
  let result = []
  for (let key in val) {
    if (!_.isEqual(val[key], old[key])) {
      result.push(key)
    }
  }
  return result
}

/**
 * @func 生成随机颜色
 */
function randomColor () {
  let r = _.random(100).toString(16)
  let g = _.random(100).toString(16)
  let b = _.random(255).toString(16)
  return `#${r}${g}${b}`
}

/**
 * @func 金额格式化
 * @param str 金额
 * @param [num=0] 保留小数点数，默认0
 */
function fmoney (str, num) {
  let n = num > 0 && num <= 20 ? num : 0
  let s = parseFloat((str + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let i = 0
  let len = l.length
  let res = ''
  for (; i < len; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== len ? ',' : '')
  }
  res = t.split('').reverse().join('')
  return r ? (res + '.' + r) : res
}

export {
  copyCol,
  diff,
  compareObj,
  randomColor,
  fmoney
}