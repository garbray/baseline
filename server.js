require('babel-register');
const express = require('express');
// const path = require('path');s
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
const bs = browserSync.create();
const port = 8000;
const router = require('./utils/router');

nunjucks.configure(`${__dirname}/src/templates`, {
  autoescape: true,
  express: app,
  watch:true
});

if (isDevelopment) {
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.path,
      writeToDisk: true,
    }),
  );

  // Hot module replacement
  app.use(webpackHotMiddleware(compiler));
}

// output static files
app.use('/', express.static('./dist'));

// app.get('/', (req, res) => {
//   res.render('pages/index.html');
// });
router(app);

app.listen(port, () => {
  console.log('server listen 3000 port'); // eslint-disable-line
});

bs.init({
  proxy: 'http://localhost:8000',
  files: ['./dist/**.*'],
  // port: 8080,
});
