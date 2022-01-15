module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    semi: [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/attribute-hyphenation': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
