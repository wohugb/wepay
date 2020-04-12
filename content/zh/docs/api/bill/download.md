---
title: '下载账单 API'
linkTitle: '下载账单'
date: '2019-09-16'
weight: 3
description: >
  下载账单 API 为通用接口, 交易/资金账单都可以通过该接口获取到对应的账单。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 账单文件的下载地址的有效时间为 30s。

- 强烈建议商户将实际账单文件的哈希值和之前从接口获取到的哈希值进行比对, 以确认数据的完整性。

## 接口说明

**适用对象**: 电商平台 服务商 直连商户\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

当获取到账单文件资源的下载地址信息后, 如:

{
"hash_type": "SHA1",
"hash_value": "79bb0f45fc4c42234a918000b2668d689e2bde04",
"download_url": " https://api.mch.weixin.qq.com/v3/billdownload/file?token=xxx"
}

可以通过微信支付 API v3 标准对 download_url 进行签名, 并发起请求, 即可下载到账单文件的数据流。

示例

\$ curl https://api.mch.weixin.qq.com/v3/billdownload/file?token=xxx -H '
Authorization:WECHATPAY2-SHA256-RSA2048mchid="1900009191",
nonce_str="593BEC0C930BF1AFEB40B4A08C8FB242",
signature="uOVRnA4qG/MNnYzdQxJanN+zU+lTgIcnU9BxGw5dKjK+VdEUz2FeIoC+D5sB/LN+nGzX3hfZg6r5
wT1pl2ZobmIc6p0ldN7J6yDgUzbX8Uk3sD4a4eZVPTBvqNDoUqcYMlZ9uuDdCvNv4TM3c1WzsXUrExwVkI
1XO5jCNbgDJ25nkT/c1gIFvqoogl7MdSFGc4W4xZsqCItnqbypR3RuGIlR9h9vlRsy7zJR9PBI83X8al
LDIfR1ukt1P7tMnmogZ0cuDY8cZsd8ZlCgLadmvej58SLsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/
4nLBiCwIUFluw==",timestamp="1554208460",serial_no="1DDE55AD98ED71D6EDD4A4A16996DE7B47773A8C"'

## 返回参数

文件格式说明
账单文件包括明细数据和汇总数据两部分, 每一部分都包含一行表头和若干行具体数据。 明细数据每一行对应所下载账单的一条具体数据, 同时明细数据中每一个字段前都加入了字符, 以避免数据被 Excel 按科学计数法处理。如需汇总金额等数据, 可以批量替换掉该字符。 不同类型的账单文件的明细数据和汇总数据的格式是不同的, 具体示例如下:

交易账单

《ALL.xlsx》、《REFUND.xlsx》、《SUCCESS.xlsx》

资金流水账单

《资金账单.xlsx》

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
