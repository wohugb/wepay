---
title: 'APP调起支付分-订单详情'
linkTitle: 'APP调起支付分'
date: 2020.03.05
weight: 5
description: >
  商户通过调用订单详情接口打开微信支付分小程序, 引导用户查看订单详情(APP端）
type: 'docs'
---

简介
App 跳转支付分需要引用新的 openSDK

Android openSDK 下载地址(版本>=5.3.1）: Android 资源下载

Android 接入文档链接: openSDK 说明文档

iOS openSDK 下载地址(版本>=1.8.4）: iOS 资源下载

iOS 接入文档链接: openSDK 说明文档

接口名称: WXOpenBusinessView

接口兼容:
● iOS 兼容性表现: 若微信版本 >= 7.0.3, 开发者可以通过此 openSDK 接口跳转到微信支付分小程序；若微信版本 < 7.0.3, 开发者通过此 openSDK 接口可以跳转到微信, 但不能跳转到微信支付分小程序, 此时微信会提示用户可能由于应用的请求非法或者微信版本过低。

● Android 兼容性表现: 若微信版本>=7.0.3, 开发者可以通过此 openSDK 接口跳转到微信支付分小程序；若微信版本< 7.0.3, 开发者通过此 openSDK 接口不能跳转到微信, 此时开发者应提示用户更新微信版本。

接口参数
Android 对应对象: WXOpenBusinessView.Req

iOS 对应对象: WXOpenBusinessViewReq

Object WXOpenBusinessView.Req & Object WXOpenBusinessViewReq
变量 类型 必填 参数名/描述/示例值 -
跳转类型 businessType string(16) 是 固定配置: wxpayScoreDetail
|||wxpayScoreDetail
业务参数 query string(2048) 是 使用 URL 的 query string
方式传递参数, 格式为 key=value&key2=value2, 其中 value, value2 需要进行 UrlEncode 处理。
|||见 query 示例
其他配置 extInfo string(128) 否 自定义 ext 信息, json 格式, 如需指定小程序版本, 可填 {"miniProgramType": type}, 默认正式版。
type 取值:
0: 正式版
|||{"miniProgramType": 0}

query 示例

mch_id=1230000109&
service_id=88888888000011&out_order_no=1234323JKHDFE1243252&
timestamp=1530097563&nonce_str=zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2&
sign_type=HMAC-SHA256&sign=029B52F67573D7E3BE74904BF9AEA
query 内部参数
变量 类型 必填 参数名/描述/示例值 -
商户号 mch_id string(32) 是 微信支付分配的商户号。
|||1230000109
服务 ID service_id string(32) 是 服务 ID
|||88888888000011
商户服务订单号 out_order_no string(32) 是 商户系统内部服务订单号(不是交易单号）。
|||234323JKHDFE1243252
时间戳 timestamp string(32) 是 生成签名时间戳, 单位秒。
|||1530097563
随机字符串 nonce_str string(32) 是 生成签名随机串。由数字、大小写字母组成, 长度不超过 32 位。
|||zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2
签名方式 sign_type string(32) 是 签名类型, 仅支持 HMAC-SHA256。
|||HMAC-SHA256
签名 sign string(64) 是 使用字段 mch_id、service_id、out_order_no、timestamp、nonce_str、sign_type 按照签名生成算法计算得出的签名值。
|||029B52F67573D7E3BE74904BF9AEA
IOS
Android

WXOpenBusinessViewReq \*req = [WXOpenBusinessViewReq object];
req.businessType = @"wxpayScoreDetail";
req.query = @"mch_id=1230000109&service_id=88888888000011&
out_order_no=1234323JKHDFE1243252&
timestamp=1530097563&
nonce_str=zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2&sign_type=HMAC-SHA256&sign=029B52F67573D7E3BE74904BF9AEA";
req.extInfo = @"{\"miniProgramType\":0}";
[WXApi sendReq:req];
