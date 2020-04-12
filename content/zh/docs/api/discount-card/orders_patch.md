---
title: '更新先享卡订单 API'
linkTitle: '更新先享卡订单'
date: '2020-03-26'
weight: 1
description: >
  当用户在商户侧消费时, 用户完成微信先享卡的目标或者领取奖励时, 商户需要将信息同步至微信先享卡平台, 用于在微信先享卡小程序展示及先享卡到期后的用户结算。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/discount-card/orders/{out_order_no}\
**请求方式**: Patch\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

变量 |类型 |必填 |参数名/描述/示例值

先享卡订单号 out_order_no string(64） 是 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95 +目标达成明细列表 objectives array 条件选填 1、用户完成的目标明细列表, objectives(目标达成明细列表）和 rewards(奖励明细列表）二选一必填或者两者都填, 但不可同时为空。
2、用户完成的目标明细列表, 一次更新请求列表最大长度为 5。 +奖励明细列表 rewards array 否 1、用户获得的奖励明细列表, objectives(目标达成明细列表）和 rewards(奖励明细列表）二选一必填或者两者都填, 但不可同时为空。
2、用户获得的奖励明细列表, 一次更新请求列表最大长度为 5。

### 请求示例

```json
{
  "objectives": [
    {
      "objective_serial_no": "578354545",
      "objective_id": 123456,
      "count": 1,
      "performance_time": "2015-05-20T13:29:35.120+08:00",
      "performance_description": "购买商品",
      "performance_type": "INCREASE",
      "remark": "特价商品"
    }
  ],
  "rewards": [
    {
      "reward_serial_no": "578354",
      "reward_id": 123456,
      "count": 100,
      "amount": 1,
      "reward_time": "2015-05-20T13:29:35.120+08:00",
      "description": "购买商品",
      "reward_type": "INCREASE",
      "remark": "特价商品"
    }
  ]
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

先享卡订单号 out_order_no string(64） 是 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95
微信支付服务订单号 order_id string(64） 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651

### 返回示例

```json
{
  "out_order_no": "233bcbf407e87789b8e471f251774f95",
  "order_id": "15646546545165651651"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
404 RESOURCE_NOT_EXISTS 订单不存在, 请检查订单号是否正确 请传入正确的订单号
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 当前状态无需操作
401 SIGN_ERROR 签名验证失败 请检查签名参数和方法是否都符合签名算法要求
403 NO_AUTH 权限异常 请开通商户号相关权限, 请联系产品或商务申请
429 FREQUENCY_LIMITED 请求超过频率限制 请求未受理, 请降低频率后重试
