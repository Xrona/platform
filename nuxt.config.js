require('dotenv').config()

export default {
  head: {
    title: 'Invest',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: 'logged',
  },

  css: ['./assets/styles/main.scss'],

  plugins: [
    '@/plugins/api-client.js',
    '@/plugins/svg-icon.js',
    '@/plugins/vue-mask.js',
    '@/plugins/convert-case.js',
    '@/plugins/load.js',
    '@/plugins/object-to-form-data.js',
    '@/plugins/blob-to-data-url.js',
    '@/plugins/price-format.js',
    '@/plugins/date-format.js',
    '@/plugins/vue-cropper.js',
    // {
    //   src: '@/plugins/yandex-map.js',
    //   mode: 'client',
    // },
  ],

  components: true,
  loading: '~/components/loading-bar.vue',

  buildModules: ['@nuxtjs/dotenv', '@nuxtjs/vuetify', '@nuxtjs/moment'],

  moment: {
    locales: ['ru'],
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js',
    treeShake: true,
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'vue-yandex-maps/nuxt',
      {
        apiKey: 'ca913e0d-396f-41fb-aba4-8537720869c5',
        lang: 'ru_RU',
        version: '2.1',
      },
    ],
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        grantType: 'refresh_token',
        token: {
          property: 'data.access_token.token',
          data: 'access_token',
          maxAge: 1800,
          global: true,
        },
        refreshToken: {
          property: 'data.refresh_token.token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'data',
          autoFetch: false,
        },
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
          },
          user: {
            url: 'user/me',
            method: 'get',
          },
          refresh: {
            url: 'auth/refresh',
            method: 'get',
            tokenRequired: true,
          },
          logout: { url: 'auth/logout', method: 'get' },
        },
      },
    },
  },

  axios: {
    baseURL: process.env.API_DOMAIN,
  },

  build: {},
}
