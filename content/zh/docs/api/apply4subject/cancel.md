---
title: '撤销申请单 API'
linkTitle: '撤销申请单'
date: '2019-08-08'
weight: 3
description: >
  服务商提交申请单后需要修改信息时, 或者申请单审核结果为”已驳回“时服务商要修改申请材料时, 均需要先调用撤销申请单接口。
type: 'docs'
---

## 接口说明

**适用对象**: 从业机构 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/apply4subject/applyment/{applyment_id}/cancel
或
https://api.mch.weixin.qq.com/v3/apply4subject/applyment/{business_code}/cancel\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3/

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量          | 类型        | 必填 | 参数名/描述/示例值                                                                   |
| ------------- | ----------- | ---- | ------------------------------------------------------------------------------------ |
| applyment_id  | uint64      | 二   | `申请单编号` `path` 微信支付分配的申请单号, 申请单编号和业务申请编号至少传一个。     |
|               |             | 选   | 20000011111                                                                          |
| business_code | string(128) | 一   | `业务申请编号` `path` <br>1、服务商自定义的唯一编号。<br>2、每个编号对应一个申请单。 |
|               |             |      | 1900013511_10000                                                                     |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/apply4subject/applyment/20000011111/cancel

或

`URL` https://api.mch.weixin.qq.com/v3/apply4subject/applyment/1900013511_10000/cancel

## 返回参数

### 返回示例

正常示例

```
无数据(Http 状态码为 204)
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码          | 描述         | 解决方案                                   |
| ------ | --------------- | ------------ | ------------------------------------------ |
| 500    | SYSTEMERROR     | 系统错误     | 系统异常, 请使用相同参数稍后重新调用       |
| 400    | PARAM_ERROR     | 参数错误     | 请使用正确的参数重新调用                   |
| 400    | INVALID_REQUEST | 无效请求     | 请查看返回的错误信息, 根据错误信息进行操作 |
| 403    | NOAUTH          | 商户权限异常 | 请确认是否已经开通相关权限                 |
