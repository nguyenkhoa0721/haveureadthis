import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios,axios);
axios.defaults.baseURL = 'http://api.haveyoureadthis.tech'
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')