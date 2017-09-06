/**
 * vue-resource 配置文件
 * xiedrsz
 */
// 'use strict';

import Vue from 'vue'
import vueResource from 'vue-resource'

// 使用 vue-resource 插件进行请求接口
Vue.use(vueResource)

// 以表单形式发送数据
Vue.http.options.emulateJSON = true

// 拦截请求
Vue.http.interceptors.push((request, next) => {
  // 超时设置
  !request.timeout && (request.timeout = 2000)

  let timer = window.setTimeout(() => {
    next(request.respondWith(request.body, {
      status: 408,
      statusText: '请求超时'
    }));

    // mock 状态时将此句屏蔽
    (window.env !== 'mock') || request.abort()
    clearTimeout(timer)
  }, request.timeout)

  next((res) => {
    clearTimeout(timer);
    (window.env === 'mock') && (res.data = JSON.parse(res.data))
    return res
  })
})
