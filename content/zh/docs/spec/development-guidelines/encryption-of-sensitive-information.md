---
title: '敏感信息加密'
weight: 44
type: 'docs'
---

为了保证通信过程中敏感信息字段（如用户的住址、银行卡号、手机号码等）的机密性，微信支付 API v3 要求对于上下行的敏感信息进行加密。
下面详细介绍加密的方式，以及如何进行相应的计算。

## 加密算法

敏感信息加密使用的 RSA 公钥加密算法。
加密算法使用的填充方案，我们使用了相对更安全的 RSAES-OAEP(Optimal Asymmetric Encryption Padding)。

RSAES-OAEP 在各个编程语言中的模式值为:

​- OpenSSL，padding 设置为 `RSA_PKCS1_OAEP_PADDING`

- Java，使用 `Cipher.getinstance(RSA/ECB/OAEPWithSHA-1AndMGF1Padding)`

​- PHP，padding 设置为 OPENSSL_PKCS1_OAEP_PADDING
​- .NET，fOAEP 设置为 true
​- Node.js，padding 设置为 crypto.constants.RSA_PKCS1_OAEP_PADDING
​- Go，使用 EncryptOAEP

开发者应当使用微信支付平台证书中的公钥，对上送的敏感信息进行加密。这样只有拥有私钥的微信支付才能对密文进行解密，从而保证了信息的机密性。

另一方面，微信支付使用商户证书中的公钥对下行的敏感信息进行加密。开发者应使用商户私钥对下行的敏感信息的密文进行解密。

## 声明加密使用的平台证书

某些情况下，微信支付会更新平台证书。这时，商户有多个微信支付平台证书可以用于加密。为了保证解密顺利，商户发起请求的 HTTP 头部中应包括证书序列号，以声明加密所用的密钥对和证书。

商户上送敏感信息时使用微信支付平台公钥加密，证书序列号包含在请求 HTTP 头部的 Wechatpay-Serial

## 加密示例

大部分编程语言支持 RSA 加密。你可以参考示例，了解如何使用您的编程语言实现敏感信息加密。

Java
Go
PHP
.NET

```java
public static String rsaEncryptOAEP(String message, X509Certificate certificate)
throws IllegalBlockSizeException, IOException {
try {
Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding");
cipher.init(Cipher.ENCRYPT_MODE, certificate.getPublicKey());
​
byte[] data = message.getBytes("utf-8");
byte[] cipherdata = cipher.doFinal(data);
return Base64.getEncoder().encodeToString(cipherdata);
} catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
throw new RuntimeException("当前 Java 环境不支持 RSA v1.5/OAEP", e);
} catch (InvalidKeyException e) {
throw new IllegalArgumentException("无效的证书", e);
} catch (IllegalBlockSizeException | BadPaddingException e) {
throw new IllegalBlockSizeException("加密原串的长度不能超过 214 字节");
}
```

## 解密示例

同样的，大部分编程语言支持 RSA 解密。你可以参考示例，了解如何使用您的编程语言实现敏感信息解密。

Java
Go

```java
public static String rsaDecryptOAEP(String ciphertext, PrivateKey privateKey)
throws BadPaddingException, IOException {
try {
Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding");
cipher.init(Cipher.DECRYPT_MODE, privateKey);
​
byte[] data = Base64.getDecoder().decode(ciphertext);
return new String(cipher.doFinal(data), "utf-8");
} catch (NoSuchPaddingException | NoSuchAlgorithmException e) {
throw new RuntimeException("当前 Java 环境不支持 RSA v1.5/OAEP", e);
} catch (InvalidKeyException e) {
throw new IllegalArgumentException("无效的私钥", e);
} catch (BadPaddingException | IllegalBlockSizeException e) {
throw new BadPaddingException("解密失败");
}
}
```
