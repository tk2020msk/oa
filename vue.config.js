const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const name = 'H5Vue' // page title
const proxyUrl = {
  qa:'https://openapi.qa.ixiancheng.com',
  stage:'https://openapi.stage.ixiancheng.com',
  prod:'https://openapi.ixiancheng.com'
}[process.env.VUE_APP_ENV];

// 记录打包速度
const smp = new SpeedMeasurePlugin();

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    proxy: {
      "/sars": {
        target: proxyUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sars": ""
        }
      }
  }},
  configureWebpack: smp.wrap({
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        views: resolve('src/views'), // 页面
        components: resolve('src/components'), // 组件
        api: resolve('src/api'), // 接口
        utils: resolve('src/utils'), // 通用功能
        assets: resolve('src/assets'), // 静态资源
        style: resolve('src/style') // 通用样式
      }
    }
  }),
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
};