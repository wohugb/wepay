---
title: '申请交易账单 API'
linkTitle: '申请交易账单'
date: '2019-09-16'
weight: 1
description: >
  微信支付按天提供交易账单文件, 商户可以通过该接口获取账单文件的下载地址。文件内包含交易相关的金额、时间、营销等信息, 供商户核对订单、退款、银行到账等情况。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 微信侧未成功下单的交易不会出现在对账单中。支付成功后撤销的交易会出现在对账单中, 跟原支付单订单号一致；
- 对账单中涉及金额的字段单位为“元”；
- 对账单接口只能下载三个月以内的账单。
- 小微商户不单独提供对账单下载, 如有需要, 可在调取“下载对账单”API 接口时不传 sub_mch_id, 获取服务商下全量电商二级商户(包括小微商户和非小微商户）的对账单。

{{% /alert %}}

## 接口说明

**适用对象**: 电商平台 服务商 直连商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/bill/tradebill\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

账单日期 bill_date string(10) 是 path 格式 YYYY-MM-DD
仅支持三个月内的账单下载申请。
|||2019-06-11
二级商户号 sub_mchid string(12) 否 path 1、若商户是直连商户: 无需填写该字段。
2、若商户是服务商:
● 不填则默认返回服务商下的交易或退款数据。
● 如需下载某个子商户下的交易或退款数据, 则该字段必填。
特殊规则: 最小字符长度为 8
|||1900000001

账单类型 bill_type string(32) 否 path 不填则默认是 ALL
枚举值:
ALL: 返回当日所有订单信息(不含充值退款订单）
SUCCESS: 返回当日成功支付的订单(不含充值退款订单）
REFUND: 返回当日退款订单(不含充值退款订单）
|||ALL
压缩类型 tar_type string(32) 否 path 不填则默认是数据流
枚举值:
GZIP: 返回格式为.gzip 的压缩包账单
|||GZIP

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/bill/tradebill?bill_date=2019-06-11&sub_mchid=1900000001&bill_type=ALL

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

哈希类型 hash_type string(32) 是 从 download_url 下载的文件的哈希类型, 用于校验文件的完整性。
|||SHA1
哈希值 hash_value string(1024) 是 从 download_url 下载的文件的哈希值, 用于校验文件的完整性。
|||79bb0f45fc4c42234a918000b2668d689e2bde04
账单下载地址 download_url string(2048) 是 供下一步请求账单文件的下载地址, 该地址 30s 内有效。
|||https://api.mch.weixin.qq.com/v3/billdownload/file?token=xxx

### 返回示例

```json
{
  "hash_type": "SHA1",
  "hash_value": "79bb0f45fc4c42234a918000b2668d689e2bde04",
  "download_url": " https://api.mch.weixin.qq.com/v3/billdownload/file?token=xxx"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 系统异常, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 请使用正确的参数重新调用
400 INVALID_REQUEST 参数错误 请检查 bill_date, 并重新调用
参数错误 请检查 sub_mchid, 并重新调用
403 NO_AUTH 权限异常(无该子商户账单的权限） 请使用正确的 sub_mchid 再重新调用
权限异常, 小微商户不单独提供对账单下载 可以不传 sub_mch_id, 以获取服务商下全量电商二级商户(包括小微商户和非小微商户）的对账单
400 NO_STATEMENT_EXIST 账单文件不存在 请检查当前商户号是否在指定日期有交易或退款发生
400 STATEMENT_CREATING 账单生成中 请先检查当前商户号在指定日期内是否有成功的交易或退款, 若有, 则在 T+1 日上午 8 点后再重新下载
400 NO_STATEMENT_EXIST 账单文件不存在 请检查当前商户号请求的微信支付账户在指定日期是否有资金操作
400 STATEMENT_CREATING 账单生成中 请先检查当前商户号的微信支付账户在指定日期内是否有资金操作, 若有, 则在 T+1 日上午 10 点后再重新下载
400 INVALID_REQUEST 参数错误 请按第一步申请账单的 API 指引, 重新获取账单地址后再请求
403 NO_AUTH 权限异常 请检查本次请求的商户是否与第一步申请账单 API 的请求商户一致
