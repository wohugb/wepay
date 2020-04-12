---
title: '创建全场满额送活动API'
linkTitle: '创建全场满额送活动API'
date: 2019.11.28
weight: 2
description: >
  商户可以创建满额送活动, 用户支付后送全场券, 提升交易额。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/paygiftactivity/unique-threshold-activity\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 类型 必填 描述 +活动基本信息 activity_base_info object 是 query 用于创建活动的基本信息。 +活动奖品发放规则 award_send_rule object 是 query 买 A 送 B 活动规则描述。 +活动高级设置 advanced_setting object 否 query 其他高级配置项, 商户自定义。
卡券背景颜色图

### 请求示例

```json
{
  "activity_base_info": {
    "activity_name": "良品铺子回馈活动",
    "activity_second_title": "海飞丝的券",
    "merchant_logo_url": "https://tool.oschina.net/regex.jpg",
    "background_color": "#B48EAD",
    "begin_time": "2015-05-20T13:29:35.120+08:00",
    "end_time": "2015-05-20T13:29:35.120+08:00",
    "available_periods": {
      "available_time": [
        {
          "begin_time": "2015-05-20T00:00:00.000+08:00",
          "end_time": "2015-05-20T23:59:59.000+08:00"
        }
      ],
      "available_day_time": [
        {
          "begin_day_time": "110000",
          "end_day_time": "135959"
        }
      ]
    },
    "out_request_no": "100002322019090134234sfdf",
    "delivery_purpose": "OFF_LINE_PAY",
    "mini_programs_appid": "wx23232232323",
    "mini_programs_path": "/path/index/index"
  },
  "award_send_rule": {
    "transaction_amount_minimum": 100,
    "send_content": "SINGLE_COUPON",
    "award_type": "BUSIFAVOR",
    "award_list": [
      {
        "stock_id": "98065001",
        "original_image_url": "https://tool.oschina.net/regex.jpg",
        "thumbnail_url": "https://tool.oschina.net/regex.jpg"
      }
    ],
    "merchant_option": "MANUAL_INPUT_MERCHANT",
    "merchant_id_list": ["10000022", "10000023"]
  },
  "advanced_setting": {
    "delivery_user_category": "DELIVERY_MEMBER_PERSON",
    "merchant_member_appid": "34567890",
    "payment_mode": {
      "payment_scene_list": ["APP_SCENE"]
    },
    "payment_method_information": {
      "payment_method": "CFT",
      "bank_abbreviation": "AHRCUB_CREDIT"
    },
    "goods_tags": ["xxx", "yyy"]
  }
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

活动 id activity_id string(20) 是 活动 id
|||10028001
创建时间 create_time string(32) 是 创建活动的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00

### 返回示例

```json
{
  "activity_id": "10028001",
  "create_time": "2015-05-20T13:29:35.120+08:00"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 根据错误提示, 传入正确参数
403 NO_AUTH 商户未被授权 登录商户平台核对, 传入正确信息
429 FREQUENCY_LIMITED 频率超限 请求量不要超过接口调用频率限制
400 INVALID_REQUEST 请求参数符合参数格式, 但不符合业务规则 根据错误提示, 传入符合业务规则的参数
400 MCH_NOT_EXISTS 商户号不存在 请确认发券商户号信息是否有误
404 RESOURCE_NOT_EXISTS 资源不存在或无可用 请确认资源均存在且可用
400 APPID_MCHID_NOT_MATCH appid 与 mchid 不匹配 请确认 appid 是否正确填写
401 SIGN_ERROR 签名错误或签名信息不完整 登录商户平台核对, 传入正确信息
