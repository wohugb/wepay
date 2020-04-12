---
title: '支付有礼'
linkTitle: '支付有礼'
weight: 4
description: >
  商家使用微信支付后, 可领取微信支付代金券
type: 'docs'
---

## 接入流程

准备工作
证书&签名准备
证书和签名的详细内容请参见: 接口规则

API 密钥设置
API 密钥的详细内容请参见: APIv3 证书和密钥

下载 API 证书
商户在使用代金券时, 需要安装证书, 请在商户平台下载证书。具体操作请参见: 如何获取 API 证书

![](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/marketing/chapter1_1_3.png)

## 开发指引

![业务流程时序图: ](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/marketing/chapter2_3_3.png)

`步骤一` 商户创建商家券后, 可通过《创建买 A 送 B 券活动》、《创建全场满额送活动》、《创建全场阶梯送活动》接口创建支付有礼活动, 微信支付生成支付有礼活动并返回活动 ID 给到商户。

`步骤二` 用户确认支付后, 在支付结果展示界面领取优惠券。用户领券成功, 返回领券消息通知。

`步骤三` 支付有礼活动创建后, 商户可通过《获取活动详情接口》、《获取活动发券商户号》、《获取活动指定商品列表》查询管理活动。

`步骤四` 活动创建后, 如需结束活动, 可通过《终止活动》接口, 结束活动。
