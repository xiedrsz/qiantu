const checkType = {
  NotNull: /\S+/,
  NameC: /^[\u4E00-\u9FA5]+$/,
  NameE: /^[A-Za-z\s]+$/,
  Email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
  TelePhone: /^[0-9]*$/
}

/**
 * 遍历对象
 */
function each (obj, callback) {
  for (let i in obj) {
    if (callback.call(obj[i], i, obj[i]) === false) {
      break
    }
  }
}
/**
 * 单个检验
 * @Param item string 被检验值
 * @Param auth 测试对象
 */
function checkItem (item, auth) {
  let reg = checkType[auth] || auth
  let type = toString.call(reg)
  if ((type === '[object Function]') || (type === '[object Object]')) {
    return reg(item)
  }
  if (item !== undefined && reg.test(item)) {
    return true
  }
  return false
}

class Check {
  constructor (obj, props, isContinue = false) {
    let auth, messList, i, len, msg
    this.msgList = []
    this.flag = true
    each(props, (label, value) => {
      auth = value.auth
      messList = value.mess

      // Todo 遇到 对象 或 对象数组

      // 正常情况
      len = auth.length
      for (i = 0; i < len; i++) {
        if (!checkItem(obj[label], auth[i])) {
          this.message = msg = messList[i] || messList[0]
          this.msgList.push(msg)
          this.flag = false
          return isContinue
        }
      }
    })
  }

  then (func) {
    if (!this.flag) {
      this.msgList.forEach(message => {
        func(message)
      })
    }
    return this.flag
  }
}

export {
  Check,
  checkType
}
