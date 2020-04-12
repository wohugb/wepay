---
title: '根据商户号查用户的券'
linkTitle: '根据商户号查用户的券'
date: '2019-09-29'
weight: 11
description: >
  可通过该接口查询用户在某商户号可用的全部券, 可用于商户的小程序/H5中, 用户"我的代金券"或"提交订单页"展示优惠信息。无法查询到微信支付立减金。本接口查不到用户的微信支付立减金(又称“全平台通用券”）, 即在所有商户都可以使用的券, 例如: 摇摇乐红包
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/users/{openid}/coupons\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

用户标识 openid string(128) 是 path 用户在商户 appid 下的唯一标识。
|||2323dfsdf342342
公众账号 ID appid string(128) 是 path 微信为发券方商户分配的公众账号 ID, 接口传入的所有 appid 应该为公众号的 appid(在 mp.weixin.qq.com 申请的）, 不能为 APP 的 appid(在 open.weixin.qq.com 申请的）。
|||wx233544546545989
批次号 stock_id string(20) 否 path 批次号, 是否指定批次号查询, 填写 available_mchid, 该字段不生效。
|||9865000
券状态 status string(6) 否 path 代金券状态:
SENDED: 可用
USED: 已实扣
填写 available_mchid, 该字段不生效。
|||USED
创建批次的商户号 creator_mchid string(20) 否 path 批次创建方商户号。
|||9865002
批次发放商户号 sender_mchid string(20) 否 path 批次发放商户号
|||9865001
可用商户号 available_mchid string(20) 否 path 可用商户号
|||9865000
分页页码 offset uint32 否 path 分页页码, 默认 0, 填写 available_mchid, 该字段不生效。
|||0
分页大小 limit uint32 否 path 分页大小, 默认 20, 填写 available_mchid, 该字段不生效。
|||20

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/favor/users/2323dfsdf342342/coupons?appid=wx233544546545989

## 返回参数

变量 类型 必填 描述 +结果集 data
object

否 结果集
查询结果总数 total_count uint32 是 查询结果总数
|||100
分页大小 limit uint32 是 分页大小
|||10
分页页码 offset uint32 是 分页页码
|||10

### 返回示例

正常示例

```json
{
"data": [{
"stock_creator_mchid": "9800064",
"stock_id": "9865888",
"coupon_id": "98674556",
"cut_to_message": {
  "single_price_max": 100,
  "cut_to_price":100
},
"coupon_name": "微信支付代金券",
"status": "EXPIRED",
"description": "微信支付营销",
"create_time": "2015-05-20T13:29:35.120+08:00",
"coupon_type": "CUT_TO",
"no_cash": null,
"available_begin_time": "2015-05-20T13:29:35.120+08:00",
"available_end_time": "2015-05-20T13:29:35.120+08:00",
"singleitem": null,
"normal_coupon_information": {
"coupon_amount": 100,
"transaction_minimum": 100
},
"consume_information": {
"consume_time": "2015-05-20T13:29:35.120+08:00",
"consume_mchid": "9856081",
"transaction_id": "2345234523",
"goods_detail": [{
"goods_id": "a_goods1",
"quantity": 7,
"price": 1,
"discount_amount": 4
}]
}
}]
"total_count": 100,
"limit": 10,
"offset": 10,
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
