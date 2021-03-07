import { http } from '@/http'

export default {
  state: {
    message: null,
    status: null,
    token: null,
    user: null,
    error: null,
  },
  actions: {
    async refresh_jwt({commit, state}) {
      try {
        let response = await http.put('/sessions', { token: state.token });
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          http.defaults.headers.common['x-access-token'] = token;
          commit('auth_success', { token, user });
          return true;
        } else {
          localStorage.removeItem('token');
          return;
        }
      } catch(error) {
        commit('clear_auth_data');
        localStorage.removeItem('token');
        return;
      }
    },
    async sign_in({commit}, user) {
      commit('auth_request');
      try {
        let response = await http.post('/sessions', user);
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          localStorage.setItem('user', user);
          http.defaults.headers.common['x-access-token'] = token;
          commit('auth_success', { token, user });
          return response.data;
        } else {
          commit('auth_error', 'Authentication failed.');
          localStorage.removeItem('token');
          return;
        }
      } catch(error) {
        localStorage.removeItem('token');
        if (error.response && error.response.data){
          commit('auth_error', error.response.data.error);
        } else {
          commit('auth_error', error);
        }
        return;
      }
    },
    async sign_up({commit}, user) {
      commit('auth_request');
      try {
        let response = await http.post('/users', user);
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          localStorage.setItem('user', user);
          http.defaults.headers.common['x-access-token'] = token;
          commit('auth_success', { token, user });
          return response.data;
        } else {
          commit('auth_error', 'Authentication failed.');
          localStorage.removeItem('token');
          return;
        }
      } catch (error) {
        localStorage.removeItem('token');
        if (error.response && error.response.data){
          commit('auth_error', error.response.data.error);
        } else {
          commit('auth_error', error);
        }
        return;
      }
    },
    async sign_out({commit, state}) {
      if (state.token) {
        await http.delete('/sessions', { token: state.token })
      }
      commit('clear_auth_data');
      localStorage.removeItem('token');
      delete http.defaults.headers.common['x-access-token'];
      return;
    },
    async clear_error({commit}) {
      commit('clear_error');
    },
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      state.status = 'success';
      state.token = token;
      state.user = user;
      state.error = null;
    },
    auth_error(state, error ) {
      state.status = 'error';
      state.token = null;
      state.user = null;
      state.error = error;
    },
    clear_auth_data(state) {
      state.status = null;
      state.token = null;
      state.user = {};
    },
    clear_error(state) {
      state.error = null;
    },
  },
  getters: {
    is_signed_in: state => !!state.token && !!state.user,
    current_user: state => state.user,
    get_error: state => state.error,
    get_token: state => state.token,
  },
}
