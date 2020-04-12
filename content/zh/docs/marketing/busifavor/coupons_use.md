---
title: '核销用户券API'
linkTitle: ''
date: 2019.08.20
weight: 5
description: >
  在用户满足优惠门槛后, 服务商可通过该接口核销用户微信卡包中具体某一张商家券。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/coupons/use\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

券 code coupon_code string(32) 是 query 券的唯一标识。
|||sxxe34343434
批次号 stock_id string(20) 否 query 商户自定义 code 的批次, 核销时必须填写批次号。
|||100088
公众账号 ID appid string(32) 是 query 核销接口返回的 openid 会在该传入 appid 下进行计算获得。
|||wx1234567889999
请求核销时间 use_time string(32) 是 query 商户请求核销用户券的时间。
|||2015-05-20T13:29:35.120+08:00
核销请求单据号 use_request_no string(32) 是 query 每次核销请求的唯一标识, 商户需保证唯一。
|||1002600620019090123143254435
用户标识 openid string(128) 否 query 用户的唯一标识, 做安全校验使用, 非必填。
|||xsd3434454567676

### 请求示例

```json
{
"coupon_code": "sxxe34343434",
"stock_id": "100088",
"appid": "wx1234567889999",
"use_time": "2015-05-20T13:29:35.120+08:00",
"use_request_no": "1002600620019090123143254435",
"openid": "xsd3434454567676"
}

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 批次 id
|||100088
用户标识 openid string(128) 是 用户在公众号内的唯一身份标识。
|||dsadas34345454545
系统核销券成功的时间 wechatpay_use_time string(32) 是 系统成功核销券的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00

### 返回示例

正常示例

> 200 Response
> {
> "stock_id": "100088",
> "openid": "dsadas34345454545",
> "wechatpay_use_time": "2015-05-20T13:29:35.120+08:00"
> }

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
400 PARAM_ERROR 参数错误 查看具体错误信息, 调整参数
400 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
400 RESOURCE_ALREADY_EXISTS 批次已存在 查看 out_request_no 字段是否重复使用
券已被其他订单核销 请通过查询券 API 确认券是否已被其他订单核销
404 RESOURCE_NOT_EXISTS 查询的资源不存在 请检查查询资源的对应 id 是否填写正确
403 NOAUTH 无权限 查看具体错误信息, 确认是否有权限
400 APPID_MCHID_NOT_MATCH appid 与请求方商户无关联关系 appid 与请求方商户不匹配, 请确认 appid 与请求方商户是否有关联关系
400 MCH_NOT_EXISTS 商户号不存在 请确认传入的商户号是否正确
404 USER_NOT_EXISTS openid 不正确 请确认传入的 openid 是否正确
500 SYSTEM_ERROR 系统失败 多为网络超时引起, 重试
429 FREQUENCY_LIMITED 频率限制 调用太频繁, 请降低调用接口频率
403 RULELIMIT 券不在有效期 请确认券是否能在当前时间核销
400 INVALID_REQUEST 发券模式不合法 请更换支持预上传 code 的批次后重试
上传的自定义 code 已达上限 请更换一个新的批次后重试
```
