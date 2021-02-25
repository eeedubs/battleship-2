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
    async refreshJwt({commit}, oldToken) {
      let response = await http.put('/sessions', { token: oldToken });
      if (response.data && response.data.auth) {
        const { token, user } = response.data;
        http.defaults.headers.common['x-access-token'] = token;
        commit('authSuccess', { token, user });
        return response.data;
      } else {
        commit('authError', 'Authentication failed.');
        localStorage.removeItem('token');
        return;
      }
    },
    async signIn({commit}, user) {
      commit('authRequest');
      try {
        let response = await http.post('/sessions', user);
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          localStorage.setItem('user', user);
          http.defaults.headers.common['x-access-token'] = token;
          commit('authSuccess', { token, user });
          return response.data;
        } else {
          commit('authError', 'Authentication failed.');
          localStorage.removeItem('token');
          return;
        }
      } catch(error) {
        localStorage.removeItem('token');
        if (error.response && error.response.data){
          commit('authError', error.response.data.error);
        } else {
          commit('authError', error);
        }
        return;
      }
    },
    async signUp({commit}, user) {
      commit('authRequest');
      try {
        let response = await http.post('/users', user);
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          localStorage.setItem('user', user);
          http.defaults.headers.common['x-access-token'] = token;
          commit('authSuccess', { token, user });
          return response.data;
        } else {
          commit('authError', 'Authentication failed.');
          localStorage.removeItem('token');
          return;
        }
      } catch (error) {
        localStorage.removeItem('token');
        if (error.response && error.response.data){
          commit('authError', error.response.data.error);
        } else {
          commit('authError', error);
        }
        return;
      }
    },
    async signOut({commit, state}) {
      await http.delete('/sessions', { token: state.token })
      commit('signOut');
      localStorage.removeItem('token');
      delete http.defaults.headers.common['x-access-token'];
      return;
    },
    async clearError({commit}) {
      commit('clearError');
    },
  },
  mutations: {
    authRequest(state) {
      state.status = 'loading';
    },
    authSuccess(state, { token, user }) {
      state.status = 'success';
      state.token = token;
      state.user = user;
      state.error = null;
    },
    authError(state, error ) {
      state.status = 'error';
      state.token = null;
      state.error = error;
      state.user = null;
    },
    signOut(state) {
      state.status = null;
      state.token = null;
      state.user = {};
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    isLoggedIn: state => !!state.token && !!state.user,
    currentUser: state => state.user,
    getError: state => state.error,
    getToken: state => state.token,
  },
}
