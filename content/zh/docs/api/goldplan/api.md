---
title: '特约商户管理 API'
linkTitle: '特约商户管理'
date: '2020-03-27'
weight: 3
description: >
  服务商为特约商户开通或关闭点金计划。
type: 'docs'
---

## 接口说明

**适用对象**: 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/goldplan/merchants/changegoldplanstatus\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

是否需要证书: 是

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

特约商户号 sub_mchid string(32) 是 query 开通或关闭点金计划的特约商户商户号, 由微信支付生成并下发。
|||1234567890
操作类型 operation_type string(32) 是 query 开通或关闭点金计划的动作, 枚举值:
OPEN: 表示开通点金计划
CLOSE: 表示关闭点金计划
|||OPEN

### 请求示例

```json
{
"sub_mchid":"1234567890",
"operation_type":"OPEN"
}

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

特约商户号 sub_mchid string(32) 是 开通或关闭点金计划的特约商户商户号, 由微信支付生成并下发。
|||1234567890

### 返回示例

正常示例
异常示例

{
"sub_mchid":"1234567890"
}

## 错误码<sub>公共错误码</sub>

状态码 错误码 return_msg 描述 解决方案
400

INVALID_REQUEST

mch goldplan closed

服务商未开通点金计划

请在服务商平台先行开通点金计划后再试

400

INVALID_REQUEST

mch punished

服务商被处罚中

请在服务商平台处理处罚后再试

400

INVALID_REQUEST

sub_mch punished

特约商户被处罚中

请让特约商户在商户平台处理处罚后再试

400

INVALID_REQUEST

sub_mch reopen less than 24h

特约商户再次开通点金计划需间隔 24 小时

请特约商户关闭点金计划 24 小时后再试

400

MCH_NOT_EXISTS

sub_mch not exit

特约商户号不存在

特约商户号不存在, 请确认特约商户号准确性

400

PARAM_ERROR

parameter error

参数错误

根据错误提示, 传入正确参数

500

SYSTEM ERROR

系统繁忙, 请稍后重试

5 开头错误码都为系统问题, 请使用相同参数稍后重新调用

500

operation failed

请求操作失败, 请稍后重试

5 开头错误码都为系统问题, 请使用相同参数稍后重新调用

500

SIGN ERROR

签名验证失败

5 开头错误码都为系统问题, 请使用相同参数稍后重新调用
```
