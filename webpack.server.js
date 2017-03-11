/*

  Webpack 2 Client Config for bundling server files

*/

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { join } = require('path');

module.exports = {
  context: join(__dirname, '/src/server'),
  devtool: 'inline-source-map',
  cache: true,
  target: 'node',
  watch: true,

  // server entry point (context is ./src/server)
  entry: './index.js',

  // output for bundled server code
  output: {
    path: join(__dirname, '/dist'),
    filename: 'server.bundle.js'
  },

  // the transformations webpack should make before bundling
  module: {
    rules: [
      {
        // transform js files
        test: /\.js?$/,

        exclude: /node_modules/,

        // use babel loader to transpile ES6+ and JSX to ES5 syntax
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },

  // no need to bundle server modules, just reference them
  externals: [nodeExternals()],

  // plugins
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   output: {
    //     comments: false
    //   },
    //   compressor: {
    //     warnings: false
    //   }
    // })
    // new webpack.optimize.CommonsChunkPlugin({})
  ],

  node: {
    __dirname: true
  }
};
