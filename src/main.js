import Vue from 'vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { 
  BootstrapVue, 
  BootstrapVueIcons,
  BIcon,
} from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('b-icon', BIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
