/**
 * state 相当于变量的储存
 * export default state 把state暴露出去
 */

const state = {
  prompt: {
    show: false,
    msg: '',
    callback: null,
    cancel: false
  },
  showLoading: false,
  toastOPT: {
    show: false,
    type: 'success',
    width: '',
    msg: ''
  }
}

export default state
