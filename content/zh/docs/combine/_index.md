---
title: '合单支付API'
linkTitle: '合单支付'
weight: 2
description: >
  电商平台通过该接口可以实现多商户(最多50个二级商户）商品同时支付的场景
type: 'docs'
---

![业务流程图](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/ecommerce/chapter2_3_6.png)

`步骤一` 用户下单发起支付, 商户可通过微信支付《合单下单-APP 支付/JS 支付》创建合单支付订单。\
`步骤二` 商户通过小程序《APP 调起支付/JS 调起支付》调起微信支付, 发起支付请求。\
`步骤三` 用户支付成功后, 商户可接收岛微信支付支付结果通知《支付通知》。\
`步骤四` 商户也可主动调用《合单查询订单》查询支付结果。
