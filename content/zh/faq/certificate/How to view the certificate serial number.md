---
title: '如何查看证书序列号？'
weight: 8
---

登陆商户平台`API 安全`->`API 证书`->`查看证书`, 可查看商户 API 证书序列号。

商户 API 证书和微信支付平台证书均可以使用第三方的证书[解析工具](https://myssl.com/cert_decode.html), 查看证书内容。或者使用 openssl 命令行工具查看证书序列号。

```sh
$ openssl x509 -in 1900009191_20180326_cert.pem -noout -serial
serial=1DDE55AD98ED71D6EDD4A4A16996DE7B47773A8C
```
