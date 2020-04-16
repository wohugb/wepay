---
title: '加密常量'
linkTitle: '加密常量'
weight: 15
description: >
  由`crypto.constants`导出以下常量适用于`crypto`, `tls`, 和 `https`模块的各种用途并且一般是特定于OpenSSL的。
type: 'docs'
---

## OpenSSL 选项

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SSL_OP_ALL</code></td>
    <td>适用范围内的OpenSSL多个漏洞的解决方法。
    查看<a href="https://www.openssl.org/docs/man1.0.2/ssl/SSL_CTX_set_options.html">SSL_CTX_set_options</a>详细</td>
  </tr>
  <tr>
    <td><code>SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION</code></td>
    <td>允许OpenSSL和打补丁的客户端和服务器之间的传统不安全的重新协商。 查看 <a href="https://www.openssl.org/docs/man1.0.2/ssl/SSL_CTX_set_options.html">SSL_CTX_set_options</a>.</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CIPHER_SERVER_PREFERENCE</code></td>
    <td>
      尝试选择密码时，使用的不是客户端的服务器的偏好。
      行为取决于协议版本。
      查看<a href="https://www.openssl.org/docs/man1.0.2/ssl/SSL_CTX_set_options.html">SSL_CTX_set_options</a>.</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CISCO_ANYCONNECT</code></td>
    <td>指示OpenSSL的使用DTLS_BAD_VER思科的“speshul”版本。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_COOKIE_EXCHANGE</code></td>
    <td>指示OpenSSL的打开cookie的交换。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CRYPTOPRO_TLSEXT_BUG</code></td>
    <td>OpenSSL的指示从cryptopro草案的早期版本添加服务器的Hello扩展。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS</code></td>
    <td>指示的OpenSSL禁用SSL OpenSSL中0.9.6d替代方法加入3.0 / TLS 1.0的漏洞。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_EPHEMERAL_RSA</code></td>
    <td>OpenSSL的指示在执行RSA操作时，总是使用tmp_rsa关键。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_LEGACY_SERVER_CONNECT</code></td>
    <td>允许不支持RI服务器初始连接。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_MICROSOFT_SESS_ID_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_MSIE_SSLV2_RSA_PADDING</code></td>
    <td>指示OpenSSL的禁用解决方法的SSL 2.0服务器实现一个人在这方面的中间人协议版本的漏洞。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NETSCAPE_CA_DN_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NETSCAPE_CHALLENGE_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_COMPRESSION</code></td>
    <td>指示的OpenSSL为SSL / TLS压缩禁用支持。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_QUERY_MTU</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION</code></td>
    <td>OpenSSL的指示在执行重新协商时始终启动一个新的会话。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SSLv2</code></td>
    <td>OpenSSL的指示关闭SSL V2</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SSLv3</code></td>
    <td>OpenSSL的指示关闭SSL V3</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TICKET</code></td>
    <td>指示OpenSSL的要禁用RFC4507bis门票。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1</code></td>
    <td>指示OpenSSL的关闭TLS V1</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1_1</code></td>
    <td>指示OpenSSL的关闭TLS V1.1</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1_2</code></td>
    <td>指示OpenSSL的关闭TLS V1.2</td>
  </tr>
    <td><code>SSL_OP_PKCS1_CHECK_1</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_PKCS1_CHECK_2</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_SINGLE_DH_USE</code></td>
    <td>使用临时/短暂的DH参数时指示的OpenSSL总是创建一个新的密钥。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_SINGLE_ECDH_USE</code></td>
    <td>使用临时/短暂的ECDH参数时指示的OpenSSL总是创建一个新的密钥。</td>
  </tr>
    <td><code>SSL_OP_SSLEAY_080_CLIENT_DH_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_TLS_BLOCK_PADDING_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_TLS_D5_BUG</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_TLS_ROLLBACK_BUG</code></td>
    <td>OpenSSL的指示来禁用版本回滚攻击检测。</td>
  </tr>
</table>

## OpenSSL 引擎常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_RSA</code></td>
    <td>限制引擎使用RSA</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DSA</code></td>
    <td>限制引擎使用DSA</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DH</code></td>
    <td>限制引擎使用DH</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_RAND</code></td>
    <td>限制引擎使用RAND</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_EC</code></td>
    <td>限制引擎使用EC</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_CIPHERS</code></td>
    <td>限制引擎使用CIPHERS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DIGESTS</code></td>
    <td>限制引擎使用DIGESTS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_PKEY_METHS</code></td>
    <td>限制引擎使用PKEY_METHDS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_PKEY_ASN1_METHS</code></td>
    <td>限制引擎使用PKEY_ASN1_METHS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_ALL</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_NONE</code></td>
    <td></td>
  </tr>
</table>

## OpenSSL 其他常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>DH_CHECK_P_NOT_SAFE_PRIME</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_CHECK_P_NOT_PRIME</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_UNABLE_TO_CHECK_GENERATOR</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_NOT_SUITABLE_GENERATOR</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>ALPN_ENABLED</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_SSLV23_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_NO_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_OAEP_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_X931_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_PSS_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_DIGEST</code></td>
    <td>Sets the salt length for <code>RSA_PKCS1_PSS_PADDING</code> to the
        digest size when signing or verifying.</td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_MAX_SIGN</code></td>
    <td>Sets the salt length for <code>RSA_PKCS1_PSS_PADDING</code> to the
        maximum permissible value when signing data.</td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_AUTO</code></td>
    <td>Causes the salt length for <code>RSA_PKCS1_PSS_PADDING</code> to be
        determined automatically when verifying a signature.</td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_COMPRESSED</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_UNCOMPRESSED</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_HYBRID</code></td>
    <td></td>
  </tr>
</table>

## Node.js Crypto 常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>defaultCoreCipherList</code></td>
    <td>指定由内置Node.js的使用默认密码列表</td>
  </tr>
  <tr>
    <td><code>defaultCipherList</code></td>
    <td>指定由当前Node.js的过程中使用的活性默认密码列表。</td>
  </tr>
</table>

[`evp_bytestokey`]: https://www.openssl.org/docs/man1.1.0/crypto/EVP_BytesToKey.html
[`sign`]: #crypto_class_sign
[`uv_threadpool_size`]: cli.html#cli_uv_threadpool_size_size
[`verify`]: #crypto_class_verify
[`crypto.createdecipher()`]: #crypto_crypto_createdecipher_algorithm_password_options
[`crypto.createdecipheriv()`]: #crypto_crypto_createdecipheriv_algorithm_key_iv_options
[`crypto.creatediffiehellman()`]: #crypto_crypto_creatediffiehellman_prime_primeencoding_generator_generatorencoding
[`crypto.createecdh()`]: #crypto_crypto_createecdh_curvename
[`crypto.createhash()`]: #crypto_crypto_createhash_algorithm_options
[`crypto.createhmac()`]: #crypto_crypto_createhmac_algorithm_key_options
[`crypto.createprivatekey()`]: #crypto_crypto_createprivatekey_key
[`crypto.createsecretkey()`]: #crypto_crypto_createsecretkey_key
[`crypto.createsign()`]: #crypto_crypto_createsign_algorithm_options
[`crypto.createverify()`]: #crypto_crypto_createverify_algorithm_options
[`crypto.getcurves()`]: #crypto_crypto_getcurves
[`crypto.getdiffiehellman()`]: #crypto_crypto_getdiffiehellman_groupname
[`crypto.gethashes()`]: #crypto_crypto_gethashes
[`crypto.privateencrypt()`]: #crypto_crypto_privateencrypt_privatekey_buffer
[`crypto.publicdecrypt()`]: #crypto_crypto_publicdecrypt_key_buffer
[`crypto.publicencrypt()`]: #crypto_crypto_publicencrypt_key_buffer
[`crypto.randombytes()`]: #crypto_crypto_randombytes_size_callback
[`crypto.randomfill()`]: #crypto_crypto_randomfill_buffer_offset_size_callback
[`crypto.scrypt()`]: #crypto_crypto_scrypt_password_salt_keylen_options_callback
[`decipher.final()`]: #crypto_decipher_final_outputencoding
[`decipher.update()`]: #crypto_decipher_update_data_inputencoding_outputencoding
[`diffiehellman.setpublickey()`]: #crypto_diffiehellman_setpublickey_publickey_encoding
[`ecdh.generatekeys()`]: #crypto_ecdh_generatekeys_encoding_format
[`ecdh.setprivatekey()`]: #crypto_ecdh_setprivatekey_privatekey_encoding
[`ecdh.setpublickey()`]: #crypto_ecdh_setpublickey_publickey_encoding
[`hash.digest()`]: #crypto_hash_digest_encoding
[`hash.update()`]: #crypto_hash_update_data_inputencoding
[`hmac.digest()`]: #crypto_hmac_digest_encoding
[`hmac.update()`]: #crypto_hmac_update_data_inputencoding
[`keyobject.export()`]: #crypto_keyobject_export_options
[`sign.sign()`]: #crypto_sign_sign_privatekey_outputencoding
[`sign.update()`]: #crypto_sign_update_data_inputencoding
[`stream.writable` options]: stream.html#stream_constructor_new_stream_writable_options
[`stream.transform` options]: stream.html#stream_new_stream_transform_options
[`util.promisify()`]: util.html#util_util_promisify_original
[`verify.update()`]: #crypto_verify_update_data_inputencoding
[`verify.verify()`]: #crypto_verify_verify_object_signature_signatureencoding
[aead algorithms]: https://en.wikipedia.org/wiki/Authenticated_encryption
[ccm mode]: #crypto_ccm_mode
[caveats]: #crypto_support_for_weak_or_compromised_algorithms
[crypto constants]: #crypto_crypto_constants_1
[nist sp 800-131a]: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar1.pdf
[nist sp 800-132]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
[nist sp 800-38d]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[nonce-disrespecting adversaries]: https://github.com/nonce-disrespect/nonce-disrespect
[rfc 1421]: https://www.rfc-editor.org/rfc/rfc1421.txt
[rfc 2412]: https://www.rfc-editor.org/rfc/rfc2412.txt
[rfc 3526]: https://www.rfc-editor.org/rfc/rfc3526.txt
[rfc 3610]: https://www.rfc-editor.org/rfc/rfc3610.txt
[rfc 4055]: https://www.rfc-editor.org/rfc/rfc4055.txt
[rfc 5208]: https://www.rfc-editor.org/rfc/rfc5208.txt
[encoding]: buffer.html#buffer_buffers_and_character_encodings
[initialization vector]: https://en.wikipedia.org/wiki/Initialization_vector
[scrypt]: https://en.wikipedia.org/wiki/Scrypt
[stream-writable-write]: stream.html#stream_writable_write_chunk_encoding_callback
