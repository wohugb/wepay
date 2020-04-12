---
title: '设置商家券事件通知地址API'
linkTitle: ''
date: 2019.12.20
weight: 9
description: >
  用于设置接收商家券相关事件通知的URL, 可接收商家券相关的事件通知、包括发放通知等。需要设置接收通知的URL, 并在商户平台开通营销事件推送的能力, 即可接收到相关通知。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

仅可以收到由商户自己创建的批次相关的通知

{{% /alert %}}

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/callbacks\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

商户号 mchid string(15) 否 query 微信支付商户的商户号, 由微信支付生成并下发, 不填默认查询调用方商户的通知 URL。
特殊规则: 最小长度取值为 8
|||10000098
通知 URL 地址 notify_url string(256) 是 query 商户提供的用于接收商家券事件通知的 url 地址, 必须支持 https。
特殊规则: 最小长度取值为 10
|||https://pay.weixin.qq.com

### 请求示例

```json
{
"mchid": "10000098",
"notify_url": "https://pay.weixin.qq.com"
}

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

修改时间 update_time string(32) 否 修改时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2019-05-20T13:29:35.120+08:00
通知 URL 地址 notify_url string(256) 是 商户提供的用于接收商家券事件通知的 url 地址, 必须支持 https。
特殊规则: 最小长度取值为 10
|||https://pay.weixin.qq.com
商户号 mchid string(15) 是 微信支付商户的商户号, 由微信支付生成并下发。
特殊规则: 最小长度取值为 8
|||10000098

### 返回示例

正常示例

> 200 Response
> {
> "update_time": "2019-05-20T13:29:35.120+08:00",
> "notify_url": "https://pay.weixin.qq.com",
> "mchid": "10000098"
> }
> 错误码<sub>公共错误码</sub>
> |状态码 |错误码 |描述| 解决方案
> |-
> 400 PARAM_ERROR 参数错误 查看具体错误信息, 调整参数
> 400 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
> 400 RESOURCE_ALREADY_EXISTS 批次已存在 查看 out_request_no 字段是否重复使用
> 券已被其他订单核销 请通过查询券 API 确认券是否已被其他订单核销
> 404 RESOURCE_NOT_EXISTS 查询的资源不存在 请检查查询资源的对应 id 是否填写正确
> 403 NOAUTH 无权限 查看具体错误信息, 确认是否有权限
> 400 APPID_MCHID_NOT_MATCH appid 与请求方商户无关联关系 appid 与请求方商户不匹配, 请确认 appid 与请求方商户是否有关联关系
> 400 MCH_NOT_EXISTS 商户号不存在 请确认传入的商户号是否正确
> 404 USER_NOT_EXISTS openid 不正确 请确认传入的 openid 是否正确
> 500 SYSTEM_ERROR 系统失败 多为网络超时引起, 重试
> 429 FREQUENCY_LIMITED 频率限制 调用太频繁, 请降低调用接口频率
> 403 RULELIMIT 券不在有效期 请确认券是否能在当前时间核销
> 400 INVALID_REQUEST 发券模式不合法 请更换支持预上传 code 的批次后重试
> 上传的自定义 code 已达上限 请更换一个新的批次后重试
```
