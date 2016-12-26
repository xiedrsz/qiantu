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
		filter: './libs/vue/filter',
		VueRouterTransition: './libs/vue/vue-router-transition.min',
		mock: './libs/mock-min',
		analyzer: './libs/analyzer',
		dataApi: './libs/dataApi',
		VueRouter: './libs/vue/vue-router',
		resource: './libs/vue/vue-resource.min',
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
requirejs(['Vue', 'router', 'resource', 'setting', 'filter'], function (Vue, router, resource) {
	Vue.use(resource);
	// 以表单形式发送数据
	Vue.http.options.emulateJSON = true;
	/* 启动路由  */
	var App = Vue.extend({
		data: function () {
			return {
				menuClass: "",
				routeTran: "vux-pop-out"
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