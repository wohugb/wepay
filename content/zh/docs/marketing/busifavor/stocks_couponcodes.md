---
title: '上传预存code API'
linkTitle: ''
date: 2019.11.8
weight: 8
description: >
  商家券的Code码可由微信后台随机分配, 同时支持商户自定义。如商家已有自己的优惠券系统, 可直接使用自定义模式。即商家预先向微信支付上传券Code, 当券在发放时, 微信支付自动从已导入的Code中随机取值(不能指定）, 派发给用户。

type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/stocks/{stock_id}/couponcodes\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock*id string(20) 是 path 商户券批次号
|||98065001
券 code 列表 coupon_code_list string
否 query 商户上传的券 code 列表, code 允许包含的字符有 0-9、a-z、A-Z、空格(仅含空格, 不含制表符、换行符、换页符等）、-、*、\、/、=、|。
特殊规则: 单个券 code 长度为【1, 32】, 条目个数限制为【1, 200】。
|||ABC9588200, ABC9588201
请求业务单据号 upload_request_no string(128) 是 query 商户上传 code 的凭据号, 商户侧需保持唯一性。
|||100002322019090134234sfdf

### 请求示例

```json
{
  "coupon_code_list": ["ABC9588200", "ABC9588201"],
  "upload_request_no": "100002322019090134234sfdf"
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 商户券批次号。
|||98065001
去重后上传 code 总数 total_count uint64 是 本次上传操作, 去重后实际上传的 code 数目。
|||500
上传成功 code 个数 success_count uint64 是 本次上传操作上传成功个数。
|||20
上传成功的 code 列表 success_codes string
否 本次新增上传成功的 code 信息。
特殊规则: 单个券 code 长度为【1, 32】, 条目个数限制为【1, 200】。
|||MMAA12345
上传成功时间 success_time string(32) 是 上传操作完成时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
上传失败 code 个数 fail_count uint64 否 本次上传操作上传失败的 code 数。
|||10 +上传失败的 code 及原因 fail_codes array 否 本次导入失败的 code 信息, 请参照错误信息, 修改后重试。
已存在的 code 列表 exist_codes string
否 历史已存在的 code 列表, 本次不会重复导入。
特殊规则: 单个券 code 长度为【1, 32】, 条目个数限制为【1, 200】。
|||ABCD2345
本次请求中重复的 code 列表 duplicate_codes string
否 本次重复导入的 code 会被自动过滤, 仅保留一个做导入, 如满足要求则成功；如不满足要求, 则失败；请参照报错提示修改重试。
特殊规则: 单个券 code 长度为【1, 32】, 条目个数限制为【1, 200】。
|||AACC2345

### 返回示例

正常示例

```http
> 200 Response
> {
> "stock_id": "98065001",
> "total_count": 500,
> "success_count": 20,
> "success_codes": [

    "MMAA12345"

],
"success_time": "2015-05-20T13:29:35.120+08:00",
"fail_count": 10,
"fail_codes": [
{
"coupon_code": "ABCD23456",
"code": "LENGTH_LIMIT",
"message": "长度超过最大值 32 位"
}
],
"exist_codes": [
"ABCD2345"
],
"duplicate_codes": [
"AACC2345"
]
}
```

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
