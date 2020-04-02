---
title: '签名生成'
weight: 41
type: 'docs'
---

商户可以按照下述步骤生成请求的签名。在本节的最后，我们准备了多种常用编程语言的演示代码供开发者参考。

微信支付 API v3 要求商户对请求进行签名。微信支付会在收到请求后进行签名的验证。如果签名验证不通过，微信支付 API v3 将会拒绝处理请求，并返回 `401 Unauthorized`。

## 准备

商户需要拥有一个微信支付商户号，并通过超级管理员账号登陆商户平台，获取商户 API 证书。商户 API 证书的压缩包中包含了签名必需的私钥和商户证书。

## 构造签名串

我们希望商户的技术开发人员按照当前文档约定的规则构造签名串。微信支付会使用同样的方式构造签名串。如果商户构造签名串的方式错误，将导致签名验证不通过。下面先说明签名串的具体格式。

签名串一共有五行，每一行为一个参数。行尾以`\n`（换行符，ASCII 编码值为 0x0A）结束，包括最后一行。如果参数本身以`\n` 结束，也需要附加一个`\n`。

```
HTTP 请求方法\n
URL\n
请求时间戳\n
请求随机串\n
请求报文主体\n
```

我们通过在命令行中调用"获取微信支付平台证书"接口，一步一步向开发者介绍如何进行请求签名。按照接口文档，获取商户平台证书的 URL 为`https://api.mch.weixin.qq.com/v3/certificates`，请求方法为`GET`，没有查询参数。

### 第一步 请求方法

获取 HTTP 请求的方法（`GET`,`POST`,`PUT` 等）

```
GET
```

### 第二步 绝对 URL

获取请求的绝对 URL，并去除域名部分得到参与签名的 URL。如果请求中有查询参数，URL 末尾应附加有'?'和对应的查询字符串。

```
/v3/certificates
```

### 第三步 当前时间戳

获取发起请求时的系统当前时间戳，即格林威治时间 1970 年 01 月 01 日 00 时 00 分 00 秒(北京时间 1970 年 01 月 01 日 08 时 00 分 00 秒)起至现在的总秒数，作为请求时间戳。微信支付会拒绝处理很久之前发起的请求，请商户保持自身系统的时间准确。

```shell
date +%s
```

1554208460

### 第四步 随机串

生成一个请求随机串，可参见生成随机数算法。这里，我们使用命令行直接生成一个。

```shell
hexdump -n 16 -e '4/4 "%08X" 1 "\n"' /dev/random
593BEC0C930BF1AFEB40B4A08C8FB242
```

### 第五步 报文主体

获取请求中的请求报文主体（request body）。

请求方法为 GET 时，报文主体为空。

当请求方法为 POST 或 PUT 时，请使用真实发送的 JSON 报文。

图片上传 API，请使用 meta 对应的 JSON 报文。

对于下载证书的接口来说，请求报文主体是一个空串。

### 第六步 构造签名

按照前述规则，构造的请求签名串为：

```
GET\n
/v3/certificates\n
1554208460\n
593BEC0C930BF1AFEB40B4A08C8FB242\n
\n
```

## 计算签名值

绝大多数编程语言提供的签名函数支持对签名数据进行签名。强烈建议商户调用该类函数，使用商户私钥对待签名串进行 SHA256 with RSA 签名，并对签名结果进行 Base64 编码得到签名值。

下面我们使用命令行演示如何生成签名。

```shell
echo -n -e \
 "GET\n/v3/certificates\n1554208460\n593BEC0C930BF1AFEB40B4A08C8FB242\n\n" \
 | openssl dgst -sha256 -sign apiclient_key.pem \
 | openssl base64 -A

uOVRnA4qG/MNnYzdQxJanN+zU+lTgIcnU9BxGw5dKjK+VdEUz2FeIoC+D5sB/LN+nGzX3hfZg6r5wT1pl2ZobmIc6p0ldN7J6yDgUzbX8Uk3sD4a4eZVPTBvqNDoUqcYMlZ9uuDdCvNv4TM3c1WzsXUrExwVkI1XO5jCNbgDJ25nkT/c1gIFvqoogl7MdSFGc4W4xZsqCItnqbypR3RuGIlR9h9vlRsy7zJR9PBI83X8alLDIfR1ukt1P7tMnmogZ0cuDY8cZsd8ZlCgLadmvej58SLsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/4nLBiCwIUFluw==
```

## 设置 HTTP 头

微信支付商户 API v3 要求请求通过 HTTP `Authorization` 头来传递签名。`Authorization` 由认证类型和签名信息两个部分组成。

```
Authorization: 认证类型 签名信息
```

具体组成为：

1. 认证类型，目前为 `WECHATPAY2-SHA256-RSA2048`
2. 签名信息

   - 发起请求的商户（包括直连商户、服务商或渠道商）的商户号 `mchid`
   - 商户 API 证书序列号 `serial_no` ，用于声明所使用的证书 ​
   - 求随机串 `nonce_str`
   - 时间戳 `timestamp`
   - 签名值 `signature`

   注：以上五项签名信息，无顺序要求。

`Authorization` 头的示例如下：（注意，示例因为排版可能存在换行，实际数据应在一行）

```
Authorization: WECHATPAY2-SHA256-RSA2048 mchid="1900009191",nonce_str="593BEC0C930BF1AFEB40B4A08C8FB242",signature="uOVRnA4qG/MNnYzdQxJanN+zU+lTgIcnU9BxGw5dKjK+VdEUz2FeIoC+D5sB/LN+nGzX3hfZg6r5wT1pl2ZobmIc6p0ldN7J6yDgUzbX8Uk3sD4a4eZVPTBvqNDoUqcYMlZ9uuDdCvNv4TM3c1WzsXUrExwVkI1XO5jCNbgDJ25nkT/c1gIFvqoogl7MdSFGc4W4xZsqCItnqbypR3RuGIlR9h9vlRsy7zJR9PBI83X8alLDIfR1ukt1P7tMnmogZ0cuDY8cZsd8ZlCgLadmvej58SLsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/4nLBiCwIUFluw==",timestamp="1554208460",serial_no="1DDE55AD98ED71D6EDD4A4A16996DE7B47773A8C"
```

最终我们可以组一个包含了签名的 HTTP 请求了。

```shell
$ curl https://api.mch.weixin.qq.com/v3/certificates -H 'Authorization: WECHATPAY2-SHA256-RSA2048 mchid="1900009191",nonce_str="593BEC0C930BF1AFEB40B4A08C8FB242",signature="uOVRnA4qG/MNnYzdQxJanN+zU+lTgIcnU9BxGw5dKjK+VdEUz2FeIoC+D5sB/LN+nGzX3hfZg6r5wT1pl2ZobmIc6p0ldN7J6yDgUzbX8Uk3sD4a4eZVPTBvqNDoUqcYMlZ9uuDdCvNv4TM3c1WzsXUrExwVkI1XO5jCNbgDJ25nkT/c1gIFvqoogl7MdSFGc4W4xZsqCItnqbypR3RuGIlR9h9vlRsy7zJR9PBI83X8alLDIfR1ukt1P7tMnmogZ0cuDY8cZsd8ZlCgLadmvej58SLsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/4nLBiCwIUFluw==",timestamp="1554208460",serial_no="1DDE55AD98ED71D6EDD4A4A16996DE7B47773A8C"'
```

## 演示代码

开发者可以查看开发工具相关章节，获取对应语言的库。如何在程序中加载私钥，请参考常见问题。

计算签名的示例代码如下。

Java

```java
import okhttp3.HttpUrl;
import java.security.Signature;
import java.util.Base64;

// Authorization: <schema> <token>
// GET - getToken("GET", httpurl, "")
// POST - getToken("POST", httpurl, json)
String schema = "WECHATPAY2-SHA256-RSA2048";
HttpUrl httpurl = HttpUrl.parse(url);

String getToken(String method, HttpUrl url, String body) {
    String nonceStr = "your nonce string";
    long timestamp = System.currentTimeMillis() / 1000;
    String message = buildMessage(method, url, timestamp, nonceStr, body);
    String signature = sign(message.getBytes("utf-8"));

    return "mchid=\"" + yourMerchantId + "\","
    + "nonce_str=\"" + nonceStr + "\","
    + "timestamp=\"" + timestamp + "\","
    + "serial_no=\"" + yourCertificateSerialNo + "\","
    + "signature=\"" + signature + "\"";
}

String sign(byte[] message) {
    Signature sign = Signature.getInstance("SHA256withRSA");
    sign.initSign(yourPrivateKey);
    sign.update(message);

    return Base64.getEncoder().encodeToString(sign.sign());
}

String buildMessage(String method, HttpUrl url, long timestamp, String nonceStr, String body) {
    String canonicalUrl = url.encodedPath();
    if (url.encodedQuery() != null) {
      canonicalUrl += "?" + url.encodedQuery();
    }

    return method + "\n"
        + canonicalUrl + "\n"
        + timestamp + "\n"
        + nonceStr + "\n"
        + body + "\n";
}
```

PHP

```php
// Authorization: <schema> <token>
$url_parts = parse_url($url);
$canonical_url = ($url_parts['path'] . (!empty($url_parts['query']) ? "?${url_parts['query']}" : ""));
$message = $http_method."\n".
    $canonical_url."\n".
    $timestamp."\n".
    $nonce."\n".
    $body."\n";

openssl_sign($message, $raw_sign, $mch_private_key, 'sha256WithRSAEncryption');
$sign = base64_encode($raw_sign);

$schema = 'WECHATPAY2-SHA256-RSA2048';
$token = sprintf('mchid="%s",nonce_str="%s",timestamp="%d",serial_no="%s",signature="%s"',
    $merchant_id, $nonce, $timestamp, $serial_no, $sign);
```

.Net

```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

namespace HttpHandlerDemo
{
    // 使用方法
    // HttpClient client = new HttpClient(new HttpHandler("{商户号}", "{商户证书序列号}"));
    // ...
    // var response = client.GetAsync("https://api.mch.weixin.qq.com/v3/certificates");
    public class HttpHandler : DelegatingHandler
    {
        private readonly string merchantId;
        private readonly string serialNo;

        public HttpHandler(string merchantId, string merchantSerialNo)
        {
            InnerHandler = new HttpClientHandler();

            this.merchantId = merchantId;
            this.serialNo = merchantSerialNo;
        }

        protected async override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            var auth = await BuildAuthAsync(request);
            string value = $"WECHATPAY2-SHA256-RSA2048 {auth}";
            request.Headers.Add("Authorization", value);

            return await base.SendAsync(request, cancellationToken);
        }

        protected async Task<string> BuildAuthAsync(HttpRequestMessage request)
        {
            string method = request.Method.ToString();
            string body = "";
            if (method == "POST" || method == "PUT" || method == "PATCH")
            {
                var content = request.Content;
                body = await content.ReadAsStringAsync();
            }

            string uri = request.RequestUri.PathAndQuery;
            var timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();
            string nonce = Path.GetRandomFileName();

            string message = $"{method}\n{uri}\n{timestamp}\n{nonce}\n{body}\n";
            string signature = Sign(message);
            return $"mchid=\"{merchantId}\",nonce_str=\"{nonce}\",timestamp=\"{timestamp}\",serial_no=\"{serialNo}\",signature=\"{signature}\"";
        }

        protected string Sign(string message)
        {
            // NOTE： 私钥不包括私钥文件起始的-----BEGIN PRIVATE KEY-----
            //        亦不包括结尾的-----END PRIVATE KEY-----
            string privateKey = "{你的私钥}";
            byte[] keyData = Convert.FromBase64String(privateKey);
            using (CngKey cngKey = CngKey.Import(keyData, CngKeyBlobFormat.Pkcs8PrivateBlob))
            using (RSACng rsa = new RSACng(cngKey))
            {
                byte[] data = System.Text.Encoding.UTF8.GetBytes(message);
                return Convert.ToBase64String(rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1));
            }
        }
    }
}
```

如果您的请求返回了签名错误 `401 Unauthorized`，请参考常见问题之签名相关
