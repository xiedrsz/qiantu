define(['mockData'], function (mockData) {
	'use strict';

	// 运行环境
	var env = 'mock';

	// 配置mocks
	if (env == 'mock') {
		mockData.config();
	}
});