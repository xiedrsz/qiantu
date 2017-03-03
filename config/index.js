// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 生产环境配置
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 静态资源根路径，本地浏览器查看使用 “./”, ng服务器上用 “/” ??
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  // 开发环境配置
  dev: {
    env: require('./dev.env'), // => "development"
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // http 请求反转配置表
    proxyTable: {
      "/vf_sales": "http://172.16.17.162:8000",
      "/vfsales": "http://172.16.17.232:7002"
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}