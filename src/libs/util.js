/**
 * 格式化英文姓名
 */
function formatNameE (str) {
  str = str.toLowerCase()
  // \b判断边界\s判断空格
  var reg = /\b(\w)|\s(\w)/g 
  return str.replace(reg, function (m) {
    return m.toUpperCase()
  })
}
/**
 * 获取参数
 */
function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href)||[, ''])[1].replace(/\+/g, '%20'))||null
}
/**
 * 格式化香港身份证号码中的英文
 */
function formatUpper (str) {
  return str.toUpperCase()
}

export {
  getUrlKey,
  formatUpper
}
