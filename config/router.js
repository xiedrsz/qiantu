define(['Vue', 'VueRouter', 'xvue!./modules/home.xvue', 'xvue!./modules/account.xvue'], function (Vue, VueRouter, Home, Account) {
    'use strict';

    Vue.use(VueRouter);

    var router = new VueRouter();

    /* 创建路由映射  */
    router.map({
        '/home': {
            component: Home
        },
        '/account/:bill': {
            name: 'account',
            component: Account
        }
    });

    router.redirect({
        '/': '/home'
    });

    return router;
});