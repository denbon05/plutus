export const state = () => ({
  accessToken: null,
  refreshToken: null,
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
  setUser(state, user) {
    state.user = user;
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
    await dispatch('getUser');
  },
  async register({ commit, dispatch }, { username, password }) {
    const res = await this.$api('auth', 'register', {
      username,
      password,
    });
    console.log('actions.register res=>', res);

    commit('setTokens', res);
    await dispatch('getUser');
    return res;
  },
  async getUser({ commit }) {
    const res = await this.$api('auth', 'user');
    console.log('getUser res=>', res);

    commit('setUser', res);
  },
  async refresh({ state, commit }) {
    const res = await this.$api('auth', 'refresh', {
      // ! NOT EXIST
      refreshToken: state.refreshToken,
    });

    commit('setTokens', res);
  },
};
