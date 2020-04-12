---
title: '创建代金券批次API'
linkTitle: '创建批次'
date: '2020-3-19'
weight: 2
description: >
  通过调用此接口可创建代金券批次, 包括预充值&免充值类型。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/coupon-stocks\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次名称 stock_name string(20) 是 query 批次名称
|||微信支付代金券批次
批次备注 comment string(60) 否 query 仅配置商户可见, 用于自定义信息。
|||零售批次
归属商户号 belong_merchant string(20) 是 query 批次归属商户号
|||98568865
开始时间 available_begin_time string(32) 是 query 批次开始时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
结束时间 available_end_time string(32) 是 query 批次结束时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00 +发放规则 stock_use_rule object 是 query 批次使用规则 +样式设置 pattern_info object 否 query 代金券详情页 +核销规则 coupon_use_rule object 是 query 核销规则
是否无资金流 no_cash bool 是 query 是否无资金流。枚举值:<br>true: 是<br>false: 否
|||false
批次类型 stock_type string(16) 是 query 批次类型, 枚举值:<br>NORMAL: 固定面额满减券批次
|||NORMAL
商户单据号 out_request_no string(128) 是 query 商户创建批次凭据号(格式: 商户 id+日期+流水号）, 可包含英文字母, 数字, |, \*, \*, -等内容, 不允许出现其他不合法符号, 商户侧需保持唯一性。
扩展属性 ext_info string(128) 否 query 扩展属性字段, 按 json 格式, 暂时无需填写。
|||{'exinfo1':'1234','exinfo2':'3456'} 卡券背景颜色图

### 请求示例

```json
{
  "stock_name": "微信支付代金券批次",
  "comment": "零售批次",
  "belong_merchant": "98568865",
  "available_begin_time": "2015-05-20T13:29:35.120+08:00",
  "available_end_time": "2015-05-20T13:29:35.120+08:00",
  "stock_use_rule": {
    "max_coupons": 100,
    "max_amount": 5000,
    "max_amount_by_day": 400,
    "max_coupons_per_user": 3,
    "natural_person_limit": false,
    "prevent_api_abuse": false
  },
  "pattern_info": {
    "description": "微信支付营销代金券",
    "merchant_logo": "CDN 地址",
    "merchant_name": "微信支付",
    "background_color": "色号",
    "coupon_image": "图片 cdn 地址"
  },
  "coupon_use_rule": {
    "coupon_available_time": {
      "fix_available_time": {
        "available_week_day": [1],
        "begin_time": 0,
        "end_time": 3600
      },
      "second_day_available": false,
      "available_time_after_receive": 1440
    },
    "fixed_normal_coupon": {
      "coupon_amount": 50,
      "transaction_minimum": 100
    },
    "disscount_coupon": {
      "discount_amount_max": 100,
      "discount_percent": 88,
      "transaction_minimum": 100
    },
    "exchange_coupon": {
      "single_price_max": 100,
      "exchange_price": 100
    },
    "goods_tag": ["123321", "123322"],
    "trade_type": "OTHER",
    "combine_use": false,
    "available_items": ["123321", "123322"],
    "unavailable_items": ["789987", "789988"],
    "available_merchants": ["9856000", "9856001"]
  },
  "no_cash": false,
  "stock_type": "NORMAL",
  "out_request_no": ""
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 微信为每个代金券批次分配的唯一 ID。
|||98065001
创建时间 create_time string(32) 是 创建时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00

### 返回示例

```json
{
  "stock_id": "98065001",
  "create_time": "2015-05-20T13:29:35.120+08:00"
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码                 | 描述                   | 解决方案                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 400    | PARAM_ERROR            | 回调 url 不能为空      | 请填写回调 url<br>PARAM_ERROR 回调商户不能为空 请填写回调商户<br>PARAM_ERROR 券 id 必填 请填写券 id<br>PARAM_ERROR appid 必填 请输入 appid<br>PARAM_ERROR openid 必填 请输入 openid<br>PARAM_ERROR 页大小超过阈值 请不要超过最大的页大小<br>PARAM_ERROR 输入时间格式错误 请输入正确的时间格式<br>PARAM_ERROR 批次号必填 请输入批次号<br>PARAM_ERROR 商户号必填 请输入商户号<br>PARAM_ERROR 非法的批次状态 请检查批次状态 |
| 400    | MCH_NOT_EXISTS         | 商户号不合法           | 请输入正确的商户号                                                                                                                                                                                                                                                                                                                                                                                                       |
| 400    | INVALID_REQUEST        | openid 与 appID 不匹配 | 请使用 appID 下的的 openid<br>INVALID_REQUEST 活动已结束或未激活 请检查批次状态<br>INVALID_REQUEST 非法的商户号 请检查商户号是否正确                                                                                                                                                                                                                                                                                     |
| 400    | APPID_MCHID_NOT_MATCH  | 商户号与 appid 不匹配  | 请绑定调用接口的商户号和 APPID 后重试                                                                                                                                                                                                                                                                                                                                                                                    |
| 403    | USER_ACCOUNT_ABNORMAL  | 用户非法               | 该用户账号异常, 无法领券。商家可联系微信支付或让用户联系微信支付客服处理。                                                                                                                                                                                                                                                                                                                                               |
| 403    | NOT_ENOUGH             | 批次预算不足           | 请补充预算                                                                                                                                                                                                                                                                                                                                                                                                               |
| 403    | REQUEST_BLOCKED        | 调用商户无权限         | 请开通产品权限后再调用该接口<br>REQUEST_BLOCKED 商户无权发券 调用接口的商户号无权发券, 请检查是否是自己的批次或是已授权的批次。<br>REQUEST_BLOCKED 批次不支持跨商户发券 该批次未做跨商户号的授权, 请授权后再发放<br>REQUEST_BLOCKED 用户被限领拦截 用户领取已经达到上限, 请调高上限或停止发放。                                                                                                                          |
| 404    | RESOURCE_NOT_EXISTS    | 批次不存在             | 请检查批次 ID 是否正确                                                                                                                                                                                                                                                                                                                                                                                                   |
| 429    | FREQUENCY_LIMIT_EXCEED | 接口限频               | 请降低调用频率                                                                                                                                                                                                                                                                                                                                                                                                           |
