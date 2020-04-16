---
title: '类: Decipher'
linkTitle: 'Decipher'
weight: 4
description: >
  扩展: {stream.Transform}
type: 'docs'
---

<!-- YAML
added: v0.1.94
-->

Instances of the `Decipher` class are used to decrypt data.
The class can be used in one of two ways:

- As a [stream][] that is both readable and writable, where plain encrypted
  data is written to produce unencrypted data on the readable side, or
- Using the [`decipher.update()`][] and [`decipher.final()`][] methods to
  produce the unencrypted data.

The [`crypto.createDecipher()`][] or [`crypto.createDecipheriv()`][] methods are
used to create `Decipher` instances. `Decipher` objects are not to be created
directly using the `new` keyword.

Example: Using `Decipher` objects as streams:

```js
const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = crypto.createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

// Encrypted with same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

Example: Using `Decipher` and piped streams:

```js
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = crypto.createDecipheriv(algorithm, key, iv);

const input = fs.createReadStream('test.enc');
const output = fs.createWriteStream('test.js');

input.pipe(decipher).pipe(output);
```

Example: Using the [`decipher.update()`][] and [`decipher.final()`][] methods:

```js
const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = crypto.createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// Prints: some clear text data
```

## `decipher.final([outputEncoding])`

<!-- YAML
added: v0.1.94
-->

- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string} Any remaining deciphered contents.
  If `outputEncoding` is specified, a string is
  returned. If an `outputEncoding` is not provided, a [`Buffer`][] is returned.

Once the `decipher.final()` method has been called, the `Decipher` object can
no longer be used to decrypt data. Attempts to call `decipher.final()` more
than once will result in an error being thrown.

## `decipher.setAAD(buffer[, options])`

<!-- YAML
added: v1.0.0
changes:
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9398
    description: This method now returns a reference to `decipher`.
-->

- `buffer` {Buffer | TypedArray | DataView}
- `options` {Object} [`stream.transform` options][]
  - `plaintextLength` {number}
- Returns: {Decipher} for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM` and `OCB` are
currently supported), the `decipher.setAAD()` method sets the value used for the
_additional authenticated data_ (AAD) input parameter.

The `options` argument is optional for `GCM`. When using `CCM`, the
`plaintextLength` option must be specified and its value must match the length
of the plaintext in bytes. See [CCM mode][].

The `decipher.setAAD()` method must be called before [`decipher.update()`][].

## `decipher.setAuthTag(buffer)`

<!-- YAML
added: v1.0.0
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/17825
    description: This method now throws if the GCM tag length is invalid.
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9398
    description: This method now returns a reference to `decipher`.
-->

- `buffer` {Buffer | TypedArray | DataView}
- Returns: {Decipher} for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM` and `OCB` are
currently supported), the `decipher.setAuthTag()` method is used to pass in the
received _authentication tag_. If no tag is provided, or if the cipher text
has been tampered with, [`decipher.final()`][] will throw, indicating that the
cipher text should be discarded due to failed authentication. If the tag length
is invalid according to [NIST SP 800-38D][] or does not match the value of the
`authTagLength` option, `decipher.setAuthTag()` will throw an error.

The `decipher.setAuthTag()` method must be called before
[`decipher.final()`][] and can only be called once.

## `decipher.setAutoPadding([autoPadding])`

<!-- YAML
added: v0.7.1
-->

- `autoPadding` {boolean} **Default:** `true`
- Returns: {Decipher} for method chaining.

When data has been encrypted without standard block padding, calling
`decipher.setAutoPadding(false)` will disable automatic padding to prevent
[`decipher.final()`][] from checking for and removing padding.

Turning auto padding off will only work if the input data's length is a
multiple of the ciphers block size.

The `decipher.setAutoPadding()` method must be called before
[`decipher.final()`][].

## `decipher.update(data[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.1.94
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`.
-->

- `data` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the `data` string.
- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Updates the decipher with `data`. If the `inputEncoding` argument is given,
the `data`
argument is a string using the specified encoding. If the `inputEncoding`
argument is not given, `data` must be a [`Buffer`][]. If `data` is a
[`Buffer`][] then `inputEncoding` is ignored.

The `outputEncoding` specifies the output format of the enciphered
data. If the `outputEncoding`
is specified, a string using the specified encoding is returned. If no
`outputEncoding` is provided, a [`Buffer`][] is returned.

The `decipher.update()` method can be called multiple times with new data until
[`decipher.final()`][] is called. Calling `decipher.update()` after
[`decipher.final()`][] will result in an error being thrown.
