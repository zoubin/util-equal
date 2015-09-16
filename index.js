var fs = require('fs');
var streamEqual = require('./lib/stream');

module.exports = function (actual, expected, done) {
  actual = [].concat(actual).filter(Boolean);
  expected = [].concat(expected).filter(Boolean);
  if (actual.length !== expected.length) {
    return done(false);
  }
  actual = actual.map(convert);
  expected = expected.map(convert);
  if (all(actual, isStream) && all(expected, isStream)) {
    return streamEqual(actual, expected, done);
  }
  done(false);
};

module.exports.str = function (actual, expected, done) {
  actual = [].concat(actual).filter(Boolean);
  expected = [].concat(expected).filter(Boolean);
  if (actual.length !== expected.length) {
    return done(false);
  }
  return streamEqual(actual, expected, done);
};

function isStream(s) {
  return s && typeof s.pipe === 'function';
}

function all(arr, fn) {
  return !arr.some(function (e) {
    return !fn(e);
  });
}

function convert(file) {
  if (typeof file === 'string') {
    return fs.createReadStream(file);
  }
  return file;
}

