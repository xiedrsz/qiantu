requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        text: './libs/require/text',
        xvue: './libs/require/xvue',
        Vue: './libs/vue/vue',
        mock: './libs/mock-min',
        VueRouter: './libs/vue/vue-router',
        resource: './libs/vue/vue-resource.min',
        ext: './libs/extend.min',
        router: './config/router',
        setting: './config/setting',
        mockData: './mocks/mockData',
    },
    shim: {
        VueRouter: ['Vue']
    }
});

// Start the main app logic.
requirejs(['Vue', 'router', 'resource', 'setting'], function (Vue, router, resource) {
    Vue.use(resource);
    // 以表单形式发送数据
    Vue.http.options.emulateJSON = true;
    /* 启动路由  */
    var App = Vue.extend({})
    router.start(App, '#app')
});