require('babel-register');
const express = require('express');
const webpack = require('webpack');
const nunjucks = require('nunjucks');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const webpackConfig = require('./webpack.config')({ prod: true });
const port = 3000;

nunjucks.configure(`${__dirname}/src/templates`,{
  autoescape:true,
  express:app
});

const compiler = webpack(webpackConfig); // eslint-disable-line

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.path,
  }),
);

// Hot module replacement
app.use(webpackHotMiddleware(compiler));
// output static files
app.use('/dist', express.static('./dist'));

app.get('/', (req, res) => {
  res.render('pages/index.html');
});

app.listen(port, () => {
  console.log('server listen 3000 port');
});
