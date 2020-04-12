---
title: '查询代金券详情API'
linkTitle: '查询详情'
date: '2019-09-27'
weight: 8
description: >
  通过此接口可查询代金券信息, 包括代金券的基础信息、状态。如代金券已核销, 会包括代金券核销的订单信息(订单号、单品信息等）。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/users/{openid}/coupons/{coupon_id}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

代金券 id coupon_id string(20) 是 path 微信为每个代金券批次分配的唯一 id。
|||9856888
公众账号 ID appid string(128) 是 path 微信为发券方商户分配的公众账号 ID, 接口传入的所有 appid 应该为公众号的 appid(在 mp.weixin.qq.com 申请的）, 不能为 APP 的 appid(在 open.weixin.qq.com 申请的）。
|||wx233544546545989
用户 openid openid string(128) 是 path openid 信息, 用户在 appid 下的唯一标识。
|||2323dfsdf342342

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/favor/users/2323dfsdf342342/coupons/985688？appid=wx233544546545989

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

创建批次的商户号 stock_creator_mchid string(20) 是 批次创建方商户号
|||9800064
批次号 stock_id string(20) 是 微信为每个代金券批次分配的唯一 id。
|||9865888
代金券 id coupon_id string(20) 是 微信为代金券唯一分配的 id。
|||98674556 +单品优惠特定信息 cut_to_message
object

否 单品优惠特定信息。
代金券名称 coupon_name string(20) 是 代金券名称
|||微信支付代金券
代金券状态 status string
是 代金券状态:
SENDED: 可用
USED: 已实扣
EXPIRED: 已过期
|||EXPIRED
使用说明 description string(3000) 是 代金券描述说明字段。
|||微信支付营销
领券时间 create_time string(32) 是 领券时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
券类型 coupon_type string
是 券类型:
NORMAL: 满减券
CUT_TO: 减至券
|||CUT_TO
是否无资金流 no_cash bool 是 枚举值:
true: 是
false: 否
|||true
可用开始时间 available_begin_time string(32) 是 可用开始时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
可用结束时间 available_end_time string(32) 是 可用结束时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
是否单品优惠 singleitem bool 是 枚举值:
true: 是
false: 否
|||true +满减券信息 normal_coupon_information
object

否 普通满减券面额、门槛信息。 +已实扣代金券核销信息 consume_information
object

否 已实扣代金券信息。

### 返回示例

```json
{
  "stock_creator_mchid": "9800064",
  "stock_id": "9865888",
  "coupon_id": "98674556",
  "cut_to_message": {
    "single_price_max": 100,
    "cut_to_price": 100
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
    "goods_detail": [
      {
        "goods_id": "a_goods1",
        "quantity": 7,
        "price": 1,
        "discount_amount": 4
      }
    ]
  }
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
