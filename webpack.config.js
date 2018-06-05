const { resolve } = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  let modeVariable = 'production';
  let developmentPlugins = [];

  if (env.development) {
    modeVariable = 'development';
    developmentPlugins = [
      new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin(),
    ];
  }

  console.log(`===--Compilation Mode ${modeVariable}--===`); // eslint-disable-line

  return {
    context: resolve('src'),
    entry: ['babel-polyfill', './js/clientApp.js'],
    output: {
      // path: resolve('dist'),
      filename: '[name].bundle.js',
      publicPath: resolve('dist'),
    },
    stats: { colors: true, reasons: true, chunks: true, errors: true },
    resolve: { extensions: ['.js', '.json'] },
    plugins: [new webpack.HotModuleReplacementPlugin()].concat(
      developmentPlugins,
    ),
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
          loaders: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: { path: './build-scripts/postcss.config.js' },
              },
            },
          ],
          include: resolve('src/css'),
        },
      ],
    },
    optimization: {
      splitChunks: { chunks: 'all', automaticNameDelimiter: '-', name: true },
    },
  };
};
