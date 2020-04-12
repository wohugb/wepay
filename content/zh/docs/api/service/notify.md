---
title: '投诉通知回调 API'
linkTitle: '投诉通知回调'
date: '2020-2-17'
weight: 1
description: >
  商户创建投诉通知回调 URL 后, 当有新的投诉事件发生、投诉状态发生变化时, 商户会收到通知回调。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。 推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理。如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功。在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱。

- 如果在所有通知频率(4 小时)后没有收到微信侧回调, 商户应调用查询订单接口确认订单状态。

特别提醒: 商户系统对于开启结果通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失。

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: 该链接是通过【创建投诉通知回调接口】中提交的参数 url 设置, 如果链接无法访问, 商户将无法接收到微信通知。\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

通知规则
新投诉产生、投诉状态发生变化时, 微信后台会把投诉信息发送给商户, 商户需要接收处理该消息, 并返回应答。

对后台通知交互时, 如果微信收到应答不是成功或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功。(通知频率为 15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h - 总计 24h4m）

通知报文
用户确认结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY）传输。通知的数据包括了加密的支付结果详情。

下面详细描述对通知数据进行解密的流程:

1、用商户平台上设置的 APIv3 密钥【微信商户平台(pay.weixin.qq.com）—>账户设置—>API 安全—>设置 APIv3 密钥】, 记为 key；
2、针对 resource.algorithm 中描述的算法(目前为 AEAD_AES_256_GCM）, 取得对应的参数 nonce 和 associated_data；
3、使用 key、nonce 和 associated_data, 对数据密文 resource.ciphertext 进行解密, 得到 JSON 形式的资源对象；

注: AEAD_AES_256_GCM 算法的接口细节, 请参考 rfc5116。微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated_data 长度小于 16 个字节并可能为空。

通知参数
变量 类型 必填 参数名/描述/示例值 -
通知 ID id string
(32) 是 通知的唯一 ID
|||EV-2018022511223320873
通知创建时间 create_time string
(16) 是 通知创建的时间, 使用 rfc3339 所定义的格式。
使用北京时间(+08:00）
|||2018-05-23T12:13:50+08:00
通知类型 event_type string
(32) 是 通知的类型, 投诉事件通知的类型, 具体如 下:
COMPLATINT.CREATE : 产生新投诉
COMPLAINT. STATE_CHANGE : 投诉状态变化
|||COMPLATINT.CREATE
通知数据类型 resource_type string
(32) 是 通知的资源数据类型, 支付成功通知为 encrypt-resource
|||encrypt-resource
回调摘要 summary string(64) 是 回调摘要
|||产生新投诉 +通知数据 resource object 是 通知资源数据
json 格式, 见示例
通知签名
加密不能保证通知请求来自微信。微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature。商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方。签名验证的算法请参考《微信支付 API v3 签名方案》

通知应答
变量 类型 必填 参数名/描述/示例值 -
返回状态码 code string(32） 是 错误码, SUCCESS 为接收成功, 其他错误码为失败。
|||SUCCESS
返回信息 message string(256） 否 返回信息, 如非空, 为错误原因。
|||SUCCESS
支付通知 http 应答码为 200 或 204 才会当作正常接收, 当回调处理异常时, 应答的 HTTP 状态码应为 500, 或者 4xx。

注意: 当商户后台应答失败时, 微信支付将记录下应答的报文, 建议商户按照以下格式返回。

{
"code": "ERROR_NAME",
"message": "ERROR_DESCRIPTION",
}
回调示例
新生成投诉通知

{
"id":"EV-2018022511223320873",
"create_time":"20180225112233",
"resource_type":"encrypt-resource",
"event_type":"TRANSACTION.SUCCESS",
"resource" : {
"algorithm":"AEAD_AES_256_GCM",
"ciphertext": "...",
"nonce": "...",
"associated_data": ""
}
}

商户对 resource 对象进行解密后, 得到的资源对象示例

{
"out_trade_no": "20190906154617947762231",
"complaint_time": "2015-05-20T13:29:35.120+08:00",
"amount": 3,
"payer_phone": "18500000000",
"complaint_detail": "反馈一个重复扣费的问题",
"complaint_state": "PAYER_COMPLAINTED",
"transaction_id": "4200000404201909069117582536",
"frozen_end_time": "2015-05-20T13:29:35.120+08:00",
"sub_mchid": "1900012181"
}
支付成功通知参数
变量 类型 必填 参数名/描述/示例值 -
商户订单号 out_trade_no string(64） 是 投诉对应的商户订单号。
|||20190906154617947762231
投诉时间 complaint_time string(32） 是 投诉时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
交易金额 amount uint32 是 订单金额, 单位为分。
|||3
投诉人联系方式 payer_phone string(256） 否 投诉人联系方式, 该字段已做加密处理, 具体解密方法详见敏感信息加密说明。
|||18500000000
投诉描述 complaint_detail string(300） 是 投诉具体描述。
|||反馈一个重复扣费的问题
投诉单状态 complaint_state string(30） 是 枚举值:
PAYER_COMPLAINTED: 用户已投诉
FROZENED: 交易已冻结
FROZEN_FINISHED: 冻结已结束
PAYER_CANCELED: 用户已撤诉
MERCHANT_REFUNDED: 商户已退款
SYSTEM_REFUNDED: 系统(微信支付）已退款
MANUAL_UNFROZEN: 人工(微信支付运营人员）手动解冻
|||PAYER_COMPLAINTED
微信订单号 transaction_id string(64） 是 投诉对应的微信订单号
|||4200000404201909069117582536
冻结结束时间 frozen_end_time string(32） 否 若该投诉涉及资金冻结, 则此字段表示冻结结束时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
子商户号 sub_mchid string(64） 否 当服务商或渠道商查询时返回, 具体的子商户标识。
|||1900012181
