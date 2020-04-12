---
title: '核销事件回调通知 API'
linkTitle: '核销回调通知'
date: '2019-12-25'
weight: 15
description: >

type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。 推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理。如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功。在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱。

- 如果在所有通知频率(4 小时)后没有收到微信侧回调, 商户应调用查询订单接口确认订单状态。

特别提醒: 商户系统对于开启结果通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失。

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: 该链接是通过[商户配置]提交 service_notify_url 设置, 必须为 https 协议。如果链接无法访问, 商户将无法接收到微信通知。 通知 url 必须为直接可访问的 url, 不能携带参数。示例: “https://pay.weixin.qq.com/wxpay/pay.action”\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 通知规则

支付完成后, 微信会把相关支付结果和用户信息发送给商户, 商户需要接收处理, 并按照文档规范返回应答。出于安全的考虑, 我们对支付结果数据进行了加密, 商户需要先对通知数据进行解密, 才能得到支付结果数据。

对后台通知交互时, 如果微信收到应答不是成功或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功。(通知频率为 15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h - 总计 24h4m）

## 通知报文

支付结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY）传输。通知的数据包括了加密的支付结果详情。

下面详细描述对通知数据进行解密的流程:

1、用商户平台上设置的 APIv3 密钥【微信商户平台(pay.weixin.qq.com）—>账户设置—>API 安全—>设置 APIv3 密钥】, 记为 key。
2、针对 resource.algorithm 中描述的算法(目前为 AEAD_AES_256_GCM）, 取得对应的参数 nonce 和 associated_data。
3、使用 base64 对 resource.ciphertext 进行解码, 得到 strBase64DecodeText；
4、使用 key、nonce 和 associated_data, 对数据密文 strBase64DecodeText 进行解密, 得到 JSON 形式的资源对象。

注: AEAD_AES_256_GCM 算法的接口细节, 请参考 rfc5116。微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated_data 长度小于 16 个字节并可能为空。

## 通知参数

变量 |类型 |必填 |参数名/描述/示例值

通知 ID id string(32) 是 通知的唯一 id。
|||EV-2018022511223320873
通知创建时间 create_time string(16) 是 通知创建的时间, 格式为 yyyyMMddHHmmss。
|||20180225112233
通知类型 event_type string(32) 是 通知的类型, 代金券用券回调通知的类型为 COUPON.USE。
|||COUPON.USE
通知数据类型 resource_type string(32) 是 通知的资源数据类型, 代金券用券回调通知为 encrypt-resource。
|||encrypt-resource
回调摘要 summary string(62) 是 回调摘要
|||用券成功 +通知数据 resource object 是 通知资源数据。
json 格式, 见示例
通知签名
加密不能保证通知请求来自微信。微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature。商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方。签名验证的算法请参考《微信支付 API v3 签名方案》。

## 通知应答

支付通知 http 应答码为 200 或 204 才会当作正常接收, 当回调处理异常时, 应答的 HTTP 状态码应为 500, 或者 4xx。

变量 |类型 |必填 |参数名/描述/示例值

返回状态码 code string(32) 是 错误码, SUCCESS 为清算机构接收成功, 其他错误码为失败。
|||SUCCESS
返回信息 message string(64) 是 返回信息, 如非空, 为错误原因。
|||系统错误
注意: 当商户后台应答失败时, 微信支付将记录下应答的报文, 建议商户按照以下格式返回。

```json
{
  "code": "ERROR_NAME",
  "message": "ERROR_DESCRIPTION"
}
```

## 回调示例

支付成功结果通知

```json
{
  "id": "EV-2018022511223320873",
  "create_time": "20180225112233",
  "resource_type": "encrypt-resource",
  "event_type": "COUPON.USE",
  "summary": "支付成功",
  "resource": {
    "original_type": "coupon",
    "algorithm": "AEAD_AES_256_GCM",
    "ciphertext": "...",
    "nonce": "...",
    "associated_data": ""
  }
}
```

商户对 resource 对象进行解密后, 得到的资源对象示例

```json
{
  "stock_creator_mchid": "9800064",
  "stock_id": "9865888",
  "coupon_id": "98674556",
  "singleitem_discount_off": {
    "single_price_max": 100
  },
  "discount_to": {
    "cut_to_price": 100,
    "max_price": 10
  },
  "coupon_name": "微信支付代金券",
  "state": "EXPIRED",
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

## 支付成功通知参数

变量 |类型 |必填 |参数名/描述/示例值

创建批次的商户号 stock_creator_mchid string(20) 是 批次创建方商户号。
|||9800064
批次号 stock_id string(20) 是 微信为每个代金券批次分配的唯一 id。
|||9865888
代金券 id coupon_id string(20) 是 微信为代金券唯一分配的 id。
|||98674556 +单品优惠特定信息 singleitem_discount_off object 否 单品优惠特定信息。 +减至优惠特定信息 discount_to object 否 减至优惠限定字段, 仅减至优惠场景有返回。
代金券名称 coupon_name string(20) 是 代金券名称
|||微信支付代金券
代金券状态 status string
是 代金券状态:
SENDED: 可用
USED: 已实扣
EXPIRED: 已过期
|||EXPIRED
代金券描述 description string(3000) 是 代金券描述说明字段。
|||微信支付营销
领券时间 create_time string(32) 是 领券时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
券类型 coupon_type string
是 NORMAL: 满减券
CUT_TO: 减至券
|||CUT_TO
是否无资金流 no_cash bool 是 true: 是
false: 否
|||true
可用开始时间 available_begin_time string(32) 是 可用开始时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
可用结束时间 available_end_time string(32) 是 可用结束时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
是否单品优惠 singleitem bool 是 true: 是
false: 否
|||true +普通满减券信息 normal_coupon_information object 否 普通满减券面额、门槛信息。 +实扣代金券信息 consume_information object 否 已实扣代金券信息。
