// const { join } = require('path')
const isProduction = process.env.NODE_ENV === 'production'

// mock 资源文件的绝对路径
// const mockPath = join(__dirname, 'mock')

// 获取 webpack allias别名
const webpackAlias = require('./webpack.alias.config.js')
module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    // alias 别名添加
    webpackAlias(config)
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/ipa': {
        target: 'http://152.136.124.165:8989',
        changeOrigin: true,
        pathRewrite: {
          '^/ipa': '/ipa' // 路径重写
        }
      }
    },
    overlay: false
  },
  // 在开发环境下，在每次保存时 lint 代码
  lintOnSave: !isProduction
}
