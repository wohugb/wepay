---
title: '注意事项'
linkTitle: '注意事项'
weight: 14
description: >

type: 'docs'
---

## 传统流 API（预 Node.js 的 v0.10）

The Crypto module was added to Node.js before there was the concept of a
unified Stream API, and before there were [`Buffer`][] objects for handling
binary data. As such, the many of the `crypto` defined classes have methods not
typically found on other Node.js classes that implement the [streams][stream]
API (e.g. `update()`, `final()`, or `digest()`). Also, many methods accepted
and returned `'latin1'` encoded strings by default rather than `Buffer`s. This
default was changed after Node.js v0.8 to use [`Buffer`][] objects by default
instead.

## 最近 ECDH 变化

Usage of `ECDH` with non-dynamically generated key pairs has been simplified.
Now, [`ecdh.setPrivateKey()`][] can be called with a preselected private key
and the associated public point (key) will be computed and stored in the object.
This allows code to only store and provide the private part of the EC key pair.
[`ecdh.setPrivateKey()`][] now also validates that the private key is valid for
the selected curve.

The [`ecdh.setPublicKey()`][] method is now deprecated as its inclusion in the
API is not useful. Either a previously stored private key should be set, which
automatically generates the associated public key, or [`ecdh.generateKeys()`][]
should be called. The main drawback of using [`ecdh.setPublicKey()`][] is that
it can be used to put the ECDH key pair into an inconsistent state.

## 弱或损害算法的支持

The `crypto` module still supports some algorithms which are already
compromised and are not currently recommended for use. The API also allows
the use of ciphers and hashes with a small key size that are too weak for safe
use.

Users should take full responsibility for selecting the crypto
algorithm and key size according to their security requirements.

Based on the recommendations of [NIST SP 800-131A][]:

- MD5 and SHA-1 are no longer acceptable where collision resistance is
  required such as digital signatures.
- The key used with RSA, DSA, and DH algorithms is recommended to have
  at least 2048 bits and that of the curve of ECDSA and ECDH at least
  224 bits, to be safe to use for several years.
- The DH groups of `modp1`, `modp2` and `modp5` have a key size
  smaller than 2048 bits and are not recommended.

See the reference for other recommendations and details.

## CCM 模式

CCM is one of the supported [AEAD algorithms][]. Applications which use this
mode must adhere to certain restrictions when using the cipher API:

- The authentication tag length must be specified during cipher creation by
  setting the `authTagLength` option and must be one of 4, 6, 8, 10, 12, 14 or
  16 bytes.
- The length of the initialization vector (nonce) `N` must be between 7 and 13
  bytes (`7 ≤ N ≤ 13`).
- The length of the plaintext is limited to `2 ** (8 * (15 - N))` bytes.
- When decrypting, the authentication tag must be set via `setAuthTag()` before
  calling `update()`.
  Otherwise, decryption will fail and `final()` will throw an error in
  compliance with section 2.6 of [RFC 3610][].
- Using stream methods such as `write(data)`, `end(data)` or `pipe()` in CCM
  mode might fail as CCM cannot handle more than one chunk of data per instance.
- When passing additional authenticated data (AAD), the length of the actual
  message in bytes must be passed to `setAAD()` via the `plaintextLength`
  option. This is not necessary if no AAD is used.
- As CCM processes the whole message at once, `update()` can only be called
  once.
- Even though calling `update()` is sufficient to encrypt/decrypt the message,
  applications _must_ call `final()` to compute or verify the
  authentication tag.

```js
const crypto = require('crypto');

const key = 'keykeykeykeykeykeykeykey';
const nonce = crypto.randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
const plaintext = 'Hello world';
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext),
});
const ciphertext = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();

// Now transmit { ciphertext, nonce, tag }.

const decipher = crypto.createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length,
});
const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

try {
  decipher.final();
} catch (err) {
  console.error('Authentication failed!');
  return;
}

console.log(receivedPlaintext);
```
