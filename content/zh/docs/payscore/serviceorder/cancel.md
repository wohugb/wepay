---
title: '取消支付分订单 API'
linkTitle: '取消支付分订单'
date: 2019.08.23
weight: 3
description: >
  服务从未实际发生, 且确认用户不使用服务, 商户可使用此能力取消订单。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 本能力仅在“服务从未实际发生”时使用。若服务已发生, 但不需要向用户收钱(例如优惠金额已经抵扣了所有的付费项目金额）, 请使用完结订单能力 0 元结单。

## 接口说明

**适用对象**: 微信支付分\
**请求 URL**: https://api.mch.weixin.qq.com/v3/payscore/serviceorder/{out_order_no}/cancel\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

前置条件: 服务订单状态为已创单或进行中, 且从未成功使用完结订单能力

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

商户服务订单号 out_order_no string(32) 是 path 商户系统内部服务订单号(不是交易单号）, 与创建订单时一致。
|||2304203423948239423
公众账号 ID appid string(32) 是 query 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
此参数需在本系统先进行配置, 并与创建订单时的 appid 保持一致。
|||wxd678efh567hg6787
服务 ID service_id string(32) 是 query 该服务 ID 有本接口对应产品的权限。
|||500001
取消原因 reason string(50) 是 query 按照字符计算, 超过长度报错处理。
|||用户投诉

### 请求示例

```json
{
  "appid": "wxd678efh567hg6787",
  "service_id": "500001",
  "reason": "用户投诉"
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

公众账号 ID appid string(32) 是 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
此参数需在本系统先进行配置, 并与创建订单时的 appid 保持一致。
|||wxd678efh567hg6787
商户号 mchid string(32) 是 调用接口提交的商户号。
|||1230000109
商户订单号 out_order_no string(32) 是 调用接口提交的商户服务订单号。
|||1230000109
服务 ID service_id string(32) 是 调用该接口提交的服务 ID。
|||500001
微信支付服务订单号 order_id string(128) 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651

### 返回示例

```json
{
  "appid": "wxd678efh567hg6787",
  "mchid": "1230000109",
  "out_order_no": "1230000109",
  "service_id": "500001",
  "order_id": "15646546545165651651"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM*ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户信息不合法 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 请确认相同单号是否使用了不同的参数
404 ORDER_NOT* EXIST 订单不存在 确认入参, 传入正确单据
400 INVALID_ORDER_STATE 单据状态错误 确认操作是否符合流程
400 ORDER_CANCELED 单据已取消 当前状态无需操作
400 ORDER_DONE 订单已完成 当前状态无需操作
