---
title: '删除投诉通知回调 API'
linkTitle: '删除投诉通知回调'
date: '2019-2-17'
weight: 1
description: >
  当商户不再需要推送通知时, 可通过调用此接口删除投诉通知的回调 URL, 取消通知回调。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant-service/complaint-notifications\
**请求方式**: Delete\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

无数据

## 返回参数

无数据(Http 状态码为 204）

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数 稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户信息不合法 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
