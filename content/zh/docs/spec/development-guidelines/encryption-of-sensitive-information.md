---
title: '敏感信息加密'
linkTitle: '敏感加密'
weight: 44
description: >
  为了保证通信过程中敏感信息字段(如用户的住址、银行卡号、手机号码等）的机密性, 微信支付 API v3 要求对于上下行的敏感信息进行加密。
type: 'docs'
---

下面详细介绍加密的方式, 以及如何进行相应的计算。

## 加密算法

敏感信息加密使用的[RSA 公钥加密算法](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)。
加密算法使用的填充方案, 我们使用了相对更安全的 RSAES-OAEP(Optimal Asymmetric Encryption Padding)。

RSAES-OAEP 在各个编程语言中的模式值为:

- [OpenSSL](https://www.openssl.org/docs/man1.1.0/man3/RSA_public_encrypt.html),padding 设置为 `RSA_PKCS1_OAEP_PADDING`
- [Java](),使用 `Cipher.getinstance(RSA/ECB/OAEPWithSHA-1AndMGF1Padding)`
- [PHP](https://www.php.net/manual/en/function.openssl-public-encrypt.php), padding 设置为 OPENSSL_PKCS1_OAEP_PADDING
- [.NET](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rsacryptoserviceprovider.encrypt?view=netframework-4.5.2), fOAEP 设置为 true
- [Node.js](https://nodejs.org/api/crypto.html#crypto_crypto_publicencrypt_key_buffer), padding 设置为 crypto.constants.RSA_PKCS1_OAEP_PADDING
- [Go](https://nodejs.org/api/crypto.html#crypto_crypto_publicencrypt_key_buffer), 使用 EncryptOAEP

开发者应当使用**微信支付平台证书**中的公钥, 对上送的敏感信息进行加密。这样只有拥有私钥的微信支付才能对密文进行解密, 从而保证了信息的机密性。

另一方面, 微信支付使用**商户证书**中的公钥对下行的敏感信息进行加密。开发者应使用**商户私钥**对下行的敏感信息的密文进行解密。

## 声明加密使用的平台证书

某些情况下, 微信支付会更新平台证书。这时, 商户有多个微信支付平台证书可以用于加密。
为了保证解密顺利, 商户发起请求的 HTTP 头部中应包括**证书序列号**, 以声明加密所用的密钥对和证书。

- 商户上送敏感信息时使用**微信支付平台公钥**加密, 证书序列号包含在请求 HTTP 头部的 `Wechatpay-Serial`

## 加密示例

大部分编程语言支持 RSA 加密。你可以参考示例, 了解如何使用您的编程语言实现敏感信息加密。

{{< tabs name="RSA-demo" >}}
{{% tab name="Java" %}}

```java
public static String rsaEncryptOAEP(String message, X509Certificate certificate)
    throws IllegalBlockSizeException, IOException {
  try {
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding");
    cipher.init(Cipher.ENCRYPT_MODE, certificate.getPublicKey());

    byte[] data = message.getBytes("utf-8");
    byte[] cipherdata = cipher.doFinal(data);
    return Base64.getEncoder().encodeToString(cipherdata);
  } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
    throw new RuntimeException("当前Java环境不支持RSA v1.5/OAEP", e);
  } catch (InvalidKeyException e) {
    throw new IllegalArgumentException("无效的证书", e);
  } catch (IllegalBlockSizeException | BadPaddingException e) {
    throw new IllegalBlockSizeException("加密原串的长度不能超过214字节");
}
```

{{% /tab %}}
{{% tab name="Go" %}}

```go
secretMessage := []byte("send reinforcements, we're going to advance")
rng := rand.Reader

cipherdata, err := EncryptOAEP(sha1.New(), rng, rsaPublicKey, secretMessage, nil)
if err != nil {
        fmt.Fprintf(os.Stderr, "Error from encryption: %s\n", err)
        return
}

ciphertext := base64.StdEncoding.EncodeToString(cipherdata)
fmt.Printf("Ciphertext: %x\n", ciphertext)
```

{{% /tab %}}
{{% tab name="PHP" %}}

```php
private function getEncrypt($str){
  //$str是待加密字符串
  $public_key_path = '平台证书路径';
  $public_key = file_get_contents($public_key_path);
  $encrypted = '';
  if (openssl_public_encrypt($str,$encrypted,$public_key,OPENSSL_PKCS1_OAEP_PADDING)) {
      //base64编码
      $sign = base64_encode($encrypted);
  } else {
      throw new Exception('encrypt failed');
  }
  return $sign;
}
```

{{% /tab %}}
{{% tab name=".NET" %}}

```cs
/// <summary>
/// 最终提交请求时, 需对敏感信息加密, 如身份证、银行卡号。
/// 加密算法是RSA, 使用从接口下载到的公钥进行加密, 非后台下载到的私钥。
/// 感谢ISV(https://github.com/ndma-isv)提供示例
///
/// </summary>
/// <param name="text">要加密的明文</param>
/// <param name="publicKey"> -----BEGIN CERTIFICATE----- 开头的string, 转为bytes </param>
/// <returns></returns>
public static string RSAEncrypt(string text, byte[] publicKey)
{
    using (var x509 = new X509Certificate2(publicKey))
    {
        using (var rsa = (RSACryptoServiceProvider)x509.PublicKey.Key)
        {
            var buff = rsa.Encrypt(Encoding.UTF8.GetBytes(text), true);

            return Convert.ToBase64String(buff);
        }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

## 解密示例

同样的, 大部分编程语言支持 RSA 解密。你可以参考示例, 了解如何使用您的编程语言实现敏感信息解密。

{{< tabs name="Decryption-sample" >}}
{{% tab name="Java" %}}

```java
  public static String rsaDecryptOAEP(String ciphertext, PrivateKey privateKey)
      throws BadPaddingException, IOException {
    try {
      Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-1AndMGF1Padding");
      cipher.init(Cipher.DECRYPT_MODE, privateKey);

      byte[] data = Base64.getDecoder().decode(ciphertext);
      return new String(cipher.doFinal(data), "utf-8");
    } catch (NoSuchPaddingException | NoSuchAlgorithmException e) {
      throw new RuntimeException("当前Java环境不支持RSA v1.5/OAEP", e);
    } catch (InvalidKeyException e) {
      throw new IllegalArgumentException("无效的私钥", e);
    } catch (BadPaddingException | IllegalBlockSizeException e) {
      throw new BadPaddingException("解密失败");
    }
  }
```

{{% /tab %}}
{{% tab name="Go" %}}

```go
cipherdata, _ := base64.StdEncoding.DecodeString(ciphertext)
rng := rand.Reader

plaintext, err := DecryptOAEP(sha1.New(), rng, rsaPrivateKey, cipherdata, nil)
if err != nil {
        fmt.Fprintf(os.Stderr, "Error from decryption: %s\n", err)
        return
}

fmt.Printf("Plaintext: %s\n", string(plaintext))
```

{{% /tab %}}
{{< /tabs >}}
