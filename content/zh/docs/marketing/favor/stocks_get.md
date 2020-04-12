---
title: '查询批次详情API'
linkTitle: '查询批次'
date: '2019-09-27'
weight: 7
description: >
  通过此接口可查询批次信息, 包括批次的配置信息以及批次概况数据。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/stocks/{stock_id}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 path 微信为每个代金券批次分配的唯一 id。
|||9856888
创建批次的商户号 stock_creator_mchid string(20) 是 path 批次创建时的商户号。
|||123456

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/favor/stocks/9856888?stock_creator_mchid=123456

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 微信为每个代金券批次分配的唯一 id。
|||9836588
创建批次的商户号 stock_creator_mchid string(20) 是 批次创建方商户号。
|||123456
批次名称 stock_name string(20) 是 批次名称
|||微信支付批次
批次状态 status string(12) 是 批次状态
枚举值:
unactivated: 未激活
audit: 审核中
running: 运行中
stoped: 已停止
paused: 暂停发放
|||paused
创建时间 create_time string(32) 是 批次创建时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
使用说明 description string(3000) 是 批次描述信息
|||微信支付营销 +满减券批次使用规则 stock_use_rule
object

否 普通发券批次特定信息。
|||1900000109
可用开始时间 available_begin_time string(32) 是 可用开始时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
可用结束时间 available_end_time string(32) 是 可用结束时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
已发券数量 distributed_coupons uint32 是 已发券数量
|||100
是否无资金流 no_cash bool 是 是否无资金流。
ture: 是
false: 否
|||true
激活批次的时间 start_time string(32) 否 批次激活开启时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
终止批次的时间 stop_time string(32) 否 批次永久停止时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00 +减至批次特定信息 cut_to_message
object

否 单品优惠特定信息。
是否单品优惠 singleitem bool 是 枚举值:
true: 是
false: 否
|||true
批次类型 stock_type string(16) 是 批次类型, 枚举值:
NORMAL: 代金券批次
DISCOUNT_CUT: 立减与折扣
OTHER: 其他
|||NORMAL

### 返回示例

```json
{
"stock_id": "9836588",
"stock_creator_mchid": "123456",
"stock_name": "微信支付批次",
"status": "paused",
"create_time": "2015-05-20T13:29:35.120+08:00",
"description": "微信支付营销",
"stock_use_rule": {
"max_coupons": 100,
"max_amount": 5000,
"max_amount_by_day": 400,
"max_coupons_per_user": 3,
"trade_type": "MICROAPP",
},
"available_begin_time": "2015-05-20T13:29:35.120+08:00",
"available_end_time": "2015-05-20T13:29:35.120+08:00"
"distributed_coupons": 100,
"no_cash": true,
"cut_to_message": {
"single_price_max": 100,
"cut_to_price": 5000,
},
"singleitem": true,
"stock_type": "NORMAL",
}

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
```
