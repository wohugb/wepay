---
title: '暂停代金券批次API'
linkTitle: '暂停批次'
date: '2019-10-22'
weight: 4
description: >
  通过此接口可暂停指定代金券批次。暂停后, 该代金券批次暂停发放, 用户无法通过任何渠道再领取该批次的券。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/stocks/{stock_id}/pause\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

创建批次的商户号 stock_creator_mchid string(20) 是 query 批次创建方商户号。
|||8956000
批次号 stock_id string(20）
是 path 微信为每个代金券批次分配的唯一 id。
|||9856000

### 请求示例

```json
{
  "stock_creator_mchid": "8956000"
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

生效时间 start_time string(32) 是 生效时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
批次号 stock_id string(20) 是 微信为每个代金券批次分配的唯一 id。
|||9865000

### 返回示例

```json
{
  "pause_time": "2015-05-20T13:29:35.120+08:00",
  "stock_id": "8965000"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
400 PARAM_ERROR 回调 url 不能为空 请填写回调 url
PARAM_ERROR 回调商户不能为空 请填写回调商户
PARAM_ERROR 券 id 必填 请填写券 id
PARAM_ERROR appid 必填 请输入 appid
PARAM_ERROR openid 必填 请输入 openid
PARAM_ERROR 页大小超过阈值 请不要超过最大的页大小
PARAM_ERROR 输入时间格式错误 请输入正确的时间格式
PARAM_ERROR 批次号必填 请输入批次号
PARAM_ERROR 商户号必填 请输入商户号
PARAM_ERROR 非法的批次状态 请检查批次状态
400 MCH_NOT_EXISTS 商户号不合法 请输入正确的商户号
400 INVALID_REQUEST openid 与 appID 不匹配 请使用 appID 下的的 openid
INVALID_REQUEST 活动已结束或未激活 请检查批次状态
INVALID_REQUEST 非法的商户号 请检查商户号是否正确
400 APPID_MCHID_NOT_MATCH 商户号与 appid 不匹配 请绑定调用接口的商户号和 APPID 后重试
403 USER_ACCOUNT_ABNORMAL 用户非法 该用户账号异常, 无法领券。商家可联系微信支付或让用户联系微信支付客服处理。
403 NOT_ENOUGH 批次预算不足 请补充预算
403 REQUEST_BLOCKED 调用商户无权限 请开通产品权限后再调用该接口
REQUEST_BLOCKED 商户无权发券 调用接口的商户号无权发券, 请检查是否是自己的批次或是已授权的批次。
REQUEST_BLOCKED 批次不支持跨商户发券 该批次未做跨商户号的授权, 请授权后再发放
REQUEST_BLOCKED 用户被限领拦截 用户领取已经达到上限, 请调高上限或停止发放。
404 RESOURCE_NOT_EXISTS 批次不存在 请检查批次 ID 是否正确
429 FREQUENCY_LIMIT_EXCEED 接口限频 请降低调用频率
