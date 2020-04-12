---
title: '查询投诉通知回调 API'
linkTitle: '查询投诉通知回调'
date: '2019-2-17'
weight: 1
description: >
  商户通过调用此接口查询投诉通知的回调 URL。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant-service/complaint-notifications\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

无数据

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

商户号 mchid string(64） 是 直连商户的商户号, 由微信支付生成并下发。
|||1900012181
通知地址 url string(255） 是 通知地址, 仅支持 https。
|||https://www.xxx.com/notify

### 返回示例

正常示例

> 200 Response
> {
> "mchid": "1900012181",
> "url": "https://www.xxx.com/notify"
> }

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数 稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户信息不合法 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
400 RESOURCE_NOT_EXISTS 查询的通知回调不存在 请检查是否已创建通知回调
