---
title: '如何定位"错误的签名, 导致验签失败 “的错误？'
weight: 3
---

为了方便开发者定位, 我们对于验签失败, 会在应答的错误详情 detail 中加入验签信息。验签信息是我们根据商户的 HTTP 请求构造签名串的各种信息。

- method, HTTP 请求方法
- url, 请求的 URL
- truncated_sign_message, 微信支付验签时使用的签名串(换行符显示成\n）。为了方便查看, 我们对最后的请求报文主体做了截断
- sign_message_length, 微信支付验签时使用的签名串的字节长度

```json
{
  "code": "SIGN_ERROR",
  "message": "错误的签名, 验签失败",
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

建议开发者在程序中将自己组装的签名串以及签名串的字节长度在调试信息中输出, 跟微信支付返回的验签信息进行仔细对比, 排查以下几种常见的错误:

1. 签名串的最后一行没有附加换行符
   如果请求报文主体为空(如 GET 请求）, 最后一行应为一个换行符。
2. 签名串中的参数, 跟实际请求的参数不一致

   - 手工拼接的 URL, 和实际请求发送的不一致。我们建议的实现是, 使用 HTTP 库构造请求对象或者 URL 对象, 再使用相应的方法取得 URL。
   - 签名和设置 Authorization 头时, 使用了前后生成的两个时间戳。
   - 签名和设置 Authorization 头时, 使用了前后生成的两个不同的随机串。
   - 签名和请求时, 使用了前后两次序列化的 JSON 串作为请求主体。

   > 商户的开发者可以将关键参数生成并保存在变量中, 签名和发送请求时统一使用, 避免前后生成的信息不一致。

3. 文本的编码不一致

   生成签名串使用了非 UTF-8 编码或者未设置具体编码。

4. 使用了错误的商户私钥

   开发者可以使用如下的 openssl 命令检查私钥和商户证书中的 modulus(p、q 两个大素数的乘积）是否一致。如果两者一致, 那么私钥和证书是成对的。

   ```sh
   $ openssl x509 -noout -modulus -in 1900009191_20180326_cert.pem
   Modulus=C6D43C87B991...
   $ openssl rsa -noout -modulus -in 1900009191_20180326_key.pem
   Modulus=C6D43C87B991...
   ```

   > 1. modulus 长度为 2048 位, 输出为 512 个字节。
   > 2. 检查密钥匹配前, 请先查看证书序列号, 检查是否是正确的商户证书。
