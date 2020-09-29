const path = require('path')
module.exports = {
  outputDir: path.join(__dirname, 'dist', process.env.VUE_APP_PROJECTNAME),
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_MODULENAME
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
