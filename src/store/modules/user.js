import { http } from '@/http'

export default {
  state: {
    message: null,
    status: null,
    token: null,
    user: null,
    errors: null,
  },
  actions: {
    async refreshJwt({commit, state}) {
      try {
        let response = await http.put('/sessions', { token: state.token });
        if (response.data && response.data.auth) {
          const { token, user } = response.data;
          http.defaults.headers.common['x-access-token'] = token;
          commit('authSuccess', { token, user });
          return true;
        } else {
          localStorage.removeItem('token');
          return;
        }
      } catch(error) {
        commit('clearAuthData');
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
          commit('authError', ['Authentication failed.']);
          localStorage.removeItem('token');
          return;
        }
      } catch(error) {
        localStorage.removeItem('token');
        commit('authError', [error]);
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
          commit('authError', [response.data.error]);
          localStorage.removeItem('token');
          return;
        }
      } catch (error) {
        localStorage.removeItem('token');
        commit('authError', [error]);
        return;
      }
    },
    async signOut({commit, state}) {
      if (state.token) {
        await http.delete('/sessions', { token: state.token })
      }
      commit('clearAuthData');
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
      state.errors = null;
    },
    authError(state, errors ) {
      state.status = 'error';
      state.token = null;
      state.user = null;
      state.errors = errors;
    },
    clearAuthData(state) {
      state.status = null;
      state.token = null;
      state.user = {};
    },
    clearError(state) {
      state.errors = null;
    },
  },
  getters: {
    isSignedIn: state => !!state.token && !!state.user,
    currentUser: state => state.user,
    getErrors: state => state.errors,
    getToken: state => state.token,
  },
}
