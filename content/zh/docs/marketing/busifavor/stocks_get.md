---
title: '查询商家券批次详情API'
linkTitle: ''
date: 2020.03.20
weight: 4
description: >
  服务商可通过该接口查询已创建的商家券批次详情信息。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/stocks/{stock_id}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 path 批次号
|||1212

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/busifavor/stocks/1212

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

商家券批次名称 stock_name string(24) 是 批次名称, 字数上限为 24 个字节长度(中文按 UTF8 编码算字节数）。
|||8 月 1 日活动券
批次归属商户号 belong_merchant string(15) 是 批次归属于哪个商户。
特殊规则: 最小长度取值为 8。
|||10000022
批次备注 comment string(20) 否 仅配置商户可见, 用于自定义信息。
|||活动使用
适用商品范围 goods_name string(15) 是 用来描述批次在哪些商品可用, 会显示在微信卡包中。
|||xxx 商品使用
批次类型 stock_type string(16) 是 批次类型
NORMAL: 固定面额满减券批次
DISCOUNT: 折扣券批次
EXCHANGE: 换购券批次
|||NORMAL +核销规则 coupon_use_rule object 是 券核销相关规则 +发放规则 stock_send_rule object 是 券发放相关规则 +自定义入口 custom_entrance object 否 卡详情页面, 可选择多种入口引导用户。 +样式信息 display_pattern_info object 否 创建批次时的样式信息。
批次状态 stock_state string(128) 是 批次状态
UNAUDIT: 审核中
RUNNING: 运行中
STOPED: 已停止
PAUSED: 暂停发放
|||RUNNING

券 code 模式 coupon_code_mode string(128) 是 枚举值:
WECHATPAY_MODE: 系统分配券 code。
MERCHANT_API: 商户发放时接口指定券 code。
MERCHANT_UPLOAD: 商户上传自定义 code, 发券时系统随机选取上传的券 code。
|||WECHATPAY_MODE
批次号 stock_id string(20) 是 批次唯一标识。
|||1212 +券 code 数量 coupon_code_count object 否 当且仅当 coupon_code_mode(券 code 模式）为 MERCHANT_UPLOAD(商户上传自定义 code）模式时, 返回该字段, 返回内容为商户上传 code 的数量信息。 +事件通知配置 notify_config object 否 query 事件回调通知商户的配置。 +批次发放情况 send_count_information object 否 query 批次发放情况
卡券背景颜色图

### 返回示例

```json
{
"stock_name": "8 月 1 日活动券",
"belong_merchant": "10000022",
"comment": "xxx 店使用",
"goods_name": "xxx 商品使用",
"stock_type": "NORMAL",
"coupon_use_rule": {
"coupon_available_time": {
"available_begin_time": "2015-05-20T13:29:35.120+08:00",
"available_end_time": "2015-05-20T13:29:35.120+08:00",
"available_day_after_receive": 3,
"available_week": {
"week_day": [
"1",
"2"
],
"available_day_time": [
{
"begin_time": 3600,
"end_time": 86399
}
]
},
"irregulary_avaliable_time": [
{
"begin_time": "2015-05-20T13:29:35.120+08:00",
"end_time": "2015-05-20T13:29:35.120+08:00"
}
]
},
"fixed_normal_coupon": {
"discount_amount": 5,
"transaction_minimum": 100
},
"discount_coupon": {
"discount_percent": 88,
"transaction_minimum": 100
},
"exchange_coupon": {
"exchange_price": 100,
"transaction_minimum": 100
},
"use_method": "OFF_LINE",
"mini_programs_appid": "wx23232232323",
"mini_programs_path": "/path/index/index"
},
"stock_send_rule": {
"max_amount": 100000,
"max_coupons": 100,
"max_coupons_per_user": 5,
"max_amount_by_day": 1000,
"max_coupons_by_day": 100,
"natural_person_limit": "false",
"prevent_api_abuse": "false",
"transferable": "false",
"shareable": "false"
},
"custom_entrance": {
"mini_programs_info": {
"mini_programs_appid": "wx234545656765876",
"mini_programs_path": "/path/index/index",
"entrance_words": "欢迎选购",
"guiding_words": "获取更多优惠"
},
"appid": "wx324345hgfhfghfg",
"hall_id": "233455656",
"store_id": "233554655"
},
"display_pattern_info": {
"description": "xxx 门店可用",
"merchant_logo_url": "https://xxx",
"merchant_name": "微信支付",
"background_color": "xxxxx",
"coupon_image_url": "图片 cdn 地址"
},
"stock_state": "RUNNING",
"coupon_code_mode": "MERCHANT_UPLOAD",
"stock_id": "1212",
"coupon_code_count": {
"total_count": 100,
"available_count": 50
}
}

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
400 PARAM_ERROR 参数错误 查看具体错误信息, 调整参数
400 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
400 RESOURCE_ALREADY_EXISTS 批次已存在 查看 out_request_no 字段是否重复使用
券已被其他订单核销 请通过查询券 API 确认券是否已被其他订单核销
404 RESOURCE_NOT_EXISTS 查询的资源不存在 请检查查询资源的对应 id 是否填写正确
403 NOAUTH 无权限 查看具体错误信息, 确认是否有权限
400 APPID_MCHID_NOT_MATCH appid 与请求方商户无关联关系 appid 与请求方商户不匹配, 请确认 appid 与请求方商户是否有关联关系
400 MCH_NOT_EXISTS 商户号不存在 请确认传入的商户号是否正确
404 USER_NOT_EXISTS openid 不正确 请确认传入的 openid 是否正确
500 SYSTEM_ERROR 系统失败 多为网络超时引起, 重试
429 FREQUENCY_LIMITED 频率限制 调用太频繁, 请降低调用接口频率
403 RULELIMIT 券不在有效期 请确认券是否能在当前时间核销
400 INVALID_REQUEST 发券模式不合法 请更换支持预上传 code 的批次后重试
上传的自定义 code 已达上限 请更换一个新的批次后重试
```
