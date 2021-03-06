import url from 'url';
import { ProvidePlugin } from 'webpack';
import messages from './locales';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Plutus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Budget planner app',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/lucky_coin.png' }],
  },

  vueMeta: {
    // ? Probably increase netwroking
    debounceWait: 250,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['bulma', '~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api-context.client.js',
    '~/plugins/api-context.server.js',
    './plugins/vuex-persistedstate',
    './plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
    [
      'nuxt-rollbar-module',
      {
        serverAccessToken: '1d0346d0b6b747108e6d895e2a3bf334',
        clientAccessToken: '76a0f9e777904d789089de7099f759d2',
        config: {
          captureUncaught: true,
          captureUnhandledRejections: true,
          payload: {
            environment: process.env.NODE_ENV || 'development',
          },
        },
      },
    ],
  ],

  i18n: {
    locales: ['en', 'ru', 'pl'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'pl',
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    maxChunkSize: 300000,
    watch: ['~/api/**'],
    watchOptions: {
      ignored: ['test/**'],
    },
    plugins: [
      new ProvidePlugin({
        _: 'lodash',
      }),
    ],
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
    },
  },

  serverMiddleware: [
    { path: '/api', handler: require('body-parser').json() },
    {
      path: '/api',
      handler: (req, _res, next) => {
        // eslint-disable-next-line node/no-deprecated-api
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      },
    },
    { path: '/api', handler: '~/serverMiddleware/api-server.js' },
  ],
};
