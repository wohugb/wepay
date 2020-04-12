---
title: '如何在程序中加载私钥'
weight: 1
---

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
