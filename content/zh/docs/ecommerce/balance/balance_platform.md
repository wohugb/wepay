---
title: '查询电商平台账户实时余额API'
linkTitle: '平台实时余额'
date: '2020-03-13'
weight: 3
description: >
  电商平台可通过此接口可以查询本商户号的账号余额情况。
type: 'docs'
---

## 接口说明

**适用对象**: 电商平台\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant/fund/balance/{account_type}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量         | 类型   | 必填 | 参数名/描述/示例值                                                                    |
| ------------ | ------ | ---- | ------------------------------------------------------------------------------------- |
| account_type | string | 是   | path `账户类型` 枚举值:<br>BASIC: 基本账户<br>OPERATION: 运营账户<br>FEES: 手续费账户 |
|              |        |      | BASIC                                                                                 |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/merchant/fund/balance/BASIC

## 返回参数

| 变量             | 类型  | 必填 | 参数名/描述/示例值                          |
| ---------------- | ----- | ---- | ------------------------------------------- |
| available_amount | int64 | 是   | `可用余额`(单位: 分）, 此余额可做提现操作。 |
|                  |       |      | 100                                         |
| pending_amount   | int64 | 否   | `不可用余额`(单位: 分）。                   |
|                  |       |      | 100                                         |

### 返回示例

正常示例

```json
{
  "available_amount": 10000,
  "pending_amount": 0
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码          | 描述                           | 解决方案                        |
| ------ | --------------- | ------------------------------ | ------------------------------- |
| 403    | NO_AUTH         | 当前商户号没有使用该接口的权限 | 请确认是否已经开通相关权限      |
| 400    | INVALID_REQUEST | 输入账户类型未开通             | 请检查 account_type, 并重新调用 |
| 400    | PARAM_ERROR     | 参数错误                       | 请使用正确的参数重新调用        |
