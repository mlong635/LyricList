let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './client/client.js'
  ],
  module: {
    loaders: [{
      test : /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
};


