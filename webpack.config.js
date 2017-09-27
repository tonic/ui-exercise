const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },

  devServer: {
    hot: true,
    open: true
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'UI Exercise'
    })
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};
