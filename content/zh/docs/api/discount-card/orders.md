---
title: '查询先享卡订单 API'
linkTitle: '查询先享卡订单'
date: '2020-03-26'
weight: 1
description: >
  商户可以通过先享卡订单号或商户订单号查询用户目前的先享卡使用情况、订单状态, 可用于对账或者界面展示。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户\
**请求 URL**: (通过先享卡订单号查询）: https://api.mch.weixin.qq.com/v3/discount-card/orders/{out_order_no}
(通过商户订单号查询）: https://api.mch.weixin.qq.com/v3/discount-card/orders/out-trade-no/{out_trade_no}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

先享卡订单号 out*order_no string(64） 二选一 path 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95
商户订单号 out_trade_no string(32） path 商户系统内部订单号, 要求 32 个字符内, 只能是数字、大小写字母*-|\*且在同一个商户号下唯一。
|||6e8369071cd942c0476613f9d1ce9ca3

### 请求示例

URL

通过先享卡订单号查询的 URL 请求示例:
https://api.mch.weixin.qq.com/v3/discount_card/orders/233bcbf407e87789b8e471f251774f95

通过商户订单号查询的 URL 请求示例:
https://api.mch.weixin.qq.com/v3/discount-card/orders/out-trade-no/6e8369071cd942c0476613f9d1ce9ca3

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

先享卡订单号 out*order_no string(64） 是 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95
先享卡 ID discount_card_id string(64） 是 唯一标志一种先享卡。
|||87789b2f25177433bcbf407e8e471f95
商户订单号 out_trade_no string(32） 是 商户系统内部订单号, 要求 32 个字符内, 只能是数字、大小写字母*-|\* 且在同一个商户号下唯一。
|||6e8369071cd942c0476613f9d1ce9ca3
公众账号 ID appid string(32） 是 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
|||wxd678efh567hg6787
服务 ID service_id string(32） 是 微信支付分服务 ID, 该服务 ID 有本接口对应产品的权限。
|||500001
微信支付服务订单号 order_id string(64） 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651
微信支付交易单号 transaction_id string(64） 否 微信支付的订单号, 仅在成功收款时才返回。
|||1009660380201506130728806387
用户标识 openid string(128） 是 微信用户在商户对应 appid 下的唯一标识。
|||oUpF8uMuAJ2pxb1Q9zNjWeS6o
先享卡开始时间 card_begin_time string(32） 是 1、先享卡开始时间, 用户领取先享卡后, 卡开始生效的时间。
2、遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120-08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
先享卡结束时间 card_end_time string(32） 是 1、先享卡结束时间, 用户领取先享卡后, 卡失效的时间。
2、遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120-08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
先享卡名称 card_name string(20） 是 先享卡名称
|||五一品牌活动
目标描述 objective_description string(15） 是 目标描述, 先享卡的目标描述
|||购买商品 3 次
奖励描述 reward_description string(15） 是 奖励描述, 先享卡的奖励描述
|||每次减 5 元
预估奖励金额 estimated_reward_amount uint64 是 预估奖励总价值, 预估用户领卡后可享受的奖励金额。
|||1000
线上使用说明 online_instructions string(50） 否 先享卡线上的使用范围及使用场景, online_instructions(线上使用说明）和 offline_instructions(线下使用说明）两者至少返回一个。
|||仅限商户 APP 使用
线下使用说明 offline_instructions string(50） 否 先享卡线下的使用范围及使用场景, online_instructions(线上使用说明）和 offline_instructions(线下使用说明）两者至少返回一个。
|||仅限商户门店使用
订单状态 state enum 是 表示当前订单的状态, 枚举值:
CREATED: 订单已创建, 表示用户已经领取先享卡, 订单已创建成功。
SETTLING: 订单结算中, 表示用户领取的先享卡已到期, 订单正在结算。
CHARGING: 订单扣款中, 表示用户未完成先享卡目标且享受奖励金额, 需要扣回相应奖励金额, 正在扣款中。
CHARGED: 订单扣款成功, 表示用户未完成先享卡目标且享受奖励金额, 需要扣回相应奖励金额, 扣款已成功。
NO_CHARGE: 订单无需扣款, 表示用户已完成先享卡目标或者未享受奖励。
REVOKED: 订单已取消, 表示用户未享受奖励且未完成先享卡目标。
|||CREATED
总金额 total_amount uint64 否 订单总金额, 表示原本收取的用户已享奖励总金额, 单位为分。
|||1000
扣除金额 deduction_amount uint64 否 扣除金额, 表示订单减免金额, 单位为分。
|||1000
结算金额 settlement_amount uint64 否 结算金额, 表示实际收取用户的金额, 单位为分。
结算金额=订单总金额-扣除金额
|||1000
创建时间 create_time string(32） 是 订单创建时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120-08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
支付时间 pay_time string(32） 否 用户成功支付的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120-08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00 +目标达成明细列表 objectives array 否 用户完成的目标明细列表。 +奖励明细列表 rewards array 否 用户获得的奖励明细列表。

### 返回示例

```json
{
"out_order_no": "233bcbf407e87789b8e471f251774f95",
"discount_card_id": "87789b2f25177433bcbf407e8e471f95",
"appid": "wxd678efh567hg6787",
"out_trade_no": "6e8369071cd942c0476613f9d1ce9ca3",
"service_id": "500001",
"order_id": "15646546545165651651",
"transaction_id": "1009660380201506130728806387",
"openid": "oUpF8uMuAJ2pxb1Q9zNjWeS6o",
"card_begin_time": "2015-05-20T13:29:35.120+08:00",
"card_end_time": "2015-05-20T13:29:35.120+08:00",
"card_name": "五一品牌活动",
"objective_description": "购买商品 3 次",
"reward_description": "每次减 5 元",
"estimated_reward_amount": 1000,
"online_instructions": "仅限商户 APP 使用",
"offline_instructions": "仅限商户门店使用",
"state": "CREATED",
"total_amount": 1000,
"deduction_amount": 1000,
"settlement_amount": 1000,
"create_time": "2015-05-20T13:29:35.120+08:00",
"pay_time": "2015-05-20T13:29:35.120+08:00",
"objectives": [
{
"objective_serial_no": "578354545",
"objective_id": 123456,
"count": 1,
"performance_time": "2015-05-20T13:29:35.120+08:00",
"performance_description": "购买商品",
"performance_type": "INCREASE",
"name": "一周购买三次商品",
"unit": "个",
"remark": "特价商品"
}
],
"rewards": [
{
"reward_serial_no": "578354",
"reward_id": 123456,
"count": 100,
"amount": 1,
"reward_time": "2015-05-20T13:29:35.120+08:00",
"description": "购买商品",
"reward_type": "INCREASE",
"name": "八折优惠",
"unit": "个",
"remark": "特价商品"
}
]
}

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 5 开头的状态码都为系统问题, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
404 RESOURCE_NOT_EXISTS 订单不存在, 请检查订单号是否正确 请传入正确的订单号
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 当前状态无需操作
401 SIGN_ERROR 签名验证失败 请检查签名参数和方法是否都符合签名算法要求
403 NO_AUTH 权限异常 请开通商户号相关权限, 请联系产品或商务申请
429 FREQUENCY_LIMITED 请求超过频率限制 请求未受理, 请降低频率后重试
```
