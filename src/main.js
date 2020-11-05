import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import moment from 'moment'
import './components'
import './assets/style/antd.less'
import './assets/style/theme.scss'
import './assets/style/global.scss'

Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.use(Antd)
const APP = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

export default APP
