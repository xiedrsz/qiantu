define(['mock'], function (Mock) {
	'use strict';

	var conf = {};

	conf.config = function () {
		Mock
			.mock(/sendskkms/, function () {
				return {
					a: 'sendskkms'
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