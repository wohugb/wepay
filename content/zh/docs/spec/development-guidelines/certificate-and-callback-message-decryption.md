---
title: '证书和回调报文解密'
weight: 43
type: 'docs'
---

为了保证安全性，微信支付在回调通知和平台证书下载接口中，对关键信息进行了 AES-256-GCM 加密。本章节详细介绍了加密报文的格式，以及如何进行解密。

## 加密报文格式

AES-GCM 是一种 NIST 标准的认证加密算法， 是一种能够同时保证数据的保密性、 完整性和真实性的一种加密模式。它最广泛的应用是在 TLS 中。

证书和回调报文使用的加密密钥为 APIv3 密钥。

对于加密的数据，我们使用了一个独立的 JSON 对象来表示。为了方便阅读，示例做了 Pretty 格式化，并加入了注释。

```json
{
  "original_type": "transaction", // 加密前的对象类型
  "algorithm": "AEAD_AES_256_GCM", // 加密算法
  // Base64编码后的密文
  "ciphertext": "...",
  // 加密使用的随机串初始化向量）
  "nonce": "...",
  // 附加数据包（可能为空）
  "associated_data": ""
}
```

加密的随机串，跟签名时使用的随机串没有任何关系，是不一样的。

## 解密

算法接口的细节，可以参考 RFC 5116。

大部分编程语言（较新版本）都支持了 AEAD_AES_256_GCM。开发者可以参考下列的示例，了解如何使用您的编程语言实现解密。

Java
PHP
.NET
Python

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
​
public class AesUtil {
​
static final int KEY_LENGTH_BYTE = 32;
static final int TAG_LENGTH_BIT = 128;
private final byte[] aesKey;
​
public AesUtil(byte[] key) {
if (key.length != KEY_LENGTH_BYTE) {
throw new IllegalArgumentException("无效的 ApiV3Key，长度必须为 32 个字节");
}
this.aesKey = key;
}
​
public String decryptToString(byte[] associatedData, byte[] nonce, String ciphertext)
throws GeneralSecurityException, IOException {
try {
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
​
SecretKeySpec key = new SecretKeySpec(aesKey, "AES");
GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH_BIT, nonce);
​
cipher.init(Cipher.DECRYPT_MODE, key, spec);
cipher.updateAAD(associatedData);
​
return new String(cipher.doFinal(Base64.getDecoder().decode(ciphertext)), "utf-8");
} catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
throw new IllegalStateException(e);
} catch (InvalidKeyException | InvalidAlgorithmParameterException e) {
throw new IllegalArgumentException(e);
}
}
}
```
