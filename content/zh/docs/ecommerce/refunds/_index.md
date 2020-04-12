---
title: '电商收付通-退款'
linkTitle: '退款'
weight: 7
description: >
  电商收付通-退款开发流程
type: 'docs'
---

业务流程图:

![](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/ecommerce/chapter2_3_5.png)

`步骤一`发生退款订单, 通过《退款申请》接口支付款按原路退到买家帐号上。\
`步骤二`退款状态改变后, 微信支付会把相关退款结果发送给商户。商户也可调用《查询退款》接口查看退款状态。
