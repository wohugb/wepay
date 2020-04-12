---
title: '查询活动指定商品列表API'
linkTitle: '查询活动指定商品列表'
date: 2019.11.28
weight: 4
description: >
  商户创建活动后, 可以通过该接口查询支付有礼的活动指定商品, 用于管理活动。

type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/paygiftactivity/activities/{activity_id}/goods\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

活动 id activity_id string(20) 是 path 活动 id
|||10028001
分页页码 offset uint64 否 path 分页页码
|||1
分页大小 limit uint64 否 path 限制分页最大数据条目。
|||20

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/paygiftactivity/activities/10028001/goods

## 返回参数

变量 类型 必填 描述 +结果集 data array 否 商户信息列表
总数 total_count uint64 是 商户数量
|||30
分页页码 offset uint64 是 分页页码
|||4
分页大小 limit uint64 是 限制分页最大数据条目。
|||20
活动 id activity_id string(20) 是 活动 id
|||126002309

### 返回示例

```json
{
  "data": [
    {
      "goods_id": "0345678",
      "create_time": "2015-05-20T13:29:35.120+08:00",
      "update_time": "2015-05-20T13:29:35.120+08:00"
    }
  ],
  "total_count": 24,
  "offset": 4,
  "limit": 20,
  "activity_id": "10028001"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户未被授权 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 根据错误提示, 传入符合业务规则的参数
400 MCH_NOT_EXISTS 商户号不存在 请确认发券商户号信息是否有误
404 RESOURCE_NOT_EXISTS 资源不存在或无可用 请确认资源均存在且可用
400 APPID_MCHID_NOT_MATCH appid 与 mchid 不匹配 请确认 appid 是否正确填写
401 SIGN_ERROR 签名错误或签名信息不完整 登录商户平台核对, 传入正确信息
