import fs from 'fs';
import webpack from 'webpack';
const path = require("path");

const CAML_FILE = JSON.stringify(
    fs.readFileSync(process.env.CAML_FILE).toString()
);
const base = process.env.BASE || '/';

export default {
  mode: 'universal',
  router: {
    base,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: base+'favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: base+'favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: base+'favicon-32x32.png' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~/common.sass'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
      [
          'nuxt-sass-resources-loader',
          ['~/common.sass']
      ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
        new webpack.DefinePlugin({
            CAML_FILE,
        })
    ],
    extend (config, ctx) {
      config.resolve.alias['~caml-js'] = path.resolve(__dirname, 'github.com/caml-js');
    }
  }
}
