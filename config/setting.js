define(['mockData'], function (mockData) {
  'use strict';

  // 运行环境 [mock, test, product]
  var env = 'test',
    test_server = "http://192.168.1.21:3000";

  // 配置mocks
  if (env == 'mock') {
    mockData.config();
  }

  return {
    env: env,
    test_server: test_server
  }
});