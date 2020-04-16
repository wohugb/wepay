---
title: '类: KeyObject'
linkTitle: 'KeyObject'
weight: 10
description: >
  Node.js的使用`KeyObject`类来表示一个对称或不对称密钥，以及各种键自曝不同的功能。
type: 'docs'
---

<!-- YAML
added: v11.6.0
changes:
  - version: v11.13.0
    pr-url: https://github.com/nodejs/node/pull/26438
    description: This class is now exported.
-->

The
[`crypto.createSecretKey()`][], [`crypto.createPublicKey()`][] and
[`crypto.createPrivateKey()`][] methods are used to create `KeyObject`
instances. `KeyObject` objects are not to be created directly using the `new`
keyword.

Most applications should consider using the new `KeyObject` API instead of
passing keys as strings or `Buffer`s due to improved security features.

## `keyObject.asymmetricKeyType`

<!-- YAML
added: v11.6.0
changes:
  - version: v13.9.0
    pr-url: https://github.com/nodejs/node/pull/31178
    description: Added support for `'dh'`.
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: Added support for `'rsa-pss'`
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26786
    description: This property now returns `undefined` for KeyObject
                 instances of unrecognized type instead of aborting.
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26774
    description: Added support for `'x25519'` and `'x448'`
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26319
    description: Added support for `'ed25519'` and `'ed448'`.
-->

- {string}

For asymmetric keys, this property represents the type of the key. Supported key
types are:

- `'rsa'` (OID 1.2.840.113549.1.1.1)
- `'rsa-pss'` (OID 1.2.840.113549.1.1.10)
- `'dsa'` (OID 1.2.840.10040.4.1)
- `'ec'` (OID 1.2.840.10045.2.1)
- `'x25519'` (OID 1.3.101.110)
- `'x448'` (OID 1.3.101.111)
- `'ed25519'` (OID 1.3.101.112)
- `'ed448'` (OID 1.3.101.113)
- `'dh'` (OID 1.2.840.113549.1.3.1)

This property is `undefined` for unrecognized `KeyObject` types and symmetric
keys.

## `keyObject.export([options])`

<!-- YAML
added: v11.6.0
-->

- `options`: {Object}
- Returns: {string | Buffer}

For symmetric keys, this function allocates a `Buffer` containing the key
material and ignores any options.

For asymmetric keys, the `options` parameter is used to determine the export
format.

For public keys, the following encoding options can be used:

- `type`: {string} Must be one of `'pkcs1'` (RSA only) or `'spki'`.
- `format`: {string} Must be `'pem'` or `'der'`.

For private keys, the following encoding options can be used:

- `type`: {string} Must be one of `'pkcs1'` (RSA only), `'pkcs8'` or
  `'sec1'` (EC only).
- `format`: {string} Must be `'pem'` or `'der'`.
- `cipher`: {string} If specified, the private key will be encrypted with
  the given `cipher` and `passphrase` using PKCS#5 v2.0 password based
  encryption.
- `passphrase`: {string | Buffer} The passphrase to use for encryption, see
  `cipher`.

When PEM encoding was selected, the result will be a string, otherwise it will
be a buffer containing the data encoded as DER.

PKCS#1, SEC1, and PKCS#8 type keys can be encrypted by using a combination of
the `cipher` and `format` options. The PKCS#8 `type` can be used with any
`format` to encrypt any key algorithm (RSA, EC, or DH) by specifying a
`cipher`. PKCS#1 and SEC1 can only be encrypted by specifying a `cipher`
when the PEM `format` is used. For maximum compatibility, use PKCS#8 for
encrypted private keys. Since PKCS#8 defines its own
encryption mechanism, PEM-level encryption is not supported when encrypting
a PKCS#8 key. See [RFC 5208][] for PKCS#8 encryption and [RFC 1421][] for
PKCS#1 and SEC1 encryption.

## `keyObject.symmetricKeySize`

<!-- YAML
added: v11.6.0
-->

- {number}

For secret keys, this property represents the size of the key in bytes. This
property is `undefined` for asymmetric keys.

## `keyObject.type`

<!-- YAML
added: v11.6.0
-->

- {string}

Depending on the type of this `KeyObject`, this property is either
`'secret'` for secret (symmetric) keys, `'public'` for public (asymmetric) keys
or `'private'` for private (asymmetric) keys.
