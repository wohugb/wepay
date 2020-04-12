---
title: '电商收付通-进件接口文档'
linkTitle: '商户进件'
weight: 4
description: >
  电商收付通-进件接口业务流程
type: 'docs'
---

![](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/ecommerce/chapter2_3_1.png)

`步骤一` 用户提交商家进件资料后, 电商平台通过调用[二级商户进件](./applyments_post.md)接口帮助二级商户提交商户进件资料。\
`步骤二` 提交进件资料后, 电商平台需通过微信支付返回的“微信支付申请单号”和“业务申请编号”商户后台调用[查询申请状态 API](./applyments_get.md)接口查询二级商户进件状态。\
`步骤三` 当进件成功后, 若二级商户需修改结算帐号时, 电商平台可调用[修改商户结算信息 API](./sub_merchants-modify-settlement.md)接口来帮助二级商户修改结算信息。通过调用商户后台调用[查询商户结算信息 API](./sub_merchants-settlement.md)接口来查询修改情况。
