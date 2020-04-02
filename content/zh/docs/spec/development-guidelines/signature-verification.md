---
title: '签名验证'
weight: 42
type: 'docs'
---

商户可以按照下述步骤验证应答或者回调的签名。
如果验证商户的请求签名正确，微信支付会在应答的 HTTP 头部中包括应答签名。我们建议商户验证应答签名。

同样的，微信支付会在回调的 HTTP 头部中包括回调报文的签名。商户必须验证回调的签名，以确保回调是由微信支付发送。

## 获取平台证书

微信支付 API v3 使用微信支付的平台私钥（不是商户私钥）进行应答签名。相应的，商户的技术人员应使用微信支付平台证书中的公钥验签。目前平台证书只提供 API 进行下载，请参考获取平台证书列表。

> :: 再次提醒，应答和回调的签名验证使用的是微信支付平台证书，不是商户 API 证书。使用商户 API 证书是验证不过的。

## 检查平台证书序列号

微信支付的平台证书序列号位于 HTTP 头 Wechatpay-Serial。验证签名前，请商户先检查序列号是否跟商户当前所持有的微信支付平台证书的序列号一致。如果不一致，请重新获取证书。否则，签名的私钥和证书不匹配，将无法成功验证签名。

## 构造验签名串

首先，商户先从应答中获取以下信息。

- HTTP 头 Wechatpay-Timestamp 中的应答时间戳。
- HTTP 头 Wechatpay-Nonce 中的应答随机串
- 应答主体（response Body）

然后，请按照以下规则构造应答的验签名串。签名串共有三行，行尾以\n 结束，包括最后一行。\n 为换行符（ASCII 编码值为 0x0A）。若应答报文主体为空（如 HTTP 状态码为 204 No Content），最后一行仅为一个\n 换行符。

```
应答时间戳\n
应答随机串\n
应答报文主体\n
```

如某个应答的 HTTP 报文为（省略了 ciphertext 的具体内容）：

```
HTTP/1.1 200 OK
Server: nginx
Date: Tue, 02 Apr 2019 12:59:40 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 2204
Connection: keep-alive
Keep-Alive: timeout=8
Content-Language: zh-CN
Request-ID: e2762b10-b6b9-5108-a42c-16fe2422fc8a
Wechatpay-Nonce: c5ac7061fccab6bf3e254dcf98995b8c
Wechatpay-Signature: CtcbzwtQjN8rnOXItEBJ5aQFSnIXESeV28Pr2YEmf9wsDQ8Nx25ytW6FXBCAFdrr0mgqngX3AD9gNzjnNHzSGTPBSsaEkIfhPF4b8YRRTpny88tNLyprXA0GU5ID3DkZHpjFkX1hAp/D0fva2GKjGRLtvYbtUk/OLYqFuzbjt3yOBzJSKQqJsvbXILffgAmX4pKql+Ln+6UPvSCeKwznvtPaEx+9nMBmKu7Wpbqm/+2ksc0XwjD+xlvlECkCxfD/OJ4gN3IurE0fpjxIkvHDiinQmk51BI7zQD8k1znU7r/spPqB+vZjc5ep6DC5wZUpFu5vJ8MoNKjCu8wnzyCFdA==
Wechatpay-Timestamp: 1554209980
Wechatpay-Serial: 5157F09EFDC096DE15EBE81A47057A7232F1B8E1
Cache-Control: no-cache, must-revalidate
​
{"data":[{"serial_no":"5157F09EFDC096DE15EBE81A47057A7232F1B8E1","effective_time":"2018-03-26T11:39:50+08:00","expire_time":"2023-03-25T11:39:50+08:00","encrypt_certificate":{"algorithm":"AEAD_AES_256_GCM","nonce":"4de73afd28b6","associated_data":"certificate","ciphertext":"..."}}]}
```

则验签名串为

```
1554209980
c5ac7061fccab6bf3e254dcf98995b8c
{"data":[{"serial_no":"5157F09EFDC096DE15EBE81A47057A7232F1B8E1","effective_time":"2018-03-26T11:39:50+08:00","expire_time":"2023-03-25T11:39:50+08:00","encrypt_certificate":{"algorithm":"AEAD_AES_256_GCM","nonce":"4de73afd28b6","associated_data":"certificate","ciphertext":"..."}}]}
```

## 获取应答签名

微信支付的应答签名通过 HTTP 头 Wechatpay-Signature 传递。（注意，示例因为排版可能存在换行，实际数据应在一行）

```
Wechatpay-Signature: CtcbzwtQjN8rnOXItEBJ5aQFSnIXESeV28Pr2YEmf9wsDQ8Nx25ytW6FXBCAFdrr0mgqngX3AD9gNzjnNHzSGTPBSsaEkIfhPF4b8YRRTpny88tNLyprXA0GU5ID3DkZHpjFkX1hAp/D0fva2GKjGRLtvYbtUk/OLYqFuzbjt3yOBzJSKQqJsvbXILffgAmX4pKql+Ln+6UPvSCeKwznvtPaEx+9nMBmKu7Wpbqm/+2ksc0XwjD+xlvlECkCxfD/OJ4gN3IurE0fpjxIkvHDiinQmk51BI7zQD8k1znU7r/spPqB+vZjc5ep6DC5wZUpFu5vJ8MoNKjCu8wnzyCFdA==
```

对 Wechat-Signature 的字段值使用 Base64 进行解码，得到应答签名。

## 验证签名

很多编程语言的签名验证函数支持对验签名串和签名进行签名验证。强烈建议商户调用该类函数，使用微信支付平台公钥对验签名串和签名进行 SHA256 with RSA 签名验证。

下面展示使用命令行演示如何进行验签。假设我们已经获取了平台证书并保存为 1900009191_wxp_cert.pem。

首先，从微信支付平台证书导出微信支付平台公钥

```
$ openssl x509 -in 1900009191_wxp_cert.pem -pubkey -noout > 1900009191_wxp_pub.pem
$ cat 1900009191_wxp_pub.pem
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zej1cqugGQtVSY2Ah8R
MCKcr2UpZ8Npo+5Ja9xpFPYkWHaF1Gjrn3d5kcwAFuHHcfdc3yxDYx6+9grvJnCA
2zQzWjzVRa3BJ5LTMj6yqvhEmtvjO9D1xbFTA2m3kyjxlaIar/RYHZSslT4VmjIa
tW9KJCDKkwpM6x/RIWL8wwfFwgz2q3Zcrff1y72nB8p8P12ndH7GSLoY6d2Tv0OB
2+We2Kyy2+QzfGXOmLp7UK/pFQjJjzhSf9jxaWJXYKIBxpGlddbRZj9PqvFPTiep
8rvfKGNZF9Q6QaMYTpTp/uKQ3YvpDlyeQlYe4rRFauH3mOE6j56QlYQWivknDX9V
rwIDAQAB
-----END PUBLIC KEY-----
```

Java 支持使用证书初始化签名对象，详见 initVerify(Certificate)，并不需要先导出公钥。

然后，把签名 base64 解码后保存为文件 signature.txt

```
\$ openssl base64 -d -A <<< \ 'CtcbzwtQjN8rnOXItEBJ5aQFSnIXESeV28Pr2YEmf9wsDQ8Nx25ytW6FXBCAFdrr0mgqngX3AD9gNzjnNHzSGTPBSsaEkIfhPF4b8YRRTpny88tNLyprXA0GU5ID3DkZHpjFkX1hAp/D0fva2GKjGRLtvYbtUk/OLYqFuzbjt3yOBzJSKQqJsvbXILffgAmX4pKql+Ln+6UPvSCeKwznvtPaEx+9nMBmKu7Wpbqm/+2ksc0XwjD+xlvlECkCxfD/OJ4gN3IurE0fpjxIkvHDiinQmk51BI7zQD8k1znU7r/spPqB+vZjc5ep6DC5wZUpFu5vJ8MoNKjCu8wnzyCFdA==' > signature.txt
```

最后，验证签名

```
\$ openssl dgst -sha256 -verify 1900009191_wxp_pub.pem -signature signature.txt << EOF
1554209980
c5ac7061fccab6bf3e254dcf98995b8c
{"data":[{"serial_no":"5157F09EFDC096DE15EBE81A47057A7232F1B8E1","effective_time":"2018-03-26T11:39:50+08:00","expire_time":"2023-03-25T11:39:50+08:00","encrypt_certificate":{"algorithm":"AEAD_AES_256_GCM","nonce":"d215b0511e9c","associated_data":"certificate","ciphertext":"..."}}]}
EOF
Verified OK
```
