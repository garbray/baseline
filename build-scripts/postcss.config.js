const pkg = require('../package.json');

module.exports = () => ({
  plugins: [
    // Auto adds defined files to all css files.  i.e. variables and mixins
    // https://www.npmjs.com/package/postcss-prepend-imports
    require('postcss-prepend-imports')({
      path: './src/css',
      files: ['utils/utils.css'],
    }),
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('stylelint')(),
    require('rucksack-css')({ autoprefixer: false }),
    require('postcss-cssnext')(),
    // Allows nested media queries and compresses all breakpoints into one media query per file
    // https://github.com/hail2u/node-css-mqpacker
    require('css-mqpacker')(),
    // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
    // https://github.com/postcss/postcss-custom-media
    require('postcss-custom-media')(),
    // Allows you to nest one style rule inside another
    // https://github.com/jonathantneal/postcss-nesting
    require('postcss-nesting')(),
    // Unwraps nested rules like how Sass does it
    // https://github.com/postcss/postcss-nested
    require('postcss-nested')(),
    // Converts px to rems to allow easy global font adjustments
    // https://github.com/cuth/postcss-pxtorem
    require('postcss-pxtorem')({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0,
    }),
    require('cssnano')({
      preset: 'default',
      autoprefixer: false,
    }),
  ],
});
