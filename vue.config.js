const path = require('path')

const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/form-generator/'
    : '/',
  pages: {
    index: {
      entry: 'src/views/index/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify
    },
    preview: {
      entry: 'src/views/preview/main.ts',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify
    }
  },
  devServer: {
    overlay: false,
    port: 8000,
    proxy: {
      '/api/v1/tools/pictures': {
        target: 'https://gundam.waimai.vip.sankuai.com', // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        headers: {
          Cookie: '_lxsdk_cuid=182e7907c78c8-0d1b359c2fddd8-1a525635-1ea000-182e7907c7ac8; _lxsdk=182e7907c78c8-0d1b359c2fddd8-1a525635-1ea000-182e7907c7ac8; moa_deviceId=8D45EF564E905FB0A1299FB18529B938; s_u_745896=ngiNGM0lY0wYDnrExAy1Fw==; ta.uuid=1565268326249173090; isUuidUnion=true; iuuid=182e7907c78c8-0d1b359c2fddd8-1a525635-1ea000-182e7907c7ac8; u=1924183764; uu=4d05d570-2cc9-11ed-9cc5-537638b20865; cid=1; ai=1; al=dcfhckpquejhwgkopphclqjzwrlzomrk; lt=sdTiLn1XAivxddoqXGA35z98uY0AAAAADugFAN0BuWd7vS-DNqJUePd3TL3gnZOB4Ka4Go3Y9kCh6Ek9Dh3ypTu8KriGA3-LdyAJcQ; n=GLB261283922; 5ad4f0c49e_ssoid=eAGFzrtKQ0EQgGEWJIRUksrylEkKmZ2d2Z210qMJll4KwUY2Z88p9QUsjJ2VYiNaqQQsAhGLgIJVsLSw8AG8mwdIK4iItf3Pz1dWk-P9J5UcdI_uB4AVDpEKyMjnM0kRREQToYtIUYtHcg3gYPMiANp2-qiq9bW8vZrlm_m2LBA3W2yp6YFbKcxp9L6VamH0qTeSvIyfX2-gpvDfsfyQZkuLD29f5wNYGt4Nb_uwqxqV0vLK_FbMq9X37sXo6uxjr_d52hn1u6PLztREsnN9XK_9xoeq_Ac7UdOeoieDiDawYyeOHLUZBA3HiFY2tLXaERpBFr-e6FiIhiwyNYAy4wSM9mJ0FgJZYP0NN4tkPg**eAEFwYEBwDAEBMCV0keecRD2H6F3Y269I-2dCJ7wW3zQC315RdOVkbVLq-J8oWjs9CkCkvUDQ5cR8A**Z5W0GxogEpWh1COUVRsEGx6RLKggY-ZmzP03Nn0Lve6fw_7Yp63Oy92MzCnKiioHylHvdlCAB_6aBe4I-7Xm4w**MzY3MjA1MixtYXNoaWxlaSzpqazkuJbno4osbWFzaGlsZWlAbWVpdHVhbi5jb20sMSwwMzE3MjU1NiwxNjYzNjU0Mjg1ODQw; webNewUuid=020f9602d0d5bf03898cbb3bf524328d_1663842687339; _lx_utm=utm_term%3D6.53.3%26utm_content%3D000000000000077ED4CDA4B5942598C4D0C50C8BD24530000000000003528446%26utm_source%3D2000%26utm_medium%3Diphone%26utm_campaign%3DAwaimai_eBwaimai_eH0; 42942825_ssoid=eAGFzitLBFEYgGEOyDKYZJJx4u4E-eY7l_mOSUd3MHoJgkXm3KL-AYOryaRYRNMKiyMIyhbd4F8wCBsVLK5TbP4AETHbX16eiM18Hb-x5Lr_cjICjARqgYRyPnEKgNBUJLkUQQeqnE9zwy1xCihUMWZxZ9ObDet3_B4tC9ktpRJdDbIsYDFDrcsiI4m60JySz3pYP0Kb4b9j-gEttFZez54mD7A6fj68uocDlk631taXdp2P4_dB3QwvJ0c3H_1eczto7nqzU8n-6LzT_o1PWfQHu2BzgBC0AnTgpAnASZM1hpsgUXAkt50pxUmgopxzvZW4oCzJyts8DSJDW2ktncwDx5AZm1ffFYllHw**eAENwoERADEEBMCWDhd8OWHov4T87OqqpTurEQqPwFkYG1zdHcmbaqa_lmky6kj7N_SKa4kHCt0QVw**QhWNUxxQl0qi-k4_Mgh9k295gfkeeSjjQ0vR6t7k2z2GxttMLu913SRTwC2FOfXK6bs-QXiNcRIv7zza6OtKfQ**MzY3MjA1MixtYXNoaWxlaSzpqazkuJbno4osbWFzaGlsZWlAbWVpdHVhbi5jb20sMSwwMzE3MjU1NiwxNjY0MzM0ODkzMDk2; logan_session_token=s0sdsn9sl5kdcnzpbbyo; logan_custom_report=%7B%22unionId%22%3A%22mashilei%22%2C%22biz%22%3A%22gundam-config%22%7D; s_m_id_3299326472=AwMAAAA5AgAAAAIAAAE9AAAALNP87heuWcLzWM18JB49xMb1q+cNToRAkHY0p6SAVaGroN1psbDYUxhhQYpNAAAAI4jWzk2pC9Nvb5nlBtcxjywW60y4D5EvC5prZFXnumn2OraT; _lxsdk_s=1837cd336fa-559-82c-b66%7C%7C495'
        }
      },
      '/api/gd/flex': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('@', resolve('./src'))
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
