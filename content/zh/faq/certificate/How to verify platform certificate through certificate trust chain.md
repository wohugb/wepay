---
title: '如何通过证书信任链验证平台证书？'
weight: 12
---

下面介绍如何使用 openssl 工具, 通过证书信任链验证平台证书。

首先, 从微信支付商户平台下载平台证书信任链 [CertTrustChain.p7b](https://wx.gtimg.com/mch/files/CertTrustChain.p7b), 并将它转换为 pem 证书格式。

```sh
openssl pkcs7 -print_certs -in CertTrustChain.p7b -inform der -out CertTrustChain.pem
```

然后, `-CAfile file` 指定受信任的证书, 验证下载的平台证书

```sh
openssl verify -verbose -CAfile ./CertTrustChain.pem ./WeChatPayPlatform.pem
```
