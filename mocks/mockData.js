define(['mock'], function (Mock) {
    'use strict';

    var conf = {};

    conf.config = function () {
        Mock
            .mock(/expense\/pull/, function () {
                return {
                    amount: '32.00',
                    lists: [{
                        detail: [{
                            img: './assets/img/food.png',
                            type: '餐饮食品',
                            mess: '午餐16元',
                            money: '-16.00'
                        }, {
                            img: './assets/img/food.png',
                            type: '餐饮食品',
                            mess: '午餐16元',
                            money: '-16.00'
                        }]
                    }, {
                        date: '昨天',
                        amount: '20.00',
                        detail: [{
                            img: './assets/img/food.png',
                            type: '餐饮食品',
                            mess: '午餐16元',
                            money: '-16.00'
                        }, {
                            img: './assets/img/food.png',
                            type: '餐饮食品',
                            mess: '午餐16元',
                            money: '-16.00'
                        }]
                    }]
                };
            })
            .mock(/sendsms/, function () {
                return {
                    a: 'ss'
                };
            });
    };

    return conf;
});