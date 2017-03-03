requirejs.config({
  baseUrl: './',
  paths: {
    text: './libs/require/text',
    xvue: './libs/require/xvue',
    Vue: './libs/vue/vue',
    filter: './libs/vue/filter',
    VueRouter: './libs/vue/vue-router',
    VueRouterTransition: './libs/vue/vue-router-transition.min',
    resource: './libs/vue/vue-resource.min',
    mock: './libs/mock-min',
    analyzer: './libs/analyzer',
    dataApi: './libs/dataApi',
    ext: './libs/extend.min',
    store: './libs/store',
    localDB: './libs/localDB',
    router: './config/router',
    setting: './config/setting',
    mockData: './mocks/mockData'
  },
  shim: {
    VueRouter: ['Vue']
  }
});

// Start the main app logic.
requirejs(['Vue', 'router', 'resource', 'setting', 'filter'], function (Vue, router, resource, setting) {
  Vue.use(resource);
  // 以表单形式发送数据
  Vue.http.options.emulateJSON = true;

  // 拦截请求
  Vue.http.interceptors.push(function (request, next) {
    // 请求地址设置
    (setting.env !== "product") && (request.url = setting.test_server + request.url);

    // 超时设置
    !request.timeout && (request.timeout = 1000);
    var timer = setTimeout(function () {
      clearInterval(timer);
      next(request.respondWith(request.body, {
        status: 408,
        statusText: '请求超时'
      }));
      (setting.env !== "mock") && request.abort();
    }, request.timeout);

    next(function (res) {
      (setting.env == "mock") && (res.data = JSON.parse(res.data));
      return res;
    });
  });

  /* 启动路由  */
  var App = Vue.extend({
    data: function () {
      return {
        menuClass: ""
      }
    },
    methods: {
      closeMenu: function () {
        this.menuClass = "menu_animation1";
      }
    }
  });
  router.start(App, '#app');
});