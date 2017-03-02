/*

  Webpack 2 Client Config for bundling React components

*/

const path = require('path');

module.exports = {
  // bundle for the browser
  target: 'web',
  cache: true,
  devtool: 'inline-source-map',

  // entry file for client code
  entry: './src/client/index.jsx',

  // output for bundled client code
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'client.bundle.js'
  },

  // the transformations webpack should make before bundling
  module: {
    rules: [
      {
        // only bundle .js and .jsx files
        test: /\.jsx?$/,

        exclude: /node_modules/,

        // use babel loader to transpile ES6+ and JSX to ES5 syntax
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
