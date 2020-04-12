---
title: '查询投诉信息 API'
linkTitle: '下载账单'
date: '2019-2-17'
weight: 1
description: >
  商户可通过调用此接口, 查询指定时间段的所有用户投诉信息, 并在返回结果分页输出查询结果。对于服务商、渠道商, 可通过调用此接口, 查询指定子商户号对应子商户的投诉信息, 若不指定, 则查询所有子商户投诉信。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant-service/complaints\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

分页大小 limit uint32 否 path 该次请求返回的最大投诉条数, 范围为【1, 50】。
|||5
分页开始位置 offset uint32 否 path 该次请求的分页开始位置, 从 0 开始计数, 譬如 offset=10, 表示从第 11 条记录开始返回。
|||10
开始日期 begin_date string(10） 是 path 投诉发生的开始日期, 格式为 YYYY-MM-DD。注意, 查询日期跨度不超过 30 天。
|||2019-01-01
结束日期 end_date string(10） 是 path 投诉发生的结束日期, 格式为 YYYY-MM-DD。注意, 查询日期跨度不超过 30 天。
|||2019-01-01
子商户号 sub_mchid string(64） 否 path 当服务商或渠道商查询指定子商户的投诉信息时, 传入此参数。
|||1900012181

### 请求示例

URL

不传入 sub_mchid:
https://api.mch.weixin.qq.com/v3/merchant-service/complaints?offset=10&limit=20&begin_date=2019-01-01&end_date=2019-01-03

传入 sub_mchid:
https://api.mch.weixin.qq.com/v3/merchant-service/complaints?offset=10&limit=20&begin_date=2019-01-01&end_date=2019-01-03&sub_mchid=1900012181

## 返回参数

变量 类型 必填 描述 +用户投诉信息详情 data array 是 用户投诉信息的详情。如果查询结果为空时, 则为空数组。
分页开始位置 offset uint32 是 该次请求的分页开始位置, 从 0 开始计数, 譬如 offset=10, 表示从第 11 条记录开始返回。
|||10
分页大小 limit uint32 是 该次请求返回的最大投诉条数, 范围为【1, 50】。
|||5
投诉总条数 total_count uint64 否 投诉总条数, 当 offset=0 时返回。
|||1234

### 返回示例

正常示例

> 200 Response
> {
> "data": [

    {
      "out_trade_no": "20190906154617947762231",
      "complaint_time": "2015-05-20T13:29:35.120+08:00",
      "amount": 3,
      "payer_phone": "18500000000",
      "complaint_detail": "反馈一个重复扣费的问题",
      "complaint_state": "PAYER_COMPLAINTED",
      "transaction_id": "4200000404201909069117582536",
      "frozen_end_time": "2015-05-20T13:29:35.120+08:00",
      "sub_mchid": "1900012181"
    }

],
"offset": 10,
"limit": 5,
"total_count": 1234
}

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数 稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户信息不合法 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
