import Vue from 'vue'

let files = require.context('.', false, /\.vue$/)
files.keys().forEach((key) => {
  if (key.match(/index\.js/)||!files(key).default.name) {
    return
  }
  Vue.component(files(key).default.name, files(key).default)
})
