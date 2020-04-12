---
title: '同步服务订单信息 API'
linkTitle: '同步服务订单信息'
date: 2020.03.05
weight: 4
description: >
  由于收款商户进行的某些“线下操作”会导致微信支付侧的订单状态与实际情况不符。例如, 用户通过线下付款的方式已经完成支付, 而微信支付侧并未支付成功, 此时可能导致用户重复支付。因此商户需要通过订单同步接口将订单状态同步给微信支付, 修改订单在微信支付系统中的状态。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付分\
**请求 URL**: https://api.mch.weixin.qq.com/v3/payscore/serviceorder/{out_order_no}/sync\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

前提条件: 同步商户渠道收款成功信息时, 即场景类型=“Order_Paid”, 订单的状态需为[FINISHED:商户完结订单]

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

商户服务订单号 out*order_no string(32) 是 path 商户系统内部订单号(不是交易单号）, 要求此参数只能由数字、大小写字母*-|\*组成, 且在同一个商户号下唯一, 详见「商户订单号」, 需要和创建订单的商户服务订单号一致。
|||1234323JKHDFE1243252
公众账号 ID

appid

string(32）

是

query 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
此参数需在本系统先进行配置, 并与创建订单时的 appid 保持一致。
|||wxd678efh567hg6787

服务 ID

service_id

string(32）

是

query 该服务 ID 有本接口对应产品的权限, 需要与创建订单时保持一致。
|||500001

场景类型

type

string(32）

是

query 场景类型为“Order_Paid”, 字符串表示“订单收款成功” 。
|||Order_Paid

+内容信息详情
detail

object

否

query 场景类型为 Order_Paid 时, 为必填项。

### 请求示例

```json
{
  "appid": "wxd678efh567hg6787",
  "service_id": "500001",
  "type": "Order_Paid",
  "detail": {
    "paid_time": "20091225091210"
  }
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
CREATED: 商户已创建服务订单
DOING: 服务订单进行中
DONE: 服务订单完成
REVOKED: 商户取消服务订单
EXPIRED: 服务订单已失效, "商户已创建服务订单"状态超过 30 天未变动, 则订单失效
|||CREATED

订单状态说明 state_description string(32) 否
对服务订单"进行中"状态的附加说明。

枚举值:
USER_CONFIRM: 用户确认
MCH_COMPLETE: 商户完结
|||MCH_COMPLETE

商户收款总金额 total_amount int 否 总金额, 大于等于 0 的数字, 单位为分, 只能为整数, 详见支付金额。
此参数需满足: 总金额=后付费项目金额之和-后付费商户优惠项目金额之和, 且小于等于订单风险金额。取消订单时, 该字段必须为 0。
|||40000 +后付费项目 post_payments array 否 后付费项目列表, 最多包含 100 条付费项目。 +后付费商户优惠 post_discounts array 否 后付费商户优惠, 最多包含 30 条付费项目。 +订单风险金 risk_fund object 否 订单风险金信息 +服务时间段 time_range object 否 服务时间范围 +服务位置 location object 否 服务使用信息
商户数据包 attach string(256) 否 商户数据包, 可存放本订单所需信息, 需要先 urlencode 后传入, 总长度不大于 256 字符, 超出报错处理。
|||Easdfowealsdkjfnlaksjdlfkwqoi&wl3l2sald
商户回调地址 notify_url string(255) 否 商户接收用户确认订单或扣款成功回调通知的地址。
|||https://api.test.com
微信支付服务订单号 order_id string(64) 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651
是否需要收款 need_collection bool 否 true: 微信支付分代收款
false: 无需微信支付分代收款
|||true +收款信息 collection object 否 收款信息

### 返回示例

```json
{
  "appid": "wxd678efh567hg6787",
  "mchid": "1230000109",
  "service_id": "500001",
  "out_order_no": "1234323JKHDFE1243252",
  "service_introduction": "某某酒店",
  "state": "CREATED",
  "state_description": "MCH_COMPLETE",
  "total_amount": 3900,
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
      "description": "不与其他优惠叠加",
      "amount": 100
    }
  ],
  "risk_fund": {
    "name": "ESTIMATE_ORDER_COST",
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
  "need_collection": true,
  "collection": {
    "state": "USER_PAID",
    "total_amount": 3900,
    "paying_amount": 0,
    "paid_amount": 3900,
    "details": [
      {
        "amount": 10000,
        "paid_type": "NEWTON",
        "paid_time": "20091225091210",
        "transaction_id ": "15646546545165651651"
      }
    ]
  }
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码              | 描述                                   | 解决方案                                               |
| ------ | ------------------- | -------------------------------------- | ------------------------------------------------------ |
| 500    | SYSTEM_ERROR        | 系统错误                               | 5 开头的状态码都为系统问题, 请使用相同参数稍后重新调用 |
| 400    | PARAM_ERROR         | 参数错误                               | 根据错误提示, 传入正确参数                             |
| 403    | NO_AUTH             | 商户信息不合法                         | 登录商户平台核对, 传入正确信息                         |
| 429    | FREQUENCY_LIMITED   | 频率超限                               | 请求量不要超过接口调用频率限制                         |
| 400    | INVALID_REQUEST     | 请求参数符合参数格式, 但不符合业务规则 | 请确认相同单号是否使用了不同的参数                     |
| 404    | ORDER_NOT_EXIST     | 订单不存在                             | 确认入参, 传入正确单据                                 |
| 400    | INVALID_ORDER_STATE | 单据状态错误                           | 确认操作是否符合流程                                   |
| 400    | ORDER_CANCELED      | 单据已取消                             | 当前状态无需操作                                       |
| 400    | ORDER_DONE          | 订单已完成                             | 当前状态无需操作                                       |
