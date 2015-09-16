var sink = require('sink-transform');

module.exports = function (ss1, ss2, done) {
  arrEqual(ss1, ss2, 0, done);
};

function arrEqual(ss1, ss2, i, done) {
  if (i >= ss1.length) {
    return done(true);
  }
  equal(ss1[i], ss2[i], function (res) {
    if (!res) {
      return done(false);
    }
    arrEqual(ss1, ss2, ++i, done);
  });
}

function equal(s1, s2, done) {
  if (typeof s1 === 'string' && typeof s2 === 'string') {
    return done(s1 === s2);
  }
  if (typeof s1 === 'string') {
    return s2.pipe(sink.str(function (str2) {
      done(s1 === str2);
    }));
  }
  if (typeof s2 === 'string') {
    return s1.pipe(sink.str(function (str1) {
      done(s2 === str1);
    }));
  }
  s1.pipe(sink.str(function (str1) {
    s2.pipe(sink.str(function (str2) {
      done(str1 === str2);
    }));
  }));
}

