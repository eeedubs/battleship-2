import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

if (module.hot) {
  module.hot.accept(['./modules'], () => {
    const newModules = require('./modules'); // eslint-disable-line global-require
    store.hotUpdate({ newModules });
  });
}

export default store;