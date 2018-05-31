const { resolve } = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  let modeVariable = 'production';
  console.log(env);
  if (env.development) {
    modeVariable = 'development';
  }

  return {
    context: resolve('src'),
    entry: ['babel-polyfill', './js/clientApp.js'],
    output: { path: resolve('dist'), filename: '[name].bundle.js' },
    stats: { colors: true, reasons: true, chunks: true, errors: true },
    resolve: { extensions: ['.js', '.json'] },
    plugins: [
      // new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    mode: modeVariable,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
        { test: /\.js/, loader: 'babel-loader', include: resolve('src/js') },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css'],
          include: resolve('src/css')
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  };
};
