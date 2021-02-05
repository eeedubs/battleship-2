require('dotenv').config();

import Vue from 'vue';

// Routes
import App from './App.vue';
import router from './router.js';

// BootStrap
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

// Http
import http from './http';
Vue.prototype.$http = http;

// Store
import store from './store';

// Unicon (icons)
import Unicon from 'vue-unicons'
import { 
  uniEnter,
  uniArrowUp,
  uniArrowRight,
  uniArrowDown,
  uniArrowLeft,
} from 'vue-unicons/src/icons'

Unicon.add([uniEnter, uniArrowUp, uniArrowRight, uniArrowDown, uniArrowLeft])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
