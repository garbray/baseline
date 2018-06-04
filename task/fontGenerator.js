// require install brew install fontforge
const fs = require('fs');
const path = require('path');
const fontfacegen = require('fontfacegen'); // eslint-disable-line

const fontSrc = ['src/fonts/'];
const fontDst = ['src/fonts/'];

// function generate all fonts required for webdevelopment
function generateFontFaces(fontsList, fontSource, dest) {
  for (let i = fontsList.length - 1; i >= 0; i -= 1) {
    const font = fontsList[i];
    const extension = path.extname(font);

    // Test with embedded ttf
    if (extension === '.ttf' || extension === '.otf') {
      fontfacegen({
        source: path.join(fontSource, font),
        dest,
        collate: false,
      });
    }
  }
}

// read the fontsrc and fontdst arrays
for (let i = 0, len = fontSrc.length; i < len; i += 1) {
  const fonts = fs.readdirSync(fontSrc[i]);
  generateFontFaces(fonts, fontSrc[i], fontDst[i]);
}
