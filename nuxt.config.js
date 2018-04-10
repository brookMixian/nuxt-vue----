module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'brook'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/logo_header.ico'}
    ],
    script: [
      {src: '/js/jquery.min.js'},
      {src: '/js/md2.0.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#3B8070',
    duration: 5000
  },
  /*
  ** Build configuration
  */
  plugins: ['~plugins/element-ui.js', {src: '~plugins/vueQuillEditor.js', ssr: false}],
  css: [
    'element-ui/lib/theme-default/index.css',
    '~assets/public.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      // if (ctx.dev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    },
    vendor: ['axios', 'element-ui']
  }
  // modules: [
  //   '@nuxtjs/axios',
  //   '@nuxtjs/proxy'
  // ],
  // axios: {
  //   // baseURL: 'http://localhost:3000',
  //   credentials: false,
  //   proxyHeaders: false
  // },
  // proxy: [
  //   ['/user', {target: 'http://192.168.152.132:8088/tfs-forums'}],
  //   ['/index', {target: 'http://192.168.152.132:8088/tfs-forums'}],
  //   ['/postComment', {target: 'http://192.168.152.132:8088/tfs-forums'}],
  //   ['/post', {target: 'http://192.168.152.132:8088/tfs-forums'}],
  //   ['/collect', {target: 'http://192.168.152.132:8088/tfs-forums'}],
  //   ['/postViewLog', {target: 'http://192.168.152.132:8088/tfs-forums'}]
  // ]
}
