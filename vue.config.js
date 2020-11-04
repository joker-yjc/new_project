const path = require('path')
module.exports = {
  publicPath: `/${process.env.VUE_APP_projectName}`,
  outputDir: path.join(__dirname, 'dist', process.env.VUE_APP_projectName),
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_moduleName
      return args
    })
  },
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
