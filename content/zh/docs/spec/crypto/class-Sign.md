---
title: '类: Sign'
linkTitle: 'Sign'
weight: 11
description: >
  Extends: {stream.Writable}
type: 'docs'
---

<!-- YAML
added: v0.1.92
-->

The `Sign` class is a utility for generating signatures. It can be used in one
of two ways:

- As a writable [stream][], where data to be signed is written and the
  [`sign.sign()`][] method is used to generate and return the signature, or
- Using the [`sign.update()`][] and [`sign.sign()`][] methods to produce the
  signature.

The [`crypto.createSign()`][] method is used to create `Sign` instances.
The argument is the string name of the hash function to use.
`Sign` objects are not to be created directly using the `new` keyword.

Example: Using `Sign` and [`Verify`][] objects as streams:

```js
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'sect239k1',
});

const sign = crypto.createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = crypto.createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// Prints: true
```

Example: Using the [`sign.update()`][] and [`verify.update()`][] methods:

```js
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = crypto.createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey);

const verify = crypto.createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature));
// Prints: true
```

### `sign.sign(privateKey[, outputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: This function now supports RSA-PSS keys.
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: This function now supports key objects.
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11705
    description: Support for RSASSA-PSS and additional options was added.
-->

- `privateKey` {Object | string | Buffer | KeyObject}
  - `dsaEncoding` {string}
  - `padding` {integer}
  - `saltLength` {integer}
- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Calculates the signature on all the data passed through using either
[`sign.update()`][] or [`sign.write()`][stream-writable-write].

If `privateKey` is not a [`KeyObject`][], this function behaves as if
`privateKey` had been passed to [`crypto.createPrivateKey()`][]. If it is an
object, the following additional properties can be passed:

- `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the generated signature. It can be one of the following:
  - `'der'` (default): DER-encoded ASN.1 signature structure encoding `(r, s)`.
  - `'ieee-p1363'`: Signature format `r || s` as proposed in IEEE-P1363.
- `padding` {integer} Optional padding value for RSA, one of the following:

  - `crypto.constants.RSA_PKCS1_PADDING` (default)
  - `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` will use MGF1 with the same hash function
  used to sign the message as specified in section 3.1 of [RFC 4055][], unless
  an MGF1 hash function has been specified as part of the key in compliance with
  section 3.3 of [RFC 4055][].

- `saltLength` {integer} Salt length for when padding is
  `RSA_PKCS1_PSS_PADDING`. The special value
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` sets the salt length to the digest
  size, `crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN` (default) sets it to the
  maximum permissible value.

If `outputEncoding` is provided a string is returned; otherwise a [`Buffer`][]
is returned.

The `Sign` object can not be again used after `sign.sign()` method has been
called. Multiple calls to `sign.sign()` will result in an error being thrown.

### `sign.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`.
-->

- `data` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the `data` string.

Updates the `Sign` content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `encoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a [`Buffer`][], `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.
