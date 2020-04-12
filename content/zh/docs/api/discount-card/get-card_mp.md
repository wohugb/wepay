---
title: '小程序拉起先享卡小程序领卡 API'
linkTitle: '小程序拉起先享卡小程序领卡'
date: '2020-03-26'
weight: 1
description: >
  通过调用该接口打开先享卡小程序, 引导用户领取先享卡。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同调用该接口时, 需要在代码配置(app.json 中的 navigateToMiniProgramAppIdList 选项）中声明将要跳转的小程序名单。

## 接口说明

**适用对象**: 直连商户

接口名称: wx.navigateToMiniProgram, 详情请参见《小程序跳转 API》文档

接口兼容: 每个小程序可跳转的其他小程序数量限制为不超过 10 个。

先享卡小程序 appid 为: wxcc2e4fbc5887661e

先享卡领取页路径为: /pages/get-card/get-card

接口参数
extraData
变量 类型 必填 参数名/描述/示例值 -
先享卡 ID discount*card_id string(64） 是 唯一标志一种先享卡。
|||87789b2f25177433bcbf407e8e471f95
商户号 mch_id string(16） 是 微信支付分配的商户号。
|||1230000109
公众账号 ID appid string(32） 是 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
|||wxd678efh567hg6787
商户订单号 out_trade_no string(32） 是 商户系统内部订单号, 要求 32 个字符内, 只能是数字、大小写字母*-|\* 且在同一个商户号下唯一。
|||6e8369071cd942c0476613f9d1ce9ca3
时间戳 timestamp string(32） 是 生成签名时间戳, 单位秒。
|||1530097563
随机串 nonce_str string(32） 是 生成签名随机串, 由数字、大小写字母组成, 长度不超过 32 位。
|||zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2
签名类型 sign_type string(32） 是 签名类型, 仅支持 WECHATPAY2-SHA256-RSA2048。
|||WECHATPAY2-SHA256-RSA2048
商户 API 证书序列号 serial_no string(128） 是 商户 API 证书序列号 serial_no, 用于声明所使用的证书。
|||42A5C4F7F70D57D0576BBEDA0E0928D6E5C4F003
签名串 sign string(1024） 是 签名串, 使用字段 discount_card_id、mch_id、appid、out_trade_no、timestamp、nonce_str 按照以下规则用私钥进行 SHA256withRSA 签名:
公众号 ID\n
时间戳\n
随机串\n
先享卡 ID\n
商户号\n
商户订单号\n
|||LsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/4nLBiCwIUFluw==
示例代码

wx.navigateToMiniProgram({
appid: "wxcc2e4fbc5887661e",
path: "/pages/get-card/get-card",
extraData: {
discount_card_id: "87789b2f25177433bcbf407e8e471f95",
appid: "wxd678efh567hg6787",
mch_id: "1230000109",
out_trade_no: "6e8369071cd942c0476613f9d1ce9ca3",
timestamp: "1530097563",
nonce_str: "zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2",
sign_type: "WECHATPAY2-SHA256-RSA2048",
serial_no: "LsIkVxFJ8XyUgx9FmutKSYTmYtWBZ0+tNvfGmbXU7cob8H/4nLBiCwIUFluw=="
}
});
