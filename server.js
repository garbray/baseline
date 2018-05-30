require('babel-register');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('response');
});

app.listen(3000, () => {
  console.log('server listen 3000 port');
});
