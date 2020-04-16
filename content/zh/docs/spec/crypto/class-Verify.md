---
title: '类: Verify'
linkTitle: 'Verify'
weight: 12
description: >
  Extends: {stream.Writable}
type: 'docs'
---

<!-- YAML
added: v0.1.92
-->

The `Verify` class is a utility for verifying signatures. It can be used in one
of two ways:

- As a writable [stream][] where written data is used to validate against the
  supplied signature, or
- Using the [`verify.update()`][] and [`verify.verify()`][] methods to verify
  the signature.

The [`crypto.createVerify()`][] method is used to create `Verify` instances.
`Verify` objects are not to be created directly using the `new` keyword.

See [`Sign`][] for examples.

## `verify.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: The default `inputEncoding` changed from `binary` to `utf8`.
-->

- `data` {string | Buffer | TypedArray | DataView}
- `inputEncoding` {string} The [encoding][] of the `data` string.

Updates the `Verify` content with the given `data`, the encoding of which
is given in `inputEncoding`.
If `inputEncoding` is not provided, and the `data` is a string, an
encoding of `'utf8'` is enforced. If `data` is a [`Buffer`][], `TypedArray`, or
`DataView`, then `inputEncoding` is ignored.

This can be called many times with new data as it is streamed.

## `verify.verify(object, signature[, signatureEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: This function now supports RSA-PSS keys.
  - version: v11.7.0
    pr-url: https://github.com/nodejs/node/pull/25217
    description: The key can now be a private key.
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11705
    description: Support for RSASSA-PSS and additional options was added.
-->

- `object` {Object | string | Buffer | KeyObject}
  - `dsaEncoding` {string}
  - `padding` {integer}
  - `saltLength` {integer}
- `signature` {string | Buffer | TypedArray | DataView}
- `signatureEncoding` {string} The [encoding][] of the `signature` string.
- Returns: {boolean} `true` or `false` depending on the validity of the
  signature for the data and public key.

Verifies the provided data using the given `object` and `signature`.

If `object` is not a [`KeyObject`][], this function behaves as if
`object` had been passed to [`crypto.createPublicKey()`][]. If it is an
object, the following additional properties can be passed:

- `dsaEncoding` {string} For DSA and ECDSA, this option specifies the
  format of the generated signature. It can be one of the following:
  - `'der'` (default): DER-encoded ASN.1 signature structure encoding `(r, s)`.
  - `'ieee-p1363'`: Signature format `r || s` as proposed in IEEE-P1363.
- `padding` {integer} Optional padding value for RSA, one of the following:

  - `crypto.constants.RSA_PKCS1_PADDING` (default)
  - `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` will use MGF1 with the same hash function
  used to verify the message as specified in section 3.1 of [RFC 4055][], unless
  an MGF1 hash function has been specified as part of the key in compliance with
  section 3.3 of [RFC 4055][].

- `saltLength` {integer} Salt length for when padding is
  `RSA_PKCS1_PSS_PADDING`. The special value
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` sets the salt length to the digest
  size, `crypto.constants.RSA_PSS_SALTLEN_AUTO` (default) causes it to be
  determined automatically.

The `signature` argument is the previously calculated signature for the data, in
the `signatureEncoding`.
If a `signatureEncoding` is specified, the `signature` is expected to be a
string; otherwise `signature` is expected to be a [`Buffer`][],
`TypedArray`, or `DataView`.

The `verify` object can not be used again after `verify.verify()` has been
called. Multiple calls to `verify.verify()` will result in an error being
thrown.

Because public keys can be derived from private keys, a private key may
be passed instead of a public key.
