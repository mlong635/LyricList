
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/client.js')
  ],
  output: {
    path: path.resolve(__dirname + 'dist/'),
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  target: 'web'
}


// let webpack = require('webpack');
// let HtmlWebpackPlugin = require('html-webpack-plugin');
// let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

// module.exports = {
//   entry: [
//     './client/client.js'
//   ],
//   module: {
//     loaders: [
//       {
//         test : /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: "babel-loader"
//       },
//       {
//         test: /\.css$/,
//         loader: "style-loader!css-loader"
//       }
//     ]
//   },
//   output: {
//     filename: "index_bundle.js",
//     path: __dirname + '/dist'
//   },
//   plugins: [HTMLWebpackPluginConfig]
// };


