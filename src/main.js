import Vue from 'vue';
import App from './App.vue';

// BootStrap
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

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
  render: h => h(App),
}).$mount('#app')
