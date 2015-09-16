# util-equal
Utils for checking file contents.

Support four cases:

* Streams v.s. Streams.
* Filenames v.s. filenames.
* Streams v.s. filenames.
* Streams v.s. contents.

## Example

```javascript
var equal = require('util-equal');
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

```

outputs:

```
⌘ node example/equal.js
stream v.s. stream true
filename v.s. filename true
stream v.s. filename true
stream v.s. contents true
```

## API

### equal(actual, expected, done)

Check whether file contents are the same.

#### actual, expected

Type: `Stream`, `String`, `Array`

If `Stream`, should flow the file contents.
If `String`, should be the filename.
If `Array`, each element should be `Stream` or `String`.

#### done(res)

If contents equal, `res` will be `true`, otherwise `false`.

### equal.str(actual, expected, done)

The only difference from `equal` is that `String` is treated as file contents rather than filename.

