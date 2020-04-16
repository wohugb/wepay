---
title: 'crypto.publicEncrypt(key, buffer)'
linkTitle: 'publicEncrypt'
weight: 32
description: >
  使用`key`加密`buffer`的的内容并返回一个新的带加密的内容[`Buffer`](https://nodejs.org/api/buffer.html)。
type: 'docs'
---

<!-- YAML
added: v0.11.14
changes:
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29489
    description: The `oaepLabel` option was added.
  - version: v12.9.0
    pr-url: https://github.com/nodejs/node/pull/28335
    description: The `oaepHash` option was added.
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: This function now supports key objects.
-->

- `key` {Object | string | Buffer | KeyObject}
  - `key` {string | Buffer | KeyObject} 一个 PEM 编码的公共或私有密钥。
  - `oaepHash` {string} 散列函数使用的 OAEP 填充和 MGF1。
    **默认:** `'sha1'`
  - `oaepLabel` {Buffer | TypedArray | DataView} OAEP 填充标签。 如果没有指定，则使用无标签。
  - `passphrase` {string | Buffer} 一个可选的密码私钥。
  - `padding` {crypto.constants} 在`crypto.constants`定义的可选填充值,
    其可以是: `crypto.constants.RSA_NO_PADDING`, `crypto.constants.RSA_PKCS1_PADDING`, 或
    `crypto.constants.RSA_PKCS1_OAEP_PADDING`.
- `buffer` {Buffer | TypedArray | DataView}
- 返回: {Buffer} 一个新的带加密内容的`Buffer`。

返回的数据可以使用对应的私钥解密， 例如使用 [`crypto.privateDecrypt()`][].

如果`key`不是[`KeyObject`][], 该功能表现为好像`key`已传递到[`crypto.createPublicKey()`][].
如果它是一个对象，在`padding`属性可以通过。
否则，此函数使用`RSA_PKCS1_OAEP_PADDING`。

由于 RSA 公共密钥可以从私有密钥导出,私有密钥可以传递的,而不是一个公共密钥.

[`keyobject`]: #crypto_class_keyobject
[`crypto.createpublickey()`]: #crypto_crypto_createpublickey_key
[`crypto.privatedecrypt()`]: #crypto_crypto_privatedecrypt_privatekey_buffer
