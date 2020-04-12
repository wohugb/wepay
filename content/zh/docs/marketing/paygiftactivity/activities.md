---
title: '查询活动详情接口API'
linkTitle: '查询活动详情接口API'
date: 2019.11.28
weight: 4
description: >
  商户创建活动后, 可以通过该接口查询支付有礼的活动详情, 用于管理活动。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/paygiftactivity/activities/{activity_id}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

活动 id activity_id string(20) 是 path 活动 id
|||10028001

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/paygiftactivity/activities/10028001

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

活动 id activity_id string(20) 是 活动 id
|||10028001
活动类型 activity_type enum 否 活动类型
枚举值:
FULL_SEND_ACT_TYPE: 满额送
STEP_SEND_ACT_TYPE: 阶梯送
SPECIFIC_SEND_ACT_TYPE: 满 A 送 B
|||FULL_SEND_ACT_TYPE +活动基本信息 activity_base_info object 是 用于创建活动的基本信息。 +活动奖品发放规则 award_send_rule object 是 阶梯送活动规则描述, 多门槛送券。 +活动高级设置 advanced_setting object 否 其他高级配置项, 商户自定义。
活动状态 activity_status enum 是 活动当前状态。
枚举值:
CREATE_ACT_STATUS: 已创建
ONGOING_ACT_STATUS: 运行中
TERMINATE_ACT_STATUS: 已终止
STOP_ACT_STATUS: 已暂停
OVER_TIME_ACT_STATUS: 已过期
CREATE_ACT_FAILED: 创建活动失败
|||CREATE_ACT_STATUS
创建商户号 creator_merchant_id string(15) 是 创建商户号
特殊规则: 最小字符长度为 8。
|||10000022
所属商户号 belong_merchant_id string(15) 是 所属商户号
特殊规则: 最小字符长度为 8。
|||10000022
活动暂停时间 pause_time string(32) 否 暂停活动的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
活动恢复时间 recovery_time string(32) 否 恢复活动的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
活动创建时间 create_time string(32) 否 创建活动的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
活动更新时间 update_time string(32) 否 更新活动的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
卡券背景颜色图

### 返回示例

```json
{
  "activity_id": "10028001",
  "activity_type": "FULL_SEND_ACT_TYPE",
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
    "full_send_rule": {
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
    "step_send_rule": {
      "award_type": "BUSIFAVOR",
      "rule_list": [
        {
          "transaction_amount_minimum": 100,
          "award_info": {
            "stock_id": "98065001",
            "original_image_url": "https://tool.oschina.net/regex.jpg",
            "thumbnail_url": "https://tool.oschina.net/regex.jpg"
          }
        }
      ],
      "merchant_option": "MANUAL_INPUT_MERCHANT",
      "merchant_id_list": ["10000022", "10000023"]
    },
    "specific_send_rule": {
      "threshold_category": "AMOUNT_THRESHOLD",
      "transaction_amount_minimum": 100,
      "goods_id_list": ["234", "567"],
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
    }
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
  },
  "activity_status": "CREATE_ACT_STATUS",
  "creator_merchant_id": "10000022",
  "belong_merchant_id": "10000022",
  "pause_time": "2015-05-20T13:29:35.120+08:00",
  "recovery_time": "2015-05-20T13:29:35.120+08:00",
  "create_time": "2015-05-20T13:29:35.120+08:00",
  "update_time": "2015-05-20T13:29:35.120+08:00"
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
