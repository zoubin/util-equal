var equal = require('..');
var fs = require('fs');
var path = require('path');
var filename = path.join(__dirname, 'source');
var expected = path.join(__dirname, 'source.expected');

equal(
  fs.createReadStream(filename),
  fs.createReadStream(expected),
  function (res) {
    console.log('stream v.s. stream', res);
  }
);

equal(
  filename,
  expected,
  function (res) {
    console.log('filename v.s. filename', res);
  }
);

equal(
  fs.createReadStream(filename),
  expected,
  function (res) {
    console.log('stream v.s. filename', res);
  }
);

equal.str(
  fs.createReadStream(filename),
  fs.readFileSync(expected, 'utf8'),
  function (res) {
    console.log('stream v.s. contents', res);
  }
);

