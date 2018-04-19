const webpackValidator = require('webpack-validator');
const {resolve} = require('path');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config =  webpackValidator({
    context: resolve('src'),
    entry: './bootstrap.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/dist/',
      pathinfo: ifNotProd(), // Gives you the name of required file.
    },
    devtool: ifProd('source-map', 'eval'), // source-map for production & eval for development mode
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
        },
      ],
    },
  });
  if (env.debug) {
    console.log(config);
    debugger;
  }
  return config;
};