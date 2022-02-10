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
    console.log('setTokens tokens=>', { accessToken, refreshToken });
    state.accessToken = accessToken;

    if (refreshToken) {
      state.refreshToken = refreshToken;
    }
  },
  setUser(state, userData) {
    state.user = new User(userData);
    state.user.setDataToLocalStorage();
  },
  logout(state) {
    state.accessToken = null;
    state.refreshToken = null;
    state.user = null;
  },
};

export const actions = {
  async login({ commit, dispatch }, { username, password }) {
    const res = await this.$api('auth', 'login', {
      username,
      password,
    });

    commit('setTokens', res);
    await dispatch('fetchUserData');
  },
  async register({ commit, dispatch }, { username, password, email }) {
    const res = await this.$api('auth', 'register', {
      username,
      password,
      email,
    });
    console.log('actions.register res=>', res);

    commit('setTokens', res);
    await dispatch('fetchUserData', res);
    return res;
  },
  async fetchUserData({ commit }, { id }) {
    const { data } = await this.$api('auth', 'fetchUserData', { id });
    console.log('fetchUserData res.data=>', data);

    commit('setUser', data);
  },
  async refresh({ state, commit }) {
    const res = await this.$api('auth', 'refresh', {
      // ! NOT EXIST
      refreshToken: state.refreshToken,
    });

    commit('setTokens', res);
  },
};
