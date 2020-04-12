---
title: '用户结算通知 API'
linkTitle: '用户结算通知'
date: '2020-03-26'
weight: 1
description: >
  用户结算后, 微信会把用户结算信息发送给商户。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。
  推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理。如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功。在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱。

- 如果在所有通知频率(4 小时)后没有收到微信侧回调,商户应调用查询订单接口确认订单状态。

特别提醒: 商户系统对于确认订单通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失。

## 接口说明

**适用对象**: 直连商户\
**请求 URL**: 该链接是通过【先享卡模板配置】中提交的结算通知 URL 设置, 必须为 https 协议。如果链接无法访问, 商户将无法接收到微信通知。 通知 url 必须为直接可访问的 url, 不能携带参数。示例: “https://pay.weixin.qq.com/wxpay/pay.action”\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

通知规则
用户结算后, 微信会把用户结算信息发送给商户, 商户需要接收处理, 并返回应答。出于安全的考虑, 我们对数据进行加密, 商户需要先对通知数据进行解密, 才能得到用户结算信息。

对后台通知交互时, 如果微信收到商户的应答不符合规范或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功。 (通按照一定的频率重试, 最多重试 9 次。）

通知报文
用户领卡结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY）传输。通知的数据包括了加密的支付结果详情。

下面详细描述对通知数据进行解密的流程:

1、用商户平台上设置的 APIv3 密钥【微信商户平台—>账户设置—>API 安全—>设置 APIv3 密钥】, 记为 key。
2、针对 resource.algorithm 中描述的算法(目前为 AEAD_AES_256_GCM）, 取得对应的参数 nonce 和 associated_data。
3、使用 key、nonce 和 associated_data, 对数据密文 resource.ciphertext 进行解密, 得到 JSON 形式的资源对象。

注: AEAD_AES_256_GCM 算法的接口细节, 请参考 rfc5116。微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated_data 长度小于 16 个字节并可能为空。

通知参数
变量 类型 必填 参数名/描述/示例值 -
通知 ID id string(32) 是 通知的唯一 ID。
|||EV-2018022511223320873
通知创建时间 create_time string(16) 是 通知创建的时间, 格式为 yyyy-MM-ddTHH:mm:ss+08:00(标准 iso8601 时间格式）。
|||20180225112233
通知类型 event_type string(32) 是 通知的类型, 支付成功通知的类型为: DISCOUNT_CARD.SETTLEMENT
|||DISCOUNT_CARD.SETTLEMENT
通知数据类型 resource_type string(32) 是 通知的资源数据类型, 支付成功通知为 encryptresource。
|||encrypt-resource +通知数据 resource object 是 通知资源数据
json 格式, 见示例
回调摘要 summary string(64） 是 回调摘要
|||用户领卡
通知签名
加密不能保证通知请求来自微信。微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature。商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方。签名验证的算法请参考《微信支付 API v3 签名方案》。

通知应答
商户后台在正确处理回调之后, 需要返回 200 或者 204 的 HTTP 状态码。其他的状态码, 微信支付均认为通知失败, 并按照前述的策略定期发起通知。

注意: 当商户后台应答失败时, 微信支付将记录下应答的报文, 建议商户按照以下格式返回。

变量 |类型 |必填 |参数名/描述/示例值

返回状态码 code string(32) 是 错误码, SUCCESS 为接收成功, 其他错误码为失败。
|||SUCCESS
返回信息 message string(256) 否 返回信息, 如非空, 为错误原因。
|||系统错误

{
"code": "ERROR_NAME",
"message": "ERROR_DESCRIPTION",
}
回调示例
用户结算结果通知

{
"id":"EV-2018022511223320873",
"create_time":"20180225112233",
"resource_type":"encrypt-resource",
"event_type":"PAYSCORE.USER_CONFIRM",
"resource" : {
"algorithm":"AEAD_AES_256_GCM",
"ciphertext": "...",
"nonce": "...",
"associated_data": ""
}
}

商户对 resource 对象进行解密后, 得到的资源对象示例

{
"out*order_no": "233bcbf407e87789b8e471f251774f95",
"discount_card_id": "87789b2f25177433bcbf407e8e471f95",
"appid": "wxd678efh567hg6787",
"out_trade_no": "6e8369071cd942c0476613f9d1ce9ca3",
"service_id": "500001",
"order_id": "15646546545165651651",
"transaction_id": "1009660380201506130728806387",
"openid": "oUpF8uMuAJ2pxb1Q9zNjWeS6o",
"card_begin_time": "2015-05-20T13:29:35.120+08:00",
"card_end_time": "2015-05-20T13:29:35.120+08:00",
"card_name": "五一品牌活动",
"objective_description": "购买商品 3 次",
"reward_description": "每次减 5 元",
"estimated_reward_amount": 1000,
"online_instructions": "仅限商户 APP 使用",
"offline_instructions": "仅限商户门店使用",
"state": "CREATED",
"total_amount": 1000,
"deduction_amount": 1000,
"settlement_amount": 1000,
"create_time": "2015-05-20T13:29:35.120+08:00",
"pay_time": "2015-05-20T13:29:35.120+08:00",
"objectives": [
{
"objective_serial_no": "578354545",
"objective_id": 123456,
"count": 1,
"performance_time": "2015-05-20T13:29:35.120+08:00",
"performance_description": "购买商品",
"performance_type": "INCREASE",
"name": "一周购买三次商品",
"unit": "个",
"remark": "特价商品"
}
],
"rewards": [
{
"reward_serial_no": "578354",
"reward_id": 123456,
"count": 100,
"amount": 1,
"reward_time": "2015-05-20T13:29:35.120+08:00",
"description": "购买商品",
"reward_type": "INCREASE",
"name": "八折优惠",
"unit": "个",
"remark": "特价商品"
}
]
}
用户结算通知参数
变量 类型 必填 参数名/描述/示例值 -
先享卡订单号 out_order_no string(64） 是 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95
先享卡 ID discount_card_id string(64） 是 唯一标志一种先享卡。
|||87789b2f25177433bcbf407e8e471f95
商户订单号 out_trade_no string(32） 是 商户系统内部订单号, 要求 32 个字符内, 只能是数字、大小写字母*-|\* 且在同一个商户号下唯一。
|||6e8369071cd942c0476613f9d1ce9ca3
公众账号 ID appid string(32） 是 微信公众平台分配的与传入的商户号建立了支付绑定关系的 appid, 可在公众平台查看绑定关系。
|||wxd678efh567hg6787
服务 ID service_id string(32） 是 微信支付分服务 ID, 该服务 ID 有本接口对应产品的权限。
|||500001
微信支付服务订单号 order_id string(64） 是 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651
微信支付交易单号 transaction_id string(64） 否 微信支付的订单号, 仅在成功收款时才返回。
|||1009660380201506130728806387
用户标识 openid string(128） 是 微信用户在商户对应 appid 下的唯一标识。
|||oUpF8uMuAJ2pxb1Q9zNjWeS6o
先享卡开始时间 card_begin_time string(32） 是 1、先享卡开始时间, 用户领取先享卡后, 卡开始生效的时间。
2、遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
先享卡结束时间 card_end_time string(32） 是 1、先享卡结束时间, 用户领取先享卡后, 卡失效的时间。
2、遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
先享卡名称 card_name string(20） 是 先享卡名称
|||五一品牌活动
目标描述 objective_description string(15） 是 目标描述, 先享卡的目标描述
|||购买商品 3 次
奖励描述 reward_description string(15） 是 奖励描述, 先享卡的奖励描述
|||每次减 5 元
预估奖励金额 estimated_reward_amount uint64 是 预估奖励总价值, 预估用户领卡后可享受的奖励金额。
|||1000
线上使用说明 online_instructions string(50） 否 先享卡线上的使用范围及使用场景, online_instructions(线上使用说明）和 offline_instructions(线下使用说明）两者至少返回一个。
|||仅限商户 APP 使用
线下使用说明 offline_instructions string(50） 否 先享卡线下的使用范围及使用场景, online_instructions(线上使用说明）和 offline_instructions(线下使用说明）两者至少返回一个。。
|||仅限商户门店使用
订单状态 state enum 是 表示当前订单的状态, 枚举值:
CREATED: 订单已创建, 表示用户已经领取先享卡, 订单已创建成功。
SETTLING: 订单结算中, 表示用户领取的先享卡已到期, 订单正在结算。
CHARGING: 订单扣款中, 表示用户未完成先享卡目标且享受奖励金额, 需要扣回相应奖励金额, 正在扣款中。
CHARGED: 订单扣款成功, 表示用户未完成先享卡目标且享受奖励金额, 需要扣回相应奖励金额, 扣款已成功。
NO_CHARGE: 订单无需扣款, 表示用户已完成先享卡目标或者未享受奖励。
REVOKED: 订单已取消, 表示用户未享受奖励且未完成先享卡目标。
|||CREATED
总金额 total_amount uint64 否 订单总金额, 表示原本收取的用户已享奖励总金额, 单位为分。
|||1000
扣除金额 deduction_amount uint64 否 扣除金额, 表示订单减免金额, 单位为分。
|||1000
结算金额 settlement_amount uint64 否 结算金额, 表示实际收取用户的金额, 单位为分。
结算金额=订单总金额-扣除金额
|||1000
创建时间 create_time string(32） 是 订单创建时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00
支付时间 pay_time string(32） 否 用户成功支付的时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示北京时间 2015 年 05 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00 +目标达成明细列表 objectives array 否 用户完成的目标明细列表。 +奖励明细列表 rewards array 否 用户获得的奖励明细列表。
