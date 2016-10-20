define(['Vue', 'VueRouter', 'xvue!./modules/home.xvue', 'xvue!./components/about.xvue'], function (Vue, VueRouter, Home, About) {
	'use strict';

	Vue.use(VueRouter);

	var router = new VueRouter();

	/* 创建路由映射  */
	router.map({
		'/home': {
			component: Home
		},
		'/about': {
			component: About
		}
	});

	router.redirect({
		'/': '/home'
	});

	return router;
});