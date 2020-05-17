// const pkg = require('./package')

const { CDN_PATH, IS_DEV } = require('./config.js');

module.exports = {
  mode: 'universal',

  server: {
    port: 2020, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // render: {
  //   csp: true
  // },

  /*
   ** Headers of the page
   */
  head: {
    title: '珍珠草在线工具大全',
    titleTemplate: '%s | 珍珠草在线工具大全',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'cleartype',
        content: 'on'
      },
      {
        'http-equiv': 'Cache-Control'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: '珍珠草工具大全'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '工具大全'
      },
      {
        name: 'author',
        content: 'zzcit@qq.com'
      }
    ],

    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'dns-prefetch',
        href: '//api.zzcit.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//static.zzcit.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//cdn.zzcit.com'
      },
      {
        rel: 'dns-prefetch',
        href: '//www.google-analytics.com'
      }
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://static.zzcit.com/intersection-polyfill.js'
      }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#20A0FF'
  },

  /*
   ** Global CSS
   */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    'highlight.js/styles/github.css',
    { src: 'element-ui/lib/theme-chalk/index.css' }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/marked.js'
    },
    {
      src: '~/plugins/highlight.js'
    },
    {
      src: '~/plugins/gravatar.js'
    },
    {
      src: '~/plugins/clickOutside.js',
      ssr: false
    },
    {
      src: '~/plugins/progress-image.js',
      ssr: false
    },
    {
      src: '~/plugins/ga.js',
      ssr: false
    },
    {
      src: '~/plugins/copy.js',
      ssr: false
    },
    {
      src: '~/plugins/baidu-seo-push.js',
      ssr: false
    },
    {
      src: '~/plugins/filter.js'
    },
    {
      src: '~/plugins/finally.js'
    },
    {
      src: '~plugins/element-ui',
      ssr: false
    }

  ],
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],
  styleResources: {
    scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    /*此处要加vendor*/
    vendor: ['element-ui'],
    // publicPath: IS_DEV ? '' : CDN_PATH,
    // extractCSS: true,
    extend (config, ctx) {
      // ..
    },
    babel: {
      presets ({ isServer }) {
        return [['@nuxtjs/babel-preset-app', { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }]];
      }
    }
  }
};
