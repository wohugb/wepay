---
title: '证书和回调报文解密'
linkTitle: '如何解密'
weight: 43
description: >
  为了保证安全性, 微信支付在回调通知和平台证书下载接口中, 对关键信息进行了 AES-256-GCM 加密。本章节详细介绍了加密报文的格式, 以及如何进行解密。
type: 'docs'
---

## 加密报文格式

`AES-GCM` 是一种 NIST 标准的[认证加密](https://zh.wikipedia.org/wiki/%E8%AE%A4%E8%AF%81%E5%8A%A0%E5%AF%86)算法, 是一种能够同时保证数据的保密性、 完整性和真实性的一种加密模式。它最广泛的应用是在 TLS 中。

证书和回调报文使用的加密密钥为[APIv3 密钥](https://wechatpay-api.gitbook.io/wechatpay-api-v3/ren-zheng/api-v3-mi-yao)。

对于加密的数据, 我们使用了一个独立的 JSON 对象来表示。为了方便阅读, 示例做了 Pretty 格式化, 并加入了注释。

```json
{
  "original_type": "transaction", // 加密前的对象类型
  "algorithm": "AEAD_AES_256_GCM", // 加密算法
  // Base64编码后的密文
  "ciphertext": "...",
  // 加密使用的随机串初始化向量）
  "nonce": "...",
  // 附加数据包(可能为空）
  "associated_data": ""
}
```

{{% alert color="info" %}}
加密的随机串, 跟签名时使用的随机串没有任何关系, 是不一样的。
{{% /alert %}}

## 解密

算法接口的细节, 可以参考[RFC 5116](https://tools.ietf.org/html/rfc5116)。

大部分编程语言(较新版本）都支持了 `AEAD_AES_256_GCM`。开发者可以参考下列的示例, 了解如何使用您的编程语言实现解密。

{{< tabs name="AEAD_AES_256_GCM" >}}
{{% tab name="Java" %}}

```java
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AesUtil {

  static final int KEY_LENGTH_BYTE = 32;
  static final int TAG_LENGTH_BIT = 128;
  private final byte[] aesKey;

  public AesUtil(byte[] key) {
  if (key.length != KEY_LENGTH_BYTE) {
    throw new IllegalArgumentException("无效的ApiV3Key, 长度必须为32个字节");
  }
  this.aesKey = key;
  }

  public String decryptToString(byte[] associatedData, byte[] nonce, String ciphertext)
    throws GeneralSecurityException, IOException {
  try {
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

    SecretKeySpec key = new SecretKeySpec(aesKey, "AES");
    GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH_BIT, nonce);

    cipher.init(Cipher.DECRYPT_MODE, key, spec);
    cipher.updateAAD(associatedData);

    return new String(cipher.doFinal(Base64.getDecoder().decode(ciphertext)), "utf-8");
  } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
    throw new IllegalStateException(e);
  } catch (InvalidKeyException | InvalidAlgorithmParameterException e) {
    throw new IllegalArgumentException(e);
  }
  }
}
```

{{% /tab %}}
{{% tab name="PHP" %}}

```PHP
class AesUtil
{
  /**
   * AES key
   *
   * @var string
   */
  private $aesKey;

  const KEY_LENGTH_BYTE = 32;
  const AUTH_TAG_LENGTH_BYTE = 16;

  /**
   * Constructor
   */
  public function __construct($aesKey)
  {
    if (strlen($aesKey) != self::KEY_LENGTH_BYTE) {
      throw new InvalidArgumentException('无效的ApiV3Key, 长度应为32个字节');
    }
    $this->aesKey = $aesKey;
  }

  /**
   * Decrypt AEAD_AES_256_GCM ciphertext
   *
   * @param string  $associatedData   AES GCM additional authentication data
   * @param string  $nonceStr       AES GCM nonce
   * @param string  $ciphertext     AES GCM cipher text
   *
   * @return string|bool    Decrypted string on success or FALSE on failure
   */
  public function decryptToString($associatedData, $nonceStr, $ciphertext)
  {
    $ciphertext = \base64_decode($ciphertext);
    if (strlen($ciphertext) <= self::AUTH_TAG_LENGTH_BYTE) {
      return false;
    }

    // ext-sodium (default installed on >= PHP 7.2)
    if (function_exists('\sodium_crypto_aead_aes256gcm_is_available') &&
      \sodium_crypto_aead_aes256gcm_is_available()) {
      return \sodium_crypto_aead_aes256gcm_decrypt($ciphertext, $associatedData, $nonceStr, $this->aesKey);
    }

    // ext-libsodium (need install libsodium-php 1.x via pecl)
    if (function_exists('\Sodium\crypto_aead_aes256gcm_is_available') &&
      \Sodium\crypto_aead_aes256gcm_is_available()) {
      return \Sodium\crypto_aead_aes256gcm_decrypt($ciphertext, $associatedData, $nonceStr, $this->aesKey);
    }

    // openssl (PHP >= 7.1 support AEAD)
    if (PHP_VERSION_ID >= 70100 && in_array('aes-256-gcm', \openssl_get_cipher_methods())) {
      $ctext = substr($ciphertext, 0, -self::AUTH_TAG_LENGTH_BYTE);
      $authTag = substr($ciphertext, -self::AUTH_TAG_LENGTH_BYTE);

      return \openssl_decrypt($ctext, 'aes-256-gcm', $this->aesKey, \OPENSSL_RAW_DATA, $nonceStr,
        $authTag, $associatedData);
    }

    throw new \RuntimeException('AEAD_AES_256_GCM需要PHP 7.1以上或者安装libsodium-php');
  }
}
```

{{% /tab %}}
{{% tab name=".Net" %}}

```cs
public class AesGcm
{
  private static string ALGORITHM = "AES/GCM/NoPadding";
  private static int TAG_LENGTH_BIT = 128;
  private static int NONCE_LENGTH_BYTE = 12;
  private static string AES_KEY = "yourkeyhere";

  public static string AesGcmDecrypt(string associatedData, string nonce, string ciphertext)
  {
    GcmBlockCipher gcmBlockCipher = new GcmBlockCipher(new AesEngine());
    AeadParameters aeadParameters = new AeadParameters(
      new KeyParameter(Encoding.UTF8.GetBytes(AES_KEY)),
      128,
      Encoding.UTF8.GetBytes(nonce),
      Encoding.UTF8.GetBytes(associatedData));
    gcmBlockCipher.Init(false, aeadParameters);

    byte[] data = Convert.FromBase64String(ciphertext);
    byte[] plaintext = new byte[gcmBlockCipher.GetOutputSize(data.Length)];
    int length = gcmBlockCipher.ProcessBytes(data, 0, data.Length, plaintext, 0);
    gcmBlockCipher.DoFinal(plaintext, length);
    return Encoding.UTF8.GetString(plaintext);
  }
}
```

{{% /tab %}}
{{% tab name="Python" %}}

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import base64

def decrypt(nonce, ciphertext, associated_data):
  key = "Your32Apiv3Key"

  key_bytes = str.encode(key)
  nonce_bytes = str.encode(nonce)
  ad_bytes = str.encode(associated_data)
  data = base64.b64decode(ciphertext)

  aesgcm = AESGCM(key_bytes)
  return aesgcm.decrypt(nonce_bytes, data, ad_bytes)
```

{{% /tab %}}
{{< /tabs >}}
