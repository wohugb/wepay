---
title: '获取商户开户意愿确认状态 API'
linkTitle: '获取商户开户意愿确认状态'
date: '2019-08-08'
weight: 3
description: >
  当服务商需要确认微信支付子商户号是否完成确认时, 如果调用此接口提到”已授权“状态, 则说明该商户号已完成开户意愿确认。
type: 'docs'
---

## 接口说明

**适用对象**: 从业机构 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/apply4subject/applyment/merchants/{sub_mchid}/state\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量      | 类型       | 必填 | 参数名/描述/示例值                                     |
| --------- | ---------- | ---- | ------------------------------------------------------ |
| sub_mchid | string(32) | 是   | `特约商户号` `path` 微信支付分配的特约商户的唯一标识。 |
|           |            |      | 20000011111                                            |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/apply4subject/applyment/merchants/20000011111/state

## 返回参数

| 变量            | 类型       | 必填 | 参数名/描述/示例值                                                                                   |
| --------------- | ---------- | ---- | ---------------------------------------------------------------------------------------------------- |
| authorize_state | string(32) | 是   | `授权状态`<br>枚举值:<br>AUTHORIZE_STATE_UNAUTHORIZED: 未授权<br>AUTHORIZE_STATE_AUTHORIZED : 已授权 |
|                 |            |      | AUTHORIZE_STATE_AUTHORIZED                                                                           |

### 返回示例

正常示例

```json
{
  "authorize_state": "AUTHORIZE_STATE_AUTHORIZED"
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码          | 描述         | 解决方案                                   |
| ------ | --------------- | ------------ | ------------------------------------------ |
| 500    | SYSTEMERROR     | 系统错误     | 系统异常, 请使用相同参数稍后重新调用       |
| 400    | PARAM_ERROR     | 参数错误     | 请使用正确的参数重新调用                   |
| 400    | INVALID_REQUEST | 无效请求     | 请查看返回的错误信息, 根据错误信息进行操作 |
| 403    | NOAUTH          | 商户权限异常 | 请确认是否已经开通相关权限                 |
