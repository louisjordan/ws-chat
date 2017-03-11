/*

  Webpack 2 Client Config for bundling React components

*/

const webpack = require('webpack');
const { join } = require('path');

module.exports = {
  context: join(__dirname, '/src/client'),
  devtool: 'inline-source-map',

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
    path: join(__dirname, '/dist'),
    filename: 'client.bundle.js'
  },

  devServer: {
    // active hot reloading
    hot: true,

    contentBase: join(__dirname, '/dist'),
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
          'postcss-loader'
        ]
      }
    ]
  },

  // plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.optimize.CommonsChunkPlugin({})
  ]
};
