require('babel-register');
const express = require('express');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const nunjucks = require('nunjucks');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const webpackConfig = require('./webpack.config')({
  development: isDevelopment,
});
const port = 3000;

nunjucks.configure(`${__dirname}/src/templates`, {
  autoescape: true,
  express: app,
});

const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.path,
  }),
);

// Hot module replacement
app.use(webpackHotMiddleware(compiler));
// output static files
app.use('/', express.static('./dist'));

app.get('/', (req, res) => {
  res.render('pages/index.html');
});

browserSync.init(null, {
  proxy: 'http://localhost:3000',
  files: ['src/**/*.*'],
  port: 7000,
});

app.listen(port, () => {
  console.log('server listen 3000 port'); // eslint-disable-line
});
