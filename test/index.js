var test = require('tap').test;
var equal = require('..');
var fs = require('fs');
var path = require('path');
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

test('stream', function(t) {
  t.plan(3);
  equal(
    fs.createReadStream(fixtures('a')),
    fs.createReadStream(fixtures('a.expected')),
    function (res) {
      t.ok(res);
    }
  );
  equal(
    fs.createReadStream(fixtures('b')),
    fs.createReadStream(fixtures('a.expected')),
    function (res) {
      t.notOk(res);
    }
  );
  equal(
    [fs.createReadStream(fixtures('a')), fs.createReadStream(fixtures('b'))],
    [fs.createReadStream(fixtures('a.expected')), fs.createReadStream(fixtures('b.expected'))],
    function (res) {
      t.ok(res);
    }
  );
});

test('filename', function(t) {
  t.plan(3);
  equal(
    fixtures('a'),
    fixtures('a.expected'),
    function (res) {
      t.ok(res);
    }
  );
  equal(
    fixtures('b'),
    fixtures('a.expected'),
    function (res) {
      t.notOk(res);
    }
  );
  equal(
    [fixtures('a'), fixtures('b')],
    [fixtures('a.expected'), fixtures('b.expected')],
    function (res) {
      t.ok(res);
    }
  );
});

test('contents', function(t) {
  t.plan(1);
  equal.str(
    fs.createReadStream(fixtures('a')),
    fs.readFileSync(fixtures('a.expected'), 'utf8'),
    function (res) {
      t.ok(res);
    }
  );
});

test('mixed', function(t) {
  t.plan(1);
  equal(
    [fixtures('a'), fs.createReadStream(fixtures('b'))],
    [fixtures('a.expected'), fixtures('b.expected')],
    function (res) {
      t.ok(res);
    }
  );
});

