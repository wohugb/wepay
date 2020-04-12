---
title: '查询电商平台账户日终余额API'
linkTitle: '平台日终余额'
date: '2020-03-13'
weight: 4
description: >
  通过此接口可以查询本商户号指定日期当天24点的账户余额。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

可查询 90 天内的日终余额。

{{% /alert %}}

## 接口说明

**适用对象**: 电商平台\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant/fund/dayendbalance/{account_type}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量         | 类型        | 必填 | 参数名/描述/示例值                                                                  |
| ------------ | ----------- | ---- | ----------------------------------------------------------------------------------- |
| account_type | string      | 是   | path 账户类型 枚举值:<br>BASIC: 基本账户<br>OPERATION: 运营账户<br>FEES: 手续费账户 |
|              |             |      | BASIC                                                                               |
| 日期 date    | string(10） | 是   | 指定查询商户日终余额的日期                                                          |
|              |             |      | 2019-08-17                                                                          |

### 请求示例

```json
{
  "date": "2019-08-17"
}
```

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

| 状态码 | 错误码          | 描述               | 解决方案                   |
| ------ | --------------- | ------------------ | -------------------------- |
| 403    | NO_AUTH         | 无接口权限         | 请确认是否已经开通相关权限 |
| 400    | INVALID_REQUEST | 日终余额当日无数据 |                            |
| 400    | PARAM_ERROR     | 参数错误           | 请使用正确的参数重新调用   |
