module.exports = app => {
  // Index Page
  app.get('/', (req, res) => {
    res.render('pages/index.html');
  });
  // Colors Page
  app.get('/colors', (req, res) => {
    res.render('pages/sg-colors.html');
  });
  // Colors Page
  app.get('/grid', (req, res) => {
    res.render('pages/sg-grid.html');
  });
  // Typography
  app.get('/typography', (req, res) => {
    res.render('pages/sg-typography.html');
  });
};
