---
title: '私钥和证书'
weight: 31
type: 'docs'
---

介绍商户 API 私钥、证书和微信支付平台证书的获取和使用方式

## 商户 API 证书

商户 API 证书是指由商户申请的，包含商户的商户号、公司名称、公钥信息的证书。

微信支付 API v3 使用由证书授权机构(Certificate Authority ，简称 CA)签发颁发的证书。商户需下载证书工具生成证书请求串，并将证书请求串提交到商户平台后才能获得商户 API 证书文件。

- 新接入商户请参考[什么是 API 证书？如何获取 API 证书？](http://kf.qq.com/faq/161222NneAJf161222U7fARv.html)。
- 已经接入并使用微信支付颁发证书的商户请参考[微信支付 API 证书升级指引（技术人员）](http://kf.qq.com/faq/180824JvUZ3i180824YvMNJj.html)。**API v3 已不支持使用微信支付颁发的证书**。

> - 证书升级不影响已有服务。
> - 微信支付颁发的证书，将在升级后 14 天后失效。请务必尽快用新证书替换服务器上的老证书。

## 商户 API 私钥

商户申请商户 API 证书时，会生成商户私钥，并保存在本地证书文件夹的文件 **apiclient_key.pem** 中。私钥也可以通过工具从商户的 `p12` 证书中导出。请妥善保管好你的商户私钥文件。

> :exclamation: 不要把私钥文件暴露在公共场合，如上传到 Github，写在客户端代码等。

## 平台证书

平台证书是指由**微信支付**负责申请的，包含微信支付平台标识、公钥信息的证书。商户可以使用平台证书中的公钥进行验签。

微信支付平台证书请调用“[获取平台证书接口](https://wechatpay-api.gitbook.io/wechatpay-api-v3/jie-kou-wen-dang/ping-tai-zheng-shu#huo-qu-ping-tai-zheng-shu-lie-biao)“获取。

> - 不同的商户，对应的微信支付平台证书是不一样的
> - 平台证书会周期性更换。建议商户定时通过 API 下载新的证书，不要依赖人工更换证书

## 声明所使用的证书

某些情况下，将需要更新密钥对和证书。为了保证更换过程中不影响 API 的使用，请求和应答的 HTTP 头部中包括证书序列号，以声明签名或者加密所用的密钥对和证书。

- 商户签名使用**商户私钥**，证书序列号包含在请求 HTTP 头部的 `Authorization` 的 `serial_no`
- 微信支付签名使用**微信支付平台私钥**，证书序列号包含在应答 HTTP 头部的 `Wechatpay-Serial`
- 商户上送敏感信息时使用**微信支付平台公钥**加密，证书序列号包含在请求 HTTP 头部的 `Wechatpay-Serial`

> :exclamation: 请参考如何查看证书序列号。