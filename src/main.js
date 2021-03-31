require('dotenv').config();

import Vue from 'vue';

// Routes
import App from './App.vue';
import router from './router.js';

// Styles
import './styles/index.scss';

// Http
import http from './http';
Vue.prototype.$http = http;

// Store
import store from './store';

// Vuetify
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
