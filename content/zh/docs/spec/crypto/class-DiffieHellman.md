---
title: '类: DiffieHellman'
linkTitle: 'DiffieHellman'
weight: 5
description: >
  该`DiffieHellman`类是用于创建Diffie-Hellman密钥交换的工具。
type: 'docs'
---

<!-- YAML
added: v0.5.0
-->

在`DiffieHellman`类的实例可以使用[`crypto.createDiffieHellman()`][]函数创建。

```js
const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
```

## `diffieHellman.computeSecret(otherPublicKey[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.5.0
-->

- `otherPublicKey` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of an `otherPublicKey` string.
- `outputEncoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Computes the shared secret using `otherPublicKey` as the other
party's public key and returns the computed shared secret. The supplied
key is interpreted using the specified `inputEncoding`, and secret is
encoded using specified `outputEncoding`.
If the `inputEncoding` is not
provided, `otherPublicKey` is expected to be a [`Buffer`][],
`TypedArray`, or `DataView`.

If `outputEncoding` is given a string is returned; otherwise, a
[`Buffer`][] is returned.

## `diffieHellman.generateKeys([encoding])`

<!-- YAML
added: v0.5.0
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Generates private and public Diffie-Hellman key values, and returns
the public key in the specified `encoding`. This key should be
transferred to the other party.
If `encoding` is provided a string is returned; otherwise a
[`Buffer`][] is returned.

## `diffieHellman.getGenerator([encoding])`

<!-- YAML
added: v0.5.0
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Returns the Diffie-Hellman generator in the specified `encoding`.
If `encoding` is provided a string is
returned; otherwise a [`Buffer`][] is returned.

## `diffieHellman.getPrime([encoding])`

<!-- YAML
added: v0.5.0
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Returns the Diffie-Hellman prime in the specified `encoding`.
If `encoding` is provided a string is
returned; otherwise a [`Buffer`][] is returned.

## `diffieHellman.getPrivateKey([encoding])`

<!-- YAML
added: v0.5.0
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Returns the Diffie-Hellman private key in the specified `encoding`.
If `encoding` is provided a
string is returned; otherwise a [`Buffer`][] is returned.

## `diffieHellman.getPublicKey([encoding])`

<!-- YAML
added: v0.5.0
-->

- `encoding` {string} The [encoding][] of the return value.
- Returns: {Buffer | string}

Returns the Diffie-Hellman public key in the specified `encoding`.
If `encoding` is provided a
string is returned; otherwise a [`Buffer`][] is returned.

## `diffieHellman.setPrivateKey(privateKey[, encoding])`

<!-- YAML
added: v0.5.0
-->

- `privateKey` {string | Buffer | TypedArray | DataView}
- `encoding` {string} The [encoding][] of the `privateKey` string.

Sets the Diffie-Hellman private key. If the `encoding` argument is provided,
`privateKey` is expected
to be a string. If no `encoding` is provided, `privateKey` is expected
to be a [`Buffer`][], `TypedArray`, or `DataView`.

## `diffieHellman.setPublicKey(publicKey[, encoding])`

<!-- YAML
added: v0.5.0
-->

- `publicKey` {string | Buffer | TypedArray | DataView}
- `encoding` {string} The [encoding][] of the `publicKey` string.

Sets the Diffie-Hellman public key. If the `encoding` argument is provided,
`publicKey` is expected
to be a string. If no `encoding` is provided, `publicKey` is expected
to be a [`Buffer`][], `TypedArray`, or `DataView`.

## `diffieHellman.verifyError`

<!-- YAML
added: v0.11.12
-->

A bit field containing any warnings and/or errors resulting from a check
performed during initialization of the `DiffieHellman` object.

The following values are valid for this property (as defined in `constants`
module):

- `DH_CHECK_P_NOT_SAFE_PRIME`
- `DH_CHECK_P_NOT_PRIME`
- `DH_UNABLE_TO_CHECK_GENERATOR`
- `DH_NOT_SUITABLE_GENERATOR`

[`crypto.creatediffiehellman()`]: #crypto_crypto_creatediffiehellman_prime_primeencoding_generator_generatorencoding
