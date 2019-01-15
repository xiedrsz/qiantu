import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import { parseString } from 'xml2js'
import { timeout, server } from './config.json'
import store from '@/store'
const commit = store.commit || store.dispatch
Vue.use(AjaxPlugin)
Vue.http.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * axios 公共配置
 */
Vue.http.interceptors.request.use((config) => {
  let { procedure, shade } = config
  config.timeout = config.timeout || timeout
  config.method = 'POST'
  config.url = server + procedure
  config.headers = {
    'Content-Type': 'text/xml;utf-8'
  }
  // 打開遮罩
  if (shade !== false) {
    commit('SET_LOADING', true)
  }
  // 入参转换
  config.transformRequest = [(data = {}) => {
    data = {
      mobileRequest: data
    }
    let parameters = JSON.stringify(data)
    let request = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fac="http://facade.service.ifc.platform.ins">
        <soapenv:Header/>
          <soapenv:Body>
            <fac:${procedure}>
              <fac:args0>${parameters}</fac:args0>
            </fac:${procedure}>
          </soapenv:Body>
      </soapenv:Envelope>`
    return request
  }]
  // 转换xml
  let parse = (data) => {
    return new Promise((resolve, reject) => {
      parseString(data, {
        tagNameProcessors: [(name) => {
          return name.replace(/(^\w+:)|(\w+$)/g, '$2')
        }],
        ignoreAttrs: true,
        explicitArray: false
      }, (err, result) => {
        if (err) {
          reject('解析错误')
        }
        resolve(result)
      })
    })
  }
  // 转换输出
  config.transformResponse = [async (data) => {
    let res = await parse(data)
    return res
  }]

  return config
}, (error) => {
  commit('SET_LOADING', true)
  return Promise.reject(error)
})

Vue.http.interceptors.response.use((response) => {
  // 关闭遮罩
  let shade = response.config.shade
  if (shade !== false) {
    commit('SET_LOADING', false)
  }
  return response.data
}, (error) => {
  // 关闭遮罩
  commit('SET_LOADING', false)
  commit('UPDATE_PROMPT', {
    type: 'warn',
    msg: '連接失敗'
  })
  return Promise.reject(error)
})
