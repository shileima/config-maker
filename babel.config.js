module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // vue-property-decorator 配置
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // end vue-property-decorator 配置
  ]
}
