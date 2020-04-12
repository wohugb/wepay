---
title: '确认订单回调通知 API'
linkTitle: '确认订单回调通知'
date: 2020.03.05
weight: 4
description: >
  微信支付分通过确认订单通知接口将用户确认订单消息通知给商户
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。 推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理。如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功。在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱。

- 如果在所有通知频率(4 小时)后没有收到微信侧回调,商户应调用查询订单接口确认订单状态。

特别提醒: 商户系统对于确认订单通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失。

## 接口说明

**适用对象**: 微信支付分\
**请求 URL**: 该链接是通过商户[创建支付分订单]提交 notify_url 参数, 必须为 https 协议。如果链接无法访问, 商户将无法接收到微信通知。 通知 url 必须为直接可访问的 url, 不能携带参数。示例: “https://pay.weixin.qq.com/wxpay/pay.action”\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

通知规则
用户确认完成后, 微信后台会把相关确认结果和订单信息发送给商户, 商户需要接收处理该消息, 并返回应答。

对后台通知交互时, 如果微信收到商户的应答不符合规范或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功。 (通知频率为 15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h - 总计 24h4m）

通知报文
用户确认结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY）传输。通知的数据包括了加密的支付结果详情。

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
通知类型 event_type string(32) 是 通知的类型
1、授权成功通知的类型为 PAYSCORE.USER_OPEN_SERVICE
2、解除授权成功通知的类型为 PAYSCORE.USER_CLOSE_SERVICE
3、用户确认成功通知的类型为 PAYSCORE.USER_CONFIRM
4、支付成功通知的类型为 PAYSCORE.USER_PAID
|||PAYSCORE.USER_OPEN_SERVICE
通知数据类型 resource_type string(32) 是 通知的资源数据类型, 授权/解除授权成功通知为 encryptresource。
|||encrypt-resource +通知数据 resource object 是 通知资源数据
json 格式, 见示例
通知签名
加密不能保证通知请求来自微信。微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature。商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方。签名验证的算法请参考《微信支付 API v3 签名方案》。

通知应答
商户后台在正确处理回调之后, 需要返回 200 或者 204 的 HTTP 状态码。其他的状态码, 微信支付均认为通知失败, 并按照前述的策略定期发起通知。

注意: 当商户后台应答失败时, 微信支付将记录下应答的报文, 建议商户按照以下格式返回。

{
"code": "ERROR_NAME",
"message": "ERROR_DESCRIPTION",
}
回调示例
订单确认结果通知

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
"appid": "wxd678efh567hg6787",
"mchid": "1230000109",
"out_order_no": "1234323JKHDFE1243252",
"service_id": "500001",
"openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
"state": "DOING",
"state_description": "USER_CONFIRM",
"total_amount": "40000",
"service_introduction": "嗨客餐厅用餐",
"post_payments": [
{
"name": "服务费",
"amount": 40000,
"description": "每分钟 1 元"
}
],
"post_discounts": [
{
"name": "满 20 减 1 元",
"amount": 1,
"description": "不与其他优惠叠加"
}
],
"risk_fund": {
"name": "ESTIMATE_ORDER_COST",
"amount": 10000,
"description": "就餐的预估费用"
},
"time_range": {
"start_time": "20091225091010",
"end_time": "20091225091210"
},
"location": {
"start_location": "嗨客时尚主题展餐厅",
"end_location": "嗨客时尚主题展餐厅"
},
"attach": "attach",
"order_id": "165461131"
}
确认订单通知参数
变量 类型 必填 参数名/描述/示例值 -
公众账号 ID appid string(32) 是 调用接口提交的公众账号 ID。
|||wxd678efh567hg6787
商户号 mchid string(32) 是 调用接口提交的商户号。
|||1230000109
商户服务订单号 out_order_no string(32) 是 调用接口提交的商户服务订单号。
|||1234323JKHDFE1243252
服务 ID service_id string(32) 是 调用该接口提交的服务 ID。
|||500001
用户标识 openid string(128) 是 微信用户在商户对应 appid 下的唯一标识。
|||oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
服务订单状态 state string(32) 是
表示当前单据状态。

枚举值:
1、CREATED: 商户已创建服务订单
2、DOING: 服务订单进行中
3、DONE: 服务订单完成
4、REVOKED: 商户取消服务订单
5、EXPIRED: 服务订单已失效, "商户已创建服务订单"状态超过 30 天未变动, 则订单失效
|||CREATED

订单状态说明 state_description string(32) 否 对服务订单"进行中"状态的附加说明。
1、USER_CONFIRM: 用户确认
2、MCH_COMPLETE: 商户完结
|||MCH_COMPLETE
商户收款总金额 total_amount int 否 总金额, 大于等于 0 的数字, 单位为分, 只能为整数, 详见支付金额。
此参数需满足: 总金额=后付费项目金额之和-后付费商户优惠项目金额之和, 且小于等于订单风险金额。取消订单时, 该字段必须为 0。
|||40000
服务信息 service_introduction string(20) 是 服务信息, 用于介绍本订单所提供的服务
不超过 20 个字符, 超出报错处理。
|||嗨客餐厅用餐 +后付费项目 post_payments array 是 付费项目列表, 最多包含 100 条付费项目。 +商户优惠 post_discounts array 否 商户优惠列表, 最多包含 5 条商户优惠。 +订单风险金 risk_fund object 是 订单风险金信息 +服务时间段 time_range object 是 服务使用时间范围 +服务位置 location object 否 服务使用位置信息。
商户数据包 attach string(200) 否 商户数据包可存放本订单所需信息, 需要先 urlencode 后传入。
当商户数据包总长度超出 256 字符时, 报错处理。
|||attach
微信支付服务订单号 order_id string(64) 否 微信支付服务订单号, 每个微信支付服务订单号与商户号下对应的商户服务订单号一一对应。
|||15646546545165651651
是否需要收款 need_collection bool 否 是否需要收款。
true: 微信支付分代收款
false: 无需微信支付分代收款
|||false
