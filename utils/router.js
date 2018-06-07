module.exports = app => {
  // Index Page
  app.get('/', (req, res) => {
    res.render('pages/index.html');
  });
  // Colors Page
  app.get('/colors', (req, res) => {
    res.render('pages/sg-colors.html');
  })
}
