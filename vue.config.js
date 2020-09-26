// const PROJECT_CONFIG = require('./projectConfig')
const path = require('path')
module.exports = {
  // publicPath: PROJECT_CONFIG.projectName,
  // chainWebpack: config => {
  //   config.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .loader('eslint-loader')
  //     .tap(options => {
  //       options.fix = true
  //       return options
  //     })
  // },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.join(__dirname, './src')],
          options: {
            fix: true
          }
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
