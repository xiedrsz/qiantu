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
		VueRouter: './libs/vue/vue-router',
		router: './config/router'
	},
	shim: {
		VueRouter: ['Vue']
	}
});

// Start the main app logic.
requirejs(['Vue', 'router'], function (Vue, router) {
	/* 启动路由  */
	var App = Vue.extend({})
	router.start(App, '#app')
});