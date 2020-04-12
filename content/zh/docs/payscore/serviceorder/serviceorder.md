---
title: '创建支付分订单 API'
linkTitle: '创建支付分订单'
date: 2020.03.05
weight: 1
description: >
  用户申请使用服务时, 商户可通过此接口申请创建微信支付分订单。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付分\
**请求 URL**: https://api.mch.weixin.qq.com/v3/payscore/serviceorder\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

商户服务订单号 out*order_no string(32) 是 query 商户系统内部服务订单号(不是交易单号）, 要求此参数只能由数字、大小写字母*-|\*组成, 且在同一个商户号下唯一。详见[商户订单号]。
|||1234323JKHDFE1243252
公众账号 ID appid string(32) 是 query 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系, 此参数需在本系统先进行配置。
|||wxd678efh567hg6787
服务 ID service_id string(32) 是 query 该服务 ID 有本接口对应产品的权限。
|||500001
服务信息 service_introduction string(20) 是 query 服务信息, 用于介绍本订单所提供的服务 , 当参数长度超过 20 个字符时, 报错处理。
|||某某酒店 +后付费项目 post_payments array 否 query 后付费项目列表, 最多包含 100 条付费项目。
如果传入, 用户侧则显示此参数。 +后付费商户优惠 post_discounts array 否 query 后付费商户优惠列表, 最多包含 30 条商户优惠。
如果传入, 用户侧则显示此参数。 +服务时间段 time_range object 是 query 服务时间范围 +服务位置 location object 否 query 服务位置信息
如果传入, 用户侧则显示此参数。 +订单风险金 risk_fund object 是 query 订单风险金信息
商户数据包 attach string(256) 否 query 商户数据包可存放本订单所需信息, 需要先 urlencode 后传入。 当商户数据包总长度超出 256 字符时, 报错处理。
|||Easdfowealsdkjfnlaksjdlfkwqoi&wl3l2sald
商户回调地址 notify_url string(255) 是 query 商户接收用户确认订单和付款成功回调通知的地址。
|||https://api.test.com
用户标识 openid string(128) 条件选填 query 微信用户在商户对应 appid 下的唯一标识。
免确认订单: 必填
需确认订单: 不填
|||oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
是否需要用户确认 need_user_confirm bool 是 query 枚举值:
false: 免确认订单
true: 需确认订单
|||true

### 请求示例

```json
{
  "out_order_no": "1234323JKHDFE1243252",
  "appid": "wxd678efh567hg6787",
  "service_id": "500001",
  "service_introduction": "某某酒店",
  "post_payments": [
    {
      "name": "就餐费用服务费",
      "amount": 4000,
      "description": "就餐人均 100 元服务费: 100/小时",
      "count": 1
    }
  ],
  "post_discounts": [
    {
      "name": "满 20 减 1 元",
      "description": "不与其他优惠叠加"
    }
  ],
  "time_range": {
    "start_time": "20091225091010",
    "end_time": "20091225121010"
  },
  "location": {
    "start_location": "嗨客时尚主题展餐厅",
    "end_location": "嗨客时尚主题展餐厅"
  },
  "risk_fund": {
    "name": "ESTIMATE_ORDER_COST",
    "amount": 10000,
    "description": "就餐的预估费用"
  },
  "attach": "Easdfowealsdkjfnlaksjdlfkwqoi&wl3l2sald",
  "notify_url": "https://api.test.com",
  "openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
  "need_user_confirm": true
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

公众账号 ID appid string(32) 是 调用接口提交的公众账号 ID。
|||wxd678efh567hg6787
商户号 mchid string(32) 是 调用接口提交的商户号。
|||1230000109
商户服务订单号 out_order_no string(32) 是 调用接口提交的商户服务订单号。
|||1234323JKHDFE1243252
服务 ID service_id string(32) 是 调用该接口提交的服务 ID。
|||500001
服务信息 service_introduction string(20) 是 服务信息, 用于介绍本订单所提供的服务。
|||某某酒店
服务订单状态 state string(32) 是
表示当前单据状态。

枚举值:
1、CREATED: 商户已创建服务订单
2、DOING: 服务订单进行中
3、DONE: 服务订单完成
4、REVOKED: 商户取消服务订单
5、EXPIRED: 服务订单已失效, "商户已创建服务订单"状态超过 30 天未变动, 则订单失效
|||CREATED

订单状态说明 state_description string (32) 否 对服务订单"进行中"状态的附加说明。
1、USER_CONFIRM: 用户确认
2、MCH_COMPLETE: 商户完结
|||MCH_COMPLETE +后付费项目 post_payments array 否 后付费项目列表, 最多包含 100 条付费项目。
如果传入, 用户侧则显示此参数。 +后付费商户优惠 post_discounts array 否 后付费商户优惠, 最多包含 30 条付费项目。
如果传入, 用户侧则显示此参数。 +订单风险金 risk_fund object 是 订单风险金信息 +服务时间段 time_range object 是 服务时间范围 +服务位置 location object 否 服务使用信息。
如果传入, 用户侧则显示此参数。
商户数据包 attach string(256) 否 商户数据包,可存放本订单所需信息, 需要先 urlencode 后传入, 总长度不大于 256 字符,超出报错处理。
|||Easdfowealsdkjfnlaksjdlfkwqoi&wl3l2sald
商户回调地址 notify_url string(255) 否 商户接收用户确认订单或扣款成功回调通知的地址。
|||https://api.test.com
微信支付服务订单号 order_id string(64) 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651
跳转微信侧小程序订单数据 package string(300) 是 用于跳转到微信侧小程序订单数据,跳转到微信侧小程序传入。该数据 1 小时内有效。
|||DJIOSQPYWDxsjdldeuwhdodwxasd_dDiodnwjh9we

### 返回示例

```json
{
  "appid": "wxd678efh567hg6787",
  "mchid": "1230000109",
  "out_order_no": "1234323JKHDFE1243252",
  "service_id": "500001",
  "service_introduction": "某某酒店",
  "state": "CREATED",
  "state_description": "MCH_COMPLETE",
  "post_payments": [
    {
      "name": "就餐费用服务费",
      "amount": 4000,
      "description": "就餐人均 100 元服务费: 100/小时",
      "count": 1
    }
  ],
  "post_discounts": [
    {
      "name": "满 20 减 1 元",
      "description": "不与其他优惠叠加"
    }
  ],
  "risk_fund": {
    "name": " ESTIMATE_ORDER_COST",
    "amount": 10000,
    "description": "就餐的预估费用"
  },
  "time_range": {
    "start_time": "20091225091010",
    "end_time": "20091225121010"
  },
  "location": {
    "start_location": "嗨客时尚主题展餐厅",
    "end_location": "嗨客时尚主题展餐厅"
  },
  "attach": "Easdfowealsdkjfnlaksjdlfkwqoi&wl3l2sald",
  "notify_url": "https://api.test.com",
  "order_id": "15646546545165651651",
  "package": " DJIOSQPYWDxsjdldeuwhdodwxasd_dDiodnwjh9we "
}
```

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
