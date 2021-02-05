import { http } from '../../http'

export default {
  state: {
    message: null,
    status: null,
    token: null,
    user: null,
    error: null,
  },
  actions: {
    async signIn({commit}, user) {
      commit('authRequest');
      try {
        var { data } = await http.post('/sessions', user);
      } catch(error) {
        commit('authError', error.response.data.errorMessage);
        localStorage.removeItem('token');
        return;
      }
      if (data && data.auth) {
        const { token, user } = data;
        localStorage.setItem('user', user);
        http.defaults.headers.common['x-access-token'] = token;
        commit('authSuccess', { token, user });
        return data;
      }
      commit('authError', data.errorMessage);
      return;
    },
    async signUp({commit}, user) {
      commit('authRequest');
      try {
        var { data } = await http.post('/users', user);
      } catch(error) {
        commit('authError', error.response.data.errorMessage);
        localStorage.removeItem('token');
        return;
      }
      if (data && data.auth) {
        const { token, user } = data;
        localStorage.setItem('user', user);
        http.defaults.headers.common['x-access-token'] = token;
        commit('authSuccess', { token, user });
        return data;
      }
      commit('authError', data.errorMessage);
      return;
    },
    async signOut({commit, state}) {
      await http.delete('/sessions', { token: state.token })
      commit('signOut');
      localStorage.removeItem('token');
      delete http.defaults.headers.common['x-access-token'];
      return;
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
    authError(state, { error }) {
      state.status = 'error'
      state.error = error;
    },
    signOut(state) {
      state.status = null;
      state.token = null;
      state.user = {};
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.user,
    error: state => state.error,
  },
}
