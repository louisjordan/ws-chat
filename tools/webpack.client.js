/*

  Webpack 2 Client Config for bundling React components

*/

const webpack = require('webpack');
const { resolve } = require('path');

const environment = process.env && process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
  context: resolve(__dirname, '../src/client'),
  devtool: 'inline-source-map',
  cache: true,

  // entry file for client code
  entry: [

    // hot module replacement for React
    'react-hot-loader/patch',

    // bundle for dev webserver
    'webpack-dev-server/client?http://localhost:8080',

    // bundle client for hot reloading
    'webpack/hot/only-dev-server',

    // app entry point (context is ./src/client)
    './index.jsx'
  ],

  // output for bundled client code
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'client.bundle.js'
  },

  devServer: {
    // active hot reloading
    hot: true,

    contentBase: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  // the transformations webpack should make before bundling
  module: {
    rules: [
      {
        // transfrom js and jsx files
        test: /\.jsx?$/,

        exclude: /node_modules/,

        // use babel loader to transpile ES6+ and JSX to ES5 syntax
        loader: 'babel-loader'
      },
      {
        // bundle css modules
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [require('autoprefixer')] }
          }
        ],
      }
    ]
  },

  // plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
    // new webpack.optimize.CommonsChunkPlugin({})
  ]
};
