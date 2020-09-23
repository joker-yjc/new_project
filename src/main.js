import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const APP = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

export default APP;
