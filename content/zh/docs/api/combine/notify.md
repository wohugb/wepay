---
title: '支付通知API'
linkTitle: '异步通知'
weight: 5
description: >
  微信支付通过支付通知接口将用户支付成功消息通知给商户
type: 'docs'
---

{{% alert title="注意" color="warning" %}}

- 同样的通知可能会多次发送给商户系统. 商户系统必须能够正确处理重复的通知. 推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理. 如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功. 在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱.

- 如果在所有通知频率(4 小时)后没有收到微信侧回调, 商户应调用查询订单接口确认订单状态.

**特别提醒**: 商户系统对于开启结果通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失.

{{% /alert %}}

## 接口说明

- **适用对象**: `电商平台` `服务商` `直连商户`
- **请求 URL**: 该链接是通过[合单下单-APP 支付](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/ecommerce/combine/chapter3_1.shtml)、[合单下单-JS 支付](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/ecommerce/combine/chapter3_2.shtml)提交 notify_url 参数设置, 必须为 https 协议. 如果链接无法访问, 商户将无法接收到微信通知. 通知 url 必须为直接可访问的 url, 不能携带参数. 示例: “https://pay.weixin.qq.com/wxpay/pay.action”
- **接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 通知规则

用户支付完成后, 微信会把相关支付结果和用户信息发送给清算机构, 清算机构需要接收处理后返回应答成功, 然后继续给异步通知到下游从业机构.

对后台通知交互时, 如果微信收到应答不是成功或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功.

**通知频率**为 _15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h_ - 总计 _24h4m_

## 通知报文

支付结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY)传输. 通知的数据包括了加密的支付结果详情.

下面详细描述对通知数据进行解密的流程:

1. 用商户平台上设置的 APIv3 密钥 [`微信商户平台`](https://pay.weixin.qq.com/)->`账户设置`->`API 安全`->`设置 APIv3 密钥`, 记为 key；
2. 针对 resource.algorithm 中描述的算法(目前为 AEAD_AES_256_GCM), 取得对应的参数 nonce 和 associated_data；
3. 使用 key、nonce 和 associated_data, 对数据密文 resource.ciphertext 进行解密, 得到 JSON 形式的资源对象；

**注**: AEAD_AES_256_GCM 算法的接口细节, 请参考 [rfc5116](https://tools.ietf.org/html/rfc5116). 微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated_data 长度小于 16 个字节并可能为空.

## 通知参数

| 参数                       | 类型       | 必填 | 参数名/描述/示例值                                                  |
| -------------------------- | ---------- | ---- | ------------------------------------------------------------------- |
| id                         | string(32) | 是   | `通知 ID`, 通知的唯一 ID                                            |
|                            |            |      | EV-2018022511223320873                                              |
| create_time                | string(16) | 是   | `通知创建时间`, 格式为 yyyyMMddHHmmss                               |
|                            |            |      | 20180225112233                                                      |
| event_type                 | string(32) | 是   | `通知类型`, 支付成功通知的类型为 TRANSACTION.SUCCESS                |
|                            |            |      | TRANSACTION.SUCCESS                                                 |
| resource_type              | string(32) | 是   | `通知数据类型`, 通知的资源数据类型, 支付成功通知为 encrypt-resource |
|                            |            |      | encrypt-resource                                                    |
| :arrow_right_hook:resource | object     | 是   | `通知数据` 通知资源数据 json 格式, 见示例                           |

通知数据(resource)

| 参数            | 类型            | 必填 | 参数名/描述/示例值                                                            |
| --------------- | --------------- | ---- | ----------------------------------------------------------------------------- |
| algorithm       | string(32)      | 是   | `加密算法类型`, 对开启结果数据进行加密的加密算法，目前只支持 AEAD_AES_256_GCM |
|                 |                 |      | AEAD_AES_256_GCM                                                              |
| ciphertext      | string(1048576) | 是   | `数据密文`, Base64 编码后的开启/停用结果数据密文                              |
|                 |                 |      | sadsadsadsad                                                                  |
| associated_data | string(16)      | 否   | `附加数据`                                                                    |
|                 |                 |      | fdasfwqewlkja484w                                                             |
| nonce           | string(16)      | 是   | `随机串`, 加密使用的随机串                                                    |
|                 |                 |      | fdasflkja484w                                                                 |

## 通知签名

加密不能保证通知请求来自微信. 微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature.

商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方. 签名验证的算法请参考[《微信支付 API v3 签名方案》](https://wechatpay-api.gitbook.io/wechatpay-api-v3/ren-zheng/qian-ming-he-zheng-shu#qing-qiu-qian-ming)

## 通知应答

支付通知 http 应答码为 200 或 204 才会当作正常接收, 当回调处理异常时, 应答的 HTTP 状态码应为 500, 或者 4xx.

**注意**: 当商户后台应答失败时, 微信支付将记录下应答的报文, 建议商户按照以下格式返回.

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
  "event_type": "TRANSACTION.SUCCESS",
  "resource": {
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
  "combine_appid": "wxd678efh567hg6787",
  "combine_out_trade_no": "20150806125346",
  "combine_mchid": "1900000109",
  "scene_info": {
    "device_id": "POS1:1"
  },
  "sub_orders": [
    {
      "mchid": "1900000109",
      "trade_type": "JSAPI",
      "trade_state": "SUCCESS",
      "bank_type": "CMC",
      "attach": "深圳分店",
      "amount": {
        "total_amount": 10,
        "currency": "CNY",
        "payer_amount": 10,
        "payer_currency": "CNY"
      },
      "success_time": "2015-05-20T13:29:35.120+08:00",
      "transaction_id": "1009660380201506130728806387",
      "out_trade_no": "20150806125346",
      "sub_mchid": "1900000109"
    }
  ],
  "combine_payer_info": {
    "openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"
  }
}
```

## 支付成功通知参数

| 参数                                 | 类型       | 必填 | 参数名/描述/示例值                                       |
| ------------------------------------ | ---------- | ---- | -------------------------------------------------------- |
| combine_appid                        | string(32) | 是   | `合单商户 appid`, 合单发起方的 appid. (即电商平台 appid) |
|                                      |            |      | wxd678efh567hg6787                                       |
| combine_mchid                        | string(32) | 是   | `合单商户号`, 合单发起方商户号. (即电商平台 mchid)       |
|                                      |            |      | 1900000109                                               |
| combine_out_trade_no                 | string(32) | 是   | `合单商户订单号`[^combine_out_trade_no]                  |
|                                      |            |      | P20150806125346                                          |
| :arrow_right_hook:scene_info         | object     | 否   | `场景信息`,支付场景信息描述                              |
| :arrow_right_hook:sub_orders         | array      | 是   | `子单信息`,最多支持子单条数: 50                          |
| :arrow_right_hook:combine_payer_info | object     | 否   | `支付者`, 见请求示例                                     |

[^combine_out_trade_no]: 合单支付总订单号, 要求 32 个字符内, 只能是数字、大小写字母\_-|\*@, 且在同一个商户号下唯一.

场景信息(scene_info)

| 参数      | 类型       | 必填 | 参数名/描述/示例值                                                          |
| --------- | ---------- | ---- | --------------------------------------------------------------------------- |
| device_id | string(16) | 否   | `商户端设备号`,终端设备号(门店号或收银设备 ID)。特殊规则: 长度最小 7 个字节 |
|           |            |      | POS1:1                                                                      |

子单信息(sub_orders)

| 参数                     | 类型        | 必填 | 参数名/描述/示例值                                                                                                                                                               |
| ------------------------ | ----------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mchid                    | string(32)  | 是   | `子单商户号`, 子单发起方商户号，必须与发起方 Appid 有绑定关系。(即电商平台 mchid)                                                                                                |
|                          |             |      | 1900000109                                                                                                                                                                       |
| trade_type               | string (16) | 是   | `交易类型`, 枚举值: <br>NATIVE: 扫码支付,<br>JSAPI: 公众号支付,<br>APP: APP 支付,<br>MWEB: H5 支付                                                                               |
|                          |             |      | JSAPI                                                                                                                                                                            |
| trade_state              | string (32) | 是   | `交易状态`, 枚举值: <br>SUCCESS: 支付成功,<br>REFUND: 转入退款,<br>NOTPAY: 未支付,<br>CLOSED: 已关闭,<br>USERPAYING: 用户支付中,<br>PAYERROR: 支付失败(其他原因，如银行返回失败) |
|                          |             |      | SUCCESS                                                                                                                                                                          |
| bank_type                | string(16)  | 否   | `付款银行`, 银行类型，采用字符串类型的银行标识。                                                                                                                                 |
|                          |             |      | CMC                                                                                                                                                                              |
| attach                   | string(128) | 是   | `附加信息`, 附加数据，在查询 API 和支付通知中原样返回，可作为自定义参数使用。                                                                                                    |
|                          |             |      | 深圳分店                                                                                                                                                                         |
| success_time             | string(16)  | 是   | `支付完成时间`, 订单支付时间[^success_time]                                                                                                                                      |
|                          |             |      | 2015-05-20T13:29:35.120+08:00                                                                                                                                                    |
| transaction_id           | string(32)  | 是   | `微信订单号`, 微信支付订单号。                                                                                                                                                   |
|                          |             |      | 1009660380201506130728806387                                                                                                                                                     |
| out_trade_no             | string(32)  | 是   | `子单商户订单号`, 商户系统内部订单号[^out_trade_no]                                                                                                                              |
|                          |             |      | 20150806125346                                                                                                                                                                   |
| sub_mchid                | string(32)  | 是   | `二级商户号`, 二级商户商户号，由微信支付生成并下发。                                                                                                                             |
|                          |             |      | 1900000109                                                                                                                                                                       |
| :arrow_right_hook:amount | object      | 是   | `订单金额`, 订单金额信息                                                                                                                                                         |

[^success_time]: 遵循 rfc3339 标准格式，格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE，YYYY-MM-DD 表示年月日，T 出现在字符串中，表示 time 元素的开头，HH:mm:ss:sss 表示时分秒毫秒，TIMEZONE 表示时区(+08:00 表示东八区时间，领先 UTC 8 小时，即北京时间)。例如: 2015-05-20T13:29:35.120+08:00 表示，北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
[^out_trade_no]: 要求 32 个字符内，只能是数字、大小写字母\_-|\*@ ，且在同一个商户号下唯一。特殊规则: 最小字符长度为 6

订单金额(amount)

| 参数           | 类型      | 必填 | 参数名/描述/示例值                                                            |
| -------------- | --------- | ---- | ----------------------------------------------------------------------------- |
| total_amount   | int64     | 是   | `标价金额`, 子单金额，单位为分。                                              |
|                |           |      | 100                                                                           |
| currency       | string(8) | 是   | `标价币种`, 符合 ISO 4217 标准的三位字母代码，人民币: CNY。                   |
|                |           |      | CNY                                                                           |
| payer_amount   | int64     | 是   | `现金支付金额`, 订单现金支付金额。                                            |
|                |           |      | 10                                                                            |
| payer_currency | string(8) | 是   | `现金支付币种`, 货币类型，符合 ISO 4217 标准的三位字母代码，默认人民币: CNY。 |
|                |           |      | CNY                                                                           |

支付者(combine_payer_info)

| 参数   | 类型        | 必填 | 参数名/描述/示例值                                                                  |
| ------ | ----------- | ---- | ----------------------------------------------------------------------------------- |
| openid | string(128) | 是   | `用户标识`, 使用合单 appid 获取的对应用户 openid。是用户在商户 appid 下的唯一标识。 |
|        |             |      | oUpF8uMuAJO_M2pxb1Q9zNjWeS6o                                                        |
