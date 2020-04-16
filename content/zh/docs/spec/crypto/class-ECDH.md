---
title: '类: ECDH'
linkTitle: 'ECDH'
weight: 7
description: >
  该`ECDH`类是用于创建椭圆曲线的Diffie-Hellman（ECDH）密钥交换的工具。
type: 'docs'
---

<!-- YAML
added: v0.11.14
-->

在`ECDH`类的实例可以使用[`crypto.createECDH()`][]函数创建。

```js
const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// OK
```

## Class Method: `ECDH.convertKey(key, curve[, inputEncoding[, outputEncoding[, format]]])`

<!-- YAML
added: v10.0.0
-->

- `key` {string | Buffer | TypedArray | DataView}
- `curve` {string}
- `inputEncoding` {string} The [encoding][] of the `key` string.
- `outputEncoding` {string} The [encoding][] of the return value.
- `format` {string} **Default:** `'uncompressed'`
- Returns: {Buffer | string}

Converts the EC Diffie-Hellman public key specified by `key` and `curve` to the
format specified by `format`. The `format` argument specifies point encoding
and can be `'compressed'`, `'uncompressed'` or `'hybrid'`. The supplied key is
interpreted using the specified `inputEncoding`, and the returned key is encoded
using the specified `outputEncoding`.

Use [`crypto.getCurves()`][] to obtain a list of available curve names.
On recent OpenSSL releases, `openssl ecparam -list_curves` will also display
the name and description of each available elliptic curve.

If `format` is not specified the point will be returned in `'uncompressed'`
format.

If the `inputEncoding` is not provided, `key` is expected to be a [`Buffer`][],
`TypedArray`, or `DataView`.

Example (uncompressing a key):

```js
const { createECDH, ECDH } = require('crypto');

const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(
  compressedKey,
  'secp256k1',
  'hex',
  'hex',
  'uncompressed',
);

// The converted key and the uncompressed public key should be the same
console.log(uncompressedKey === ecdh.getPublicKey('hex'));
```

## `ecdh.computeSecret(otherPublicKey[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.11.14
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16849
    description: Changed error format to better support invalid public key
                 error
-->

- `otherPublicKey` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the `otherPublicKey` string.
- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Computes the shared secret using `otherPublicKey` as the other
party's public key and returns the computed shared secret. The supplied
key is interpreted using specified `inputEncoding`, and the returned secret
is encoded using the specified `outputEncoding`.
If the `inputEncoding` is not
provided, `otherPublicKey` is expected to be a [`Buffer`][], `TypedArray`, or
`DataView`.

If `outputEncoding` is given a string will be returned; otherwise a
[`Buffer`][] is returned.

`ecdh.computeSecret` will throw an
`ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY` error when `otherPublicKey`
lies outside of the elliptic curve. Since `otherPublicKey` is
usually supplied from a remote user over an insecure network,
its recommended for developers to handle this exception accordingly.

## `ecdh.generateKeys([encoding[, format]])`

<!-- YAML
added: v0.11.14
-->

- `encoding` {string} The [encoding][] of the return value.
- `format` {string} **Default:** `'uncompressed'`
- Returns: {Buffer | string}

Generates private and public EC Diffie-Hellman key values, and returns
the public key in the specified `format` and `encoding`. This key should be
transferred to the other party.

The `format` argument specifies point encoding and can be `'compressed'` or
`'uncompressed'`. If `format` is not specified, the point will be returned in
`'uncompressed'` format.

If `encoding` is provided a string is returned; otherwise a [`Buffer`][]
is returned.

## `ecdh.getPrivateKey([encoding])`

<!-- YAML
added: v0.11.14
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string} The EC Diffie-Hellman in the specified `encoding`.

If `encoding` is specified, a string is returned; otherwise a [`Buffer`][] is
returned.

## `ecdh.getPublicKey([encoding][, format])`

<!-- YAML
added: v0.11.14
-->

- `encoding` {string} The [encoding][] of the return value.
- `format` {string} **Default:** `'uncompressed'`
- Returns: {Buffer | string} The EC Diffie-Hellman public key in the specified
  `encoding` and `format`.

The `format` argument specifies point encoding and can be `'compressed'` or
`'uncompressed'`. If `format` is not specified the point will be returned in
`'uncompressed'` format.

If `encoding` is specified, a string is returned; otherwise a [`Buffer`][] is
returned.

## `ecdh.setPrivateKey(privateKey[, encoding])`

<!-- YAML
added: v0.11.14
-->

- `privateKey` {string | Buffer | TypedArray | DataView}
- `encoding` {string} The [encoding][] of the `privateKey` string.

Sets the EC Diffie-Hellman private key.
If `encoding` is provided, `privateKey` is expected
to be a string; otherwise `privateKey` is expected to be a [`Buffer`][],
`TypedArray`, or `DataView`.

If `privateKey` is not valid for the curve specified when the `ECDH` object was
created, an error is thrown. Upon setting the private key, the associated
public point (key) is also generated and set in the `ECDH` object.

## `ecdh.setPublicKey(publicKey[, encoding])`

<!-- YAML
added: v0.11.14
deprecated: v5.2.0
-->

> Stability: 0 - Deprecated

- `publicKey` {string | Buffer | TypedArray | DataView}
- `encoding` {string} The [encoding][] of the `publicKey` string.

Sets the EC Diffie-Hellman public key.
If `encoding` is provided `publicKey` is expected to
be a string; otherwise a [`Buffer`][], `TypedArray`, or `DataView` is expected.

There is not normally a reason to call this method because `ECDH`
only requires a private key and the other party's public key to compute the
shared secret. Typically either [`ecdh.generateKeys()`][] or
[`ecdh.setPrivateKey()`][] will be called. The [`ecdh.setPrivateKey()`][] method
attempts to generate the public point/key associated with the private key being
set.

Example (obtaining a shared secret):

```js
const crypto = require('crypto');
const alice = crypto.createECDH('secp256k1');
const bob = crypto.createECDH('secp256k1');

// This is a shortcut way of specifying one of Alice's previous private
// keys. It would be unwise to use such a predictable private key in a real
// application.
alice.setPrivateKey(
  crypto.createHash('sha256').update('alice', 'utf8').digest(),
);

// Bob uses a newly generated cryptographically strong
// pseudorandom key pair
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

// aliceSecret and bobSecret should be the same shared secret value
console.log(aliceSecret === bobSecret);
```
