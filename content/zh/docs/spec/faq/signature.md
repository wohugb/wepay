---
title: '签名相关'
weight: 62
type: 'docs'
---

## 如何在程序中加载私钥

推荐使用微信支付提供的 SDK。你也可以查看下列编程语言的示例代码。

{{< tabs name="load_private_key" >}}
{{% tab name="Java" %}}

```java
  /**
   * 获取私钥。
   *
   * @param filename 私钥文件路径  (required)
   * @return 私钥对象
   */
public static PrivateKey getPrivateKey(String filename) throws IOException {

  String content = new String(Files.readAllBytes(Paths.get(filename)), "utf-8");
  try {
    String privateKey = content.replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replaceAll("\\s+", "");

    KeyFactory kf = KeyFactory.getInstance("RSA");
    return kf.generatePrivate(
        new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKey)));
  } catch (NoSuchAlgorithmException e) {
    throw new RuntimeException("当前Java环境不支持RSA", e);
  } catch (InvalidKeySpecException e) {
    throw new RuntimeException("无效的密钥格式");
  }
}
```

{{% /tab %}}
{{% tab name="PHP" %}}

```php
    /**
     * Read private key from file
     *
     * @param string    $filepath     PEM encoded private key file path
     *
     * @return resource|bool     Private key resource identifier on success, or FALSE on error
     */
    public static function getPrivateKey($filepath) {
        return openssl_get_privatekey(file_get_contents($filepath));
    }
```

{{% /tab %}}
{{% tab name=".Net" %}}

```cs
protected string sign(string message)
{
    // 需去除私钥文件中的-----BEGIN/END PRIVATE KEY-----
    string privateKey = "MIIEvgIBADANBgkqhkiG...30HBe+GD1tntZgf6I1Y0ZpHZ";
    byte[] keyData = Convert.FromBase64String(privateKey);
    using (CngKey cngKey = CngKey.Import(keyData, CngKeyBlobFormat.Pkcs8PrivateBlob))
    using (RSACng rsa = new RSACng(cngKey))
    {
        byte[] data = System.Text.Encoding.UTF8.GetBytes(message);
        return Convert.ToBase64String(rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1));
    }
}
```

{{% /tab %}}
{{% tab name="Go" %}}

```go
package main

import (
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"log"
)

func main() {
	var pemData = []byte(`
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1yhh6LNB8nXmO
SxdGKWmDh0OxAM/wnGyHKSD9tcEhMQTe+wabce0POXzejCmwFBzZa7ZmxH5LoAey
T7Fpwb7pptbbDx58CxCYhNEdQ2XrFILUCq3daMj++KQlyDp8U0NspFKsO57gSlih
AJ49DzcXQb7Vs5daIvtLapIouPyixAE5uDL+afmJ+bXC11xP5sPWw1RfXynW3vbE
yfRol9hQyQWfmO15GSZi6TTAhTKaW31yKaQNChy06K+LsE9JAU+ESxihthtGiMbY
3fFRyhF9Ka2e0wIOz6UdcfwMjxXWRV4OLD1uFG9IYbUiugmYtDyIYZaFDPYdi/+R
jm10Ps5lAgMBAAECggEAb19kRZ2lEWOM8D9S//opGZrKPuvneVrsJpZtDuLGcqZM
fKvALYXLnZMzzEiE1cpMrmuOMUHaukxNytGGOOupIg7D/SszGv3QahCc6Ne83hwP
1wa/5DDpS0RblIYqRrbgTPQTbk+Mk48Y43K0f2YN82KlHtnLNT7PRDIDX42Nwc1X
8f4JcfyKUE/pOSn+YUlu5Edu6QYbWJWS7mlojEZ/wuWbSymbs6mVVkKeSWGTIh1v
4n2F3Gj6ckUDlt4aZWTVcBa2+ZvSE2h5frSH0snpdGV1bW44IqE3NkwfTQ7JI34C
VJdhb3goIyoTmiz6NGEZuiyr8gP9IOjqPfeP7GO5YQKBgQDuB1CT8ksO4SqR3skR
kdCQW7kOogZgDThei+3HUMOsHr8L42oYkJDmk2res1ow/mz6SoIV4w6mvvUSnACx
dtYA1AzUEs3jvltv8cQ1HAuDhLRslWrhSoxrQQh20yrVxxGN0J4DdCAGURSUwypz
UHR+mlfcjacPyxKUsT41+8zG+QKBgQDDg8ZGivuV794RuA3cfpitUFG+0nA0ZS3q
AZqlA3ufnCudHQixFIsf83Q7sX7pBob5PNONqsbv0OKpC3/xJRSPIwjWTBUPlDLX
rsGajKMhUPtkWo4zkfrSa8XaUpUVDU0qTzS71f9Aab3SkPH1d1o4cQxO08axGLbm
TV/46QCBzQKBgDd7ZQDXPT+epHmT4HJD9sVvW9dZVPsWmckP/MC0xqdcE1QGEjjf
mablPcfjLma1J1m//Ep1vniHkkBgNJkpBgDzbHoSWAN5335ccEug2d4yFIwq19rj
sY9efUaVOirSV/kiY3KSotRWGeIDC+YNHtpTx58VNZes0gvutH2Iz9ahAoGAUcoW
b/xEMv0dURxF8C+lfxtSlxlBhymsg3AYWV+Tn7mdJSS4Nhv592vI/A/Mn37zh+BC
P8lpX3lq2HzPEPoKF7b4Q22ggdvlSQT6SMT8mTtfbyPSyRAQdWZQZnyVkTD3TvPD
g7CKD1As8KFiFuXPAD2KgI9nVz6XhNBpjZ8rbyECgYEAsOrm1hbNZbvlNhnuUjw5
DTgTuJ3B0j1aK/7C2EQWR+mIG2q5TKDC6xNdszV0gK1/TbJk4RNgQo0JLkuZ2Xk2
Q8KhaNe+X8SYP9CFKIsXuhGrYI5ICjipov5oJqjESV4wle575eWwdPgF1ICabpIq
dnX2MxS9tkk830uXxPrXpRA=
-----END PRIVATE KEY-----`)

	block, rest := pem.Decode(pemData)
	if block == nil || block.Type != "PRIVATE KEY" {
		log.Fatal("failed to decode PEM block containing public key")
	}

	pri, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Got a %T, with remaining data: %q", pri, rest)
}
```

{{% /tab %}}
{{< /tabs >}}

## 为什么请求返回 401 Unauthorized？

请根据报文中的 message 信息，在下表中找到错误的原因和对应的解决方案。

| 错误描述                                                             | 原因                                                                                   | 解决方案                                                         |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 商户未设置 APIv3 密钥。                                              | 商户未设置 APIv3 密钥                                                                  | 请登陆商户平台设置 APIv3 密钥                                    |
| 商户未申请过证书。                                                   | 商户未申请过 API 证书                                                                  | 请参考什么是 API 证书？如何获取 API 证书？​                      |
| 商户证书序列号有误。                                                 | 使用了错误的商户证书，或者使用了已经失效的历史的商户证书，或者获取的商户证书序列号有误 | 请检查商户证书，可登陆商户平台查看正确的证书序列号。             |
| 商户证书已过期。                                                     | 使用了已经过期的商户证书和私钥                                                         | 请到商户平台进行续期，使用续期后的新证书                         |
| 商户证书已作废。                                                     | 使用了商户主动作废的商户证书和私钥                                                     | 请到商户平台重新申请证书后，使用新申请的证书                     |
| 错误的签名，导致验签失败。                                           | 使用了错误的商户私钥，或签名串构造不正确                                               | 请见下一问题                                                     |
| Http 头 Authorization 值格式错误                                     | 缺少 Authorization 头，或其格式不正确                                                  | 请检查上送的 Authorization                                       |
| Http 头 Authorization 认证类型不正确                                 | 不支持 Authorization 中声明的签名算法                                                  | 请检查上送的 Authorization，目前仅支持 WECHATPAY2-SHA256-RSA2048 |
| Http 头 Authorization 中的 timestamp 与发起请求的时间不得超过 5 分钟 | Authorization 头中的时间戳 timestamp 所示时间距离当前时间超过 5 分钟                   | 请检查系统时间是否准确，或者获取时间的逻辑是否正确               |
| 已更换证书，请使用新证书                                             | 商户主动重新申请了商户 API 证书                                                        | 请使用新申请的商户 API 证书                                      |

## 如何定位"错误的签名，导致验签失败 “的错误？

为了方便开发者定位，我们对于验签失败，会在应答的错误详情 detail 中加入验签信息。验签信息是我们根据商户的 HTTP 请求构造签名串的各种信息。

- method，HTTP 请求方法
- url，请求的 URL
- truncated_sign_message，微信支付验签时使用的签名串（换行符显示成\n）。为了方便查看，我们对最后的请求报文主体做了截断
- sign_message_length，微信支付验签时使用的签名串的字节长度

```json
{
  "code": "SIGN_ERROR",
  "message": "错误的签名，验签失败",
  "detail": {
    "field": "signature",
    "issue": "sign not match",
    "location": "authorization",
    "sign_information": {
      "method": "GET",
      "url": "/payscore/user-service-state?service_id=500001&appid=wxeaf7bf1de621b0c2&openid=oWm9Z5JQwgV7BKAQUeKsUMVSjTpQ",
      "truncated_sign_message": "GET\n/payscore/user-service-state?service_id=500001&appid=wxeaf7bf1de621b0c2&openid=oWm9Z5JQwgV7BKAQUeKsUMVSjTpQ\n1559194069\n18a427e78d2344e1a71156a2690cc4d6\n\n",
      "sign_message_length": 157
    }
  }
}
```

建议开发者在程序中将自己组装的签名串以及签名串的字节长度在调试信息中输出，跟微信支付返回的验签信息进行仔细对比，排查以下几种常见的错误：

#### 签名串的最后一行没有附加换行符

如果请求报文主体为空（如 GET 请求），最后一行应为一个换行符。

#### 签名串中的参数，跟实际请求的参数不一致

- 手工拼接的 URL，和实际请求发送的不一致。我们建议的实现是，使用 HTTP 库构造请求对象或者 URL 对象，再使用相应的方法取得 URL。
- 签名和设置 Authorization 头时，使用了前后生成的两个时间戳。
- 签名和设置 Authorization 头时，使用了前后生成的两个不同的随机串。
- 签名和请求时，使用了前后两次序列化的 JSON 串作为请求主体。

> 商户的开发者可以将关键参数生成并保存在变量中，签名和发送请求时统一使用，避免前后生成的信息不一致。

#### 文本的编码不一致

生成签名串使用了非 UTF-8 编码或者未设置具体编码。

#### 使用了错误的商户私钥

开发者可以使用如下的 openssl 命令检查私钥和商户证书中的 modulus（p、q 两个大素数的乘积）是否一致。如果两者一致，那么私钥和证书是成对的。

```sh
$ openssl x509 -noout -modulus -in 1900009191_20180326_cert.pem
Modulus=C6D43C87B991...
$ openssl rsa -noout -modulus -in 1900009191_20180326_key.pem
Modulus=C6D43C87B991...
```

> 1. modulus 长度为 2048 位，输出为 512 个字节。
> 2. 检查密钥匹配前，请先查看证书序列号，检查是否是正确的商户证书。
