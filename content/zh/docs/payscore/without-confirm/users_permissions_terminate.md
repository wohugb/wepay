---
title: '商户解除用户授权关系 API'
linkTitle: '商户解除用户授权关系 API'
date: 2020.03.25
weight: 1
description: >
  商户通过调用该接口, 可主动与用户解除此前授权关系。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 该接口仅在免确认订单模式下使用。

## 接口说明

**适用对象**: 微信支付分\
**请求 URL**: https://api.mch.weixin.qq.com/payscore/users/{openid}/permissions/{service_id}/terminate\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

服务 ID service_id string(32） 是 path 该服务 ID 有本接口对应产品的权限。
特殊规则: 必须是字母数字
|||500001
公众账号 ID appid string(32） 是 query 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系, 此参数需在本系统先进行配置。
特殊规则: 必须是字母数字
|||wxd678efh567hg6787
用户标识 openid string(128） 是 path 用户在商户 appid 下的唯一标识。
|||oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
撤销原因 reason string(50） 是 query 商户解除用户授权关系的原因。
|||reason

### 请求示例

```json
{
"reason" : "reason",
"appid" : "wxd678efh567hg6787"
}

## 返回参数

状态码 含义 描述
204 No Content 请求处理成功, 无数据返回。

### 返回示例

正常示例

    无数据(Http状态码为204）

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM*ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户信息不合法 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 请确认相同单号是否使用了不同的参数
404 ORDER_NOT* EXIST 订单不存在 确认入参, 传入正确单据
400 INVALID_ORDER_STATE 单据状态错误 确认操作是否符合流程
400 ORDER_CANCELED 单据已取消 当前状态无需操作
400 ORDER_DONE 订单已完成 当前状态无需操作
```
