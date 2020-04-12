---
title: '发放代金券API'
linkTitle: '发放'
date: '2019-09-27'
weight: 3
description: >
  商户平台/API完成制券后, 可使用发放代金券接口发券。通过调用此接口可发放指定批次给指定用户, 发券场景可以是小程序、H5、APP等。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/users/{openid}/coupons\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock*id string(20) 是 query 微信为每个批次分配的唯一 id。
|||9856000
用户 openid openid string(128) 是 pathopenid 信息, 用户在 appid 下的唯一标识。
|||2323dfsdf342342
商户单据号 out_request_no string(128) 是 query 商户此次发放凭据号(格式: 商户 id+日期+流水号）, 可包含英文字母, 数字, |, *, \*, -等内容, 不允许出现其他不合法符号, 商户侧需保持唯一性。
|||89560002019101000121
公众账号 ID appid string(128) 是 query 微信为发券方商户分配的公众账号 ID, 接口传入的所有 appid 应该为公众号的 appid(在 mp.weixin.qq.com 申请的）, 不能为 APP 的 appid(在 open.weixin.qq.com 申请的）。
|||wx233544546545989
创建批次的商户号 stock_creator_mchid string(20) 是 query 批次创建方商户号。
|||8956000
指定面额发券, 面额 coupon_value uint64 否 query 指定面额发券场景, 券面额, 其他场景不需要填, 单位: 分。
|||100
指定面额发券, 券门槛 coupon_minimum uint64 否 query 指定面额发券批次门槛, 其他场景不需要, 单位: 分。
|||100

### 请求示例

```json
{
  "stock_id": "9856000",
  "out_request_no": "89560002019101000121",
  "appid": "wx233544546545989",
  "stock_creator_mchid": "8956000",
  "coupon_value": 100,
  "coupon_minimum": 100
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

代金券 id coupon_id string(20) 是 发放给用户的代金券 id。
|||9867041

### 返回示例

正常示例

```json
{
  "coupon_id": "9867041"
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
