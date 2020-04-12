---
title: '下载批次核销明细API'
linkTitle: '下载批次核销'
date: '2019-09-29'
weight: 12
description: >
  可获取到某批次的核销明细数据, 包括订单号、单品信息、银行流水号等, 用于对账/数据分析。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/stocks/{stock_id}/use-flow\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 path 微信为每个代金券批次分配的唯一 id。
|||9865000

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/favor/stocks/9865000/use-flow

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

下载链接 url string(2048) 是 流水文件下载链接, 30s 内有效 。
|||download://example.csv
安全校验码 hash_value string(1024) 是 文件内容的哈希值, 防止篡改。
|||8ae0eb442c408d2e90d669d6f4ad6b7e6e049d6f
哈希算法类型 hash_type string(32) 是 哈希算法类型, 目前只支持 sha1。
|||SHA1

### 返回示例

```json
{
  "hash_type": "SHA1",
  "hash_value": "8ae0eb442c408d2e90d669d6f4ad6b7e6e049d6f",
  "url": "download://example.csv"
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
