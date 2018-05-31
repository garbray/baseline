const { resolve } = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  // if (env) {
  //   // do something based on the env
  //   console.log(env); // eslint-disable-line
  // }

  return {
    context: resolve('src'),
    entry: ['babel-polyfill', './js/clientApp.js'],
    output: { path: resolve('dist'), filename: '[name].bundle.js' },
    devtool: 'cheap-eval-source-map',
    stats: { colors: true, reasons: true, chunks: true, errors: true },
    resolve: { extensions: ['.js', '.json'] },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin(),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
        { test: /\.js/, loader: 'babel-loader', include: resolve('src/js') },
      ],
    },
  };
};
