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
  if (setting.env !== "product") {
    Vue.http.interceptors.push(function (request, next) {
      request.url = setting.test_server + request.url;
      next(function (res) {
        (setting.env == "mock") && (res.data = JSON.parse(res.data));
        return res;
      });
    });
  }

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