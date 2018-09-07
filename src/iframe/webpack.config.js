const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
      main: './src/iframe/qlik-integration.js',
  },
  externals: {
      qlik: 'js/qlik',
      requirejs: 'require'
  },
  output: {
    path: path.resolve(__dirname, '../../dist/iframe'),
    filename: 'qlik-integration.js',
    libraryTarget: 'amd',
    library: 'example',
    umdNamedDefine: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'iframe.html',
        template: path.resolve(__dirname, 'qlik-template.html')
    })
  ]
};