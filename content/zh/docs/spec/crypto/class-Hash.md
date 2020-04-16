---
title: '类: Hash'
linkTitle: 'Hash'
weight: 8
description: >
  Extends: {stream.Transform}
type: 'docs'
---

<!-- YAML
added: v0.1.92
-->

The `Hash` class is a utility for creating hash digests of data. It can be
used in one of two ways:

- As a [stream][] that is both readable and writable, where data is written
  to produce a computed hash digest on the readable side, or
- Using the [`hash.update()`][] and [`hash.digest()`][] methods to produce the
  computed hash.

The [`crypto.createHash()`][] method is used to create `Hash` instances.
`Hash` objects are not to be created directly using the `new` keyword.

Example: Using `Hash` objects as streams:

```js
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hash.read();
  if (data) {
    console.log(data.toString('hex'));
    // Prints:
    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  }
});

hash.write('some data to hash');
hash.end();
```

Example: Using `Hash` and piped streams:

```js
const crypto = require('crypto');
const fs = require('fs');
const hash = crypto.createHash('sha256');

const input = fs.createReadStream('test.js');
input.pipe(hash).pipe(process.stdout);
```

Example: Using the [`hash.update()`][] and [`hash.digest()`][] methods:

```js
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// Prints:
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```

## `hash.copy([options])`

<!-- YAML
added: v13.1.0
-->

- `options` {Object} [`stream.transform` options][]
- Returns: {Hash}

Creates a new `Hash` object that contains a deep copy of the internal state
of the current `Hash` object.

The optional `options` argument controls stream behavior. For XOF hash
functions such as `'shake256'`, the `outputLength` option can be used to
specify the desired output length in bytes.

An error is thrown when an attempt is made to copy the `Hash` object after
its [`hash.digest()`][] method has been called.

```js
// Calculate a rolling hash.
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// Etc.
```

## `hash.digest([encoding])`

<!-- YAML
added: v0.1.92
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Calculates the digest of all of the data passed to be hashed (using the
[`hash.update()`][] method).
If `encoding` is provided a string will be returned; otherwise
a [`Buffer`][] is returned.

The `Hash` object can not be used again after `hash.digest()` method has been
called. Multiple calls will cause an error to be thrown.

## `hash.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`.
-->

- `data` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the `data` string.

Updates the hash content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `encoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a [`Buffer`][], `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.
