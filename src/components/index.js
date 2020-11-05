import Vue from 'vue'

let files = require.context('.', false, /\.vue$/)
files.keys().forEach((key) => {
  if (key.match(/index\.js/)||!files(key).default.name) {
    return
  }
  let componentName = files(key).default.name
  if (componentName) {
    Vue.component(componentName, files(key).default)
  }
})
