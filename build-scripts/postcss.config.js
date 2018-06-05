const pkg = require('../package.json');

module.exports = () => ({
  plugins: [
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require('postcss-import')(),
    require('postcss-cssnext')(),
    // Allows nested media queries and compresses all breakpoints into one media query per file
    // https://github.com/hail2u/node-css-mqpacker
    require('css-mqpacker')(),
    // Add vendor prefixes to CSS rules using values from caniuse.com
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      browsers: pkg.browserslist,
      flexbox: 'no-2009',
    }),
  ],
});
