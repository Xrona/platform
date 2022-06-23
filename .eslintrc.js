module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  ignorePatterns: ['*.yml', '*.prod.yml', '*.dev.yml', '*.override.yml'],
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 'off',
  },
}
