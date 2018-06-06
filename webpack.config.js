const { resolve } = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  let modeVariable = 'production';
  let developmentPlugins = [];

  if (env.development) {
    modeVariable = 'development';
    developmentPlugins = [
      new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin(),
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
        exclude: ['vendor.js'],
      }),
      new CopyWebpackPlugin([
        { from: 'img', to: 'img' },
        { from: 'fonts', to: 'fonts' },
      ], { ignore: ['.DS_Store'] })
    ];
  }

  console.log(`===--Compilation Mode ${modeVariable}--===`); // eslint-disable-line

  return {
    context: resolve('src'),
    entry: [
      'babel-polyfill',
      './js/clientApp.js',
      'webpack-hot-middleware/client',
    ],
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
            { loader: 'style-loader', options: { sourceMap: true } },
            {
              loader: 'css-loader',
              options: { importLoaders: 1, sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './build-scripts/postcss.config.js',
                },
                sourceMap: true,
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
