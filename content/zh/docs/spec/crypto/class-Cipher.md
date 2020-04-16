---
title: '类: Cipher'
linkTitle: 'Cipher'
weight: 3
description: >
  扩展: [<stream.Transform>](https://nodejs.org/api/stream.html#stream_class_stream_transform)
type: 'docs'
---

<!-- YAML
added: v0.1.94
-->

Instances of the `Cipher` class are used to encrypt data. The class can be
used in one of two ways:

- As a [stream][] that is both readable and writable, where plain unencrypted
  data is written to produce encrypted data on the readable side, or
- Using the [`cipher.update()`][] and [`cipher.final()`][] methods to produce
  the encrypted data.

The [`crypto.createCipher()`][] or [`crypto.createCipheriv()`][] methods are
used to create `Cipher` instances. `Cipher` objects are not to be created
directly using the `new` keyword.

Example: Using `Cipher` objects as streams:

```js
const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
// Use async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encrypted = '';
cipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = cipher.read())) {
    encrypted += chunk.toString('hex');
  }
});
cipher.on('end', () => {
  console.log(encrypted);
  // Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
});

cipher.write('some clear text data');
cipher.end();
```

Example: Using `Cipher` and piped streams:

```js
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes()` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const cipher = crypto.createCipheriv(algorithm, key, iv);

const input = fs.createReadStream('test.js');
const output = fs.createWriteStream('test.enc');

input.pipe(cipher).pipe(output);
```

Example: Using the [`cipher.update()`][] and [`cipher.final()`][] methods:

```js
const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
// Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
```

## `cipher.final([outputEncoding])`

<!-- YAML
added: v0.1.94
-->

- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string} Any remaining enciphered contents.
  If `outputEncoding` is specified, a string is
  returned. If an `outputEncoding` is not provided, a [`Buffer`][] is returned.

Once the `cipher.final()` method has been called, the `Cipher` object can no
longer be used to encrypt data. Attempts to call `cipher.final()` more than
once will result in an error being thrown.

## `cipher.setAAD(buffer[, options])`

<!-- YAML
added: v1.0.0
-->

- `buffer` {Buffer | TypedArray | DataView}
- `options` {Object} [`stream.transform` options][]
  - `plaintextLength` {number}
- Returns: {Cipher} for method chaining.

When using an authenticated encryption mode (`GCM`, `CCM` and `OCB` are
currently supported), the `cipher.setAAD()` method sets the value used for the
_additional authenticated data_ (AAD) input parameter.

The `options` argument is optional for `GCM` and `OCB`. When using `CCM`, the
`plaintextLength` option must be specified and its value must match the length
of the plaintext in bytes. See [CCM mode][].

The `cipher.setAAD()` method must be called before [`cipher.update()`][].

## `cipher.getAuthTag()`

<!-- YAML
added: v1.0.0
-->

- Returns: {Buffer} When using an authenticated encryption mode (`GCM`, `CCM`
  and `OCB` are currently supported), the `cipher.getAuthTag()` method returns a
  [`Buffer`][] containing the _authentication tag_ that has been computed from
  the given data.

The `cipher.getAuthTag()` method should only be called after encryption has
been completed using the [`cipher.final()`][] method.

## `cipher.setAutoPadding([autoPadding])`

<!-- YAML
added: v0.7.1
-->

- `autoPadding` {boolean} **Default:** `true`
- Returns: {Cipher} for method chaining.

When using block encryption algorithms, the `Cipher` class will automatically
add padding to the input data to the appropriate block size. To disable the
default padding call `cipher.setAutoPadding(false)`.

When `autoPadding` is `false`, the length of the entire input data must be a
multiple of the cipher's block size or [`cipher.final()`][] will throw an error.
Disabling automatic padding is useful for non-standard padding, for instance
using `0x0` instead of PKCS padding.

The `cipher.setAutoPadding()` method must be called before
[`cipher.final()`][].

## `cipher.update(data[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.1.94
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`.
-->

- `data` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the data.
- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Updates the cipher with `data`. If the `inputEncoding` argument is given,
the `data`
argument is a string using the specified encoding. If the `inputEncoding`
argument is not given, `data` must be a [`Buffer`][], `TypedArray`, or
`DataView`. If `data` is a [`Buffer`][], `TypedArray`, or `DataView`, then
`inputEncoding` is ignored.

The `outputEncoding` specifies the output format of the enciphered
data. If the `outputEncoding`
is specified, a string using the specified encoding is returned. If no
`outputEncoding` is provided, a [`Buffer`][] is returned.

The `cipher.update()` method can be called multiple times with new data until
[`cipher.final()`][] is called. Calling `cipher.update()` after
[`cipher.final()`][] will result in an error being thrown.

[stream]: stream.html
[`cipher.update()`]: #crypto_cipher_update_data_inputencoding_outputencoding
[`cipher.final()`]: #crypto_cipher_final_outputencoding
[`crypto.createcipher()`]: #crypto_crypto_createcipher_algorithm_password_options
[`crypto.createcipheriv()`]: #crypto_crypto_createcipheriv_algorithm_key_iv_options
