var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: ['bootstrap-loader', './client/index.js'],
  output: { path: __dirname, filename: '/client/bundle.js' },
  devtool: 'source-map',
  plugins: PROD ? [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("./client/style.css", {allChunks: true})
  ] : [new ExtractTextPlugin("./client/style.css", {allChunks: true})],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      // {
      //   test: /\.scss$/,
      //   loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      // },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css!sass')
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.png$/,
        loader: 'url-loader'
      },
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
    ],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  },

};
