var transformTools = require('browserify-transform-tools');
var cheerio = require('cheerio');

var options = {
  includeExtensions: [ '.svg' ],
};

module.exports = transformTools.makeStringTransform('svg-jsonify', options, transform);

function transform(content, transformOptions, done) {
  var $ = cheerio.load(content, {
    normalizeWhitespace: true,
    xmlMode: true,
  });

  var svg = $('svg');

  var viewBox = svg.attr('viewBox');
  var rawContent = svg.html().trim();

  var result = {
    viewBox: viewBox,
    rawContent: rawContent,
  };

  var transformed = 'module.exports=' + JSON.stringify(result);

  done(null, transformed);
}
