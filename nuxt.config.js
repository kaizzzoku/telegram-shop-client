import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - telegram-shop-client',
    title: 'telegram-shop-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/repositories.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  axios: {
    baseURL: process.env.API_URL,
    storageURL: process.env.STORAGE_URL,
  },

  toast: {
    position: 'bottom-center',
    duration: 2000,
    action : {
      text: 'x',
      onClick : (e, toastObject) => {
        toastObject.goAway(0);
      },
      class: ['text-white'],
    },
  },

  auth: {
    redirect: {
      login: '/admin/auth/login',
      logout: '/admin/auth/login',
      home: '/'
    },

    strategies: {
      admin: {
        provider: 'laravel/jwt',
        url: process.env.API_URL,
        endpoints: {
          login: {url: 'admin/auth/login', method: 'post', propertyName: 'access_token'},
          user: {url: 'admin/auth/me', method: 'get', propertyName: 'user'},
          logout: {url: 'admin/auth/logout', method: 'post'},
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      }
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
