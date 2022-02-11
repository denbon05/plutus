import models from '../models';

const { Guest, User } = models;

export const state = () => ({
  accessToken: null,
  refreshToken: null,
  user: new Guest(),
});

export const getters = {
  isAuthenticated(state) {
    return !!state.accessToken;
  },
};

export const mutations = {
  setTokens(state, { accessToken, refreshToken = null }) {
    state.accessToken = accessToken;

    if (refreshToken) {
      state.refreshToken = refreshToken;
    }
  },
  setUser(state, userData) {
    if (userData) state.user = new User(userData);
    else state.user = new Guest();
  },
  logOut(state) {
    state.user.logOut();
    state.accessToken = null;
    state.refreshToken = null;
    state.user = new Guest();
  },
};

export const actions = {
  initUser({ commit }) {
    const userData = JSON.parse(localStorage.getItem('user'));
    commit('setUser', userData);
  },
  async logIn({ commit, dispatch }, { email, password }) {
    const res = await this.$api('auth', 'login', {
      email,
      password,
    });

    commit('setTokens', res);
    await dispatch('fetchUserData');
    return res;
  },
  async register({ commit, dispatch }, { username, password, email }) {
    const res = await this.$api('auth', 'register', {
      username,
      password,
      email,
    });

    commit('setTokens', res);
    await dispatch('fetchUserData');
    return res;
  },
  async fetchUserData({ commit }) {
    const {
      data: { username: name },
    } = await this.$api('auth', 'fetchUserData');

    commit('setUser', { name });
  },
  async refresh({ state, commit }) {
    const res = await this.$api('auth', 'refresh', {
      // ! NOT EXIST
      refreshToken: state.refreshToken,
    });

    commit('setTokens', res);
  },
};
