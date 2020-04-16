---
title: '分账动账通知API'
linkTitle: '分账动账通知'
date: '2020-03-23'
weight: 9
description: >
  1.此功能仅针对分账接收方。<br>2.分账动账金额变动后, 微信会把相关变动结果发送给需要实时关注的分账接收方。
type: 'docs'
---

{{% alert title="注意:" color="warning"%}}

对后台通知交互时, 如果微信收到应答不是成功或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功

- 同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。 推荐的做法是, 当商户系统收到通知进行处理时, 先检查对应业务数据的状态, 并判断该通知是否已经处理。如果未处理, 则再进行处理；如果已处理, 则直接返回结果成功。在对业务数据进行状态检查和处理之前, 要采用数据锁进行并发控制, 以避免函数重入造成的数据混乱。
- 如果在所有通知频率(4 小时)后没有收到微信侧回调, 商户应调用查询订单接口确认订单状态。

{{% /alert %}}

{{% alert title="特别提醒: " color="primary"%}}

商户系统对于开启结果通知的内容一定要做签名验证, 并校验通知的信息是否与商户侧的信息一致, 防止数据泄漏导致出现“假通知”, 造成资金损失。

{{% /alert %}}

## 接口说明

**适用对象**: `直联商户电商服务商` `服务商`\
**请求 URL**: 该链接是通过[商户配置]提交 service_notify_url 设置, 必须为 https 协议。如果链接无法访问, 商户将无法接收到微信通知。 通知 url 必须为直接可访问的 url, 不能携带参数。示例: “https://pay.weixin.qq.com/wxpay/pay.action”\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 通知规则

用户支付完成后, 微信会把相关支付结果和用户信息发送给清算机构, 清算机构需要接收处理后返回应答成功, 然后继续给异步通知到下游从业机构。

对后台通知交互时, 如果微信收到应答不是成功或超时, 微信认为通知失败, 微信会通过一定的策略定期重新发起通知, 尽可能提高通知的成功率, 但微信不保证通知最终能成功。(通知频率为 15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h - 总计 24h4m）

## 通知报文

支付结果通知是以 POST 方法访问商户设置的通知 url, 通知的数据以 JSON 格式通过请求主体(BODY）传输。通知的数据包括了加密的支付结果详情。

下面详细描述对通知数据进行解密的流程:

1. 用商户平台上设置的 APIv3 密钥【微信商户平台—>账户设置—>API 安全—>设置 APIv3 密钥】, 记为 key。
2. 针对 resource.algorithm 中描述的算法(目前为 AEAD_AES_256_GCM）, 取得对应的参数 nonce 和 associated_data。
3. 使用 key、nonce 和 associated_data, 对数据密文 resource.ciphertext 进行解密, 得到 JSON 形式的资源对象。

{{% alert title="注: " color="info"%}}

AEAD_AES_256_GCM 算法的接口细节, 请参考 rfc5116。微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated_data 长度小于 16 个字节并可能为空。

{{% /alert %}}

## 通知参数

| 变量          | 类型       | 必填 | 参数名/描述/示例值                                                                                                                                                                                                                                                                                                                             |
| ------------- | ---------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | string(32) | 是   | `通知 ID` 通知的唯一 ID                                                                                                                                                                                                                                                                                                                        |
|               |            |      | EV-2018022511223320873                                                                                                                                                                                                                                                                                                                         |
| create_time   | string(16) | 是   | `通知创建时间` 通知创建的时间, 遵循 rfc3339 标准格式<br>格式为 YYYY-MM-DDTHH:mm:ss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss 表示时分秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。 |
|               |            |      | 2018-06-08T10:34:56+08:00                                                                                                                                                                                                                                                                                                                      |
| event_type    | string(32) | 是   | `通知类型` 通知的类型:<br>PROFITSHARING: 分账<br>PROFITSHARING_RETURN: 分账回退<br>                                                                                                                                                                                                                                                            |
|               |            |      | PROFITSHARING<br>                                                                                                                                                                                                                                                                                                                              |
| summary       | string(16) | 是   | `通知简要说明`                                                                                                                                                                                                                                                                                                                                 |
|               |            |      | 分账                                                                                                                                                                                                                                                                                                                                           |
| resource_type | string(32) | 是   | `通知数据类型` 通知的资源数据类型, 支付成功通知为 encrypt-resource                                                                                                                                                                                                                                                                             |
|               |            |      | encrypt-resource                                                                                                                                                                                                                                                                                                                               |
| resource      | object     | 是   | `+通知数据` 通知资源数据<br>json 格式, 见示例                                                                                                                                                                                                                                                                                                  |

## 通知签名

加密不能保证通知请求来自微信。微信会对发送给商户的通知进行签名, 并将签名值放在通知的 HTTP 头 Wechatpay-Signature。商户应当验证签名, 以确认请求来自微信, 而不是其他的第三方。签名验证的算法请参考《微信支付 API v3 签名方案》

## 通知应答

分账动账通知 http 应答码为 200 且返回状态码为 SUCCESS 才会当做商户接收成功, 否则会重试。

{{% alert title="注意:" color="warning"%}}

重试过多会导致微信支付端积压过多通知而堵塞, 影响其他正常通知。

{{% /alert %}}

| 变量    | 类型        | 必填 | 参数名/描述/示例值                                          |
| ------- | ----------- | ---- | ----------------------------------------------------------- |
| code    | string(32)  | 是   | `返回状态码` 错误码, SUCCESS 为接收成功, 其他错误码为失败。 |
|         |             |      | SUCCESS                                                     |
| message | string(256) | 否   | `返回信息` , 如非空, 为错误原因。                           |
|         |             |      | 系统错误                                                    |

```json
{
  "code": "ERROR_NAME",
  "message": "ERROR_DESCRIPTION"
}
```

## 回调示例

### 动账通知

```json
{
  "id": "EV-2018022511223320873",
  "create_time": "2018-06-08T10:34:56+08:00",
  "resource_type": "encrypt-resource",
  "event_type": "PROFITSHARING",
  "summary": "分账",
  "resource": {
    "algorithm": "AEAD_AES_256_GCM",
    "original_type": "profitsharing",
    "ciphertext": "...",
    "nonce": "...",
    "associated_data": ""
  }
}
```

商户对 resource 对象进行解密后, 得到的资源对象示例

```json
{
  "mchid": "1900000100",
  "sp_mchid": "1900000100",
  "sub_mchid": "1900000100",
  "transaction_id": "4200000000000000000000000000",
  "order_id": "1217752501201407033233368018",
  "out_order_no": "P20150806125346",
  "receivers": [
    {
      "type": "MERCHANT_ID",
      "account": "1900000100",
      "amount": "888",
      "description": "运费/交易分账/及时奖励"
    }
  ],
  "success_time": "2018-06-08T10:34:56+08:00"
}
```

## 通知参数

| 变量           | 类型       | 必填 | 参数名/描述/示例值                                                                                                                                                                                                                                                                                                      |
| -------------- | ---------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mchid          | string(32) | 否   | `直连商户号` 直连模式分账发起和出资商户。                                                                                                                                                                                                                                                                               |
|                |            |      | 1900000100                                                                                                                                                                                                                                                                                                              |
| sp_mchid       | string(32) | 否   | `服务商商户号` 服务商模式分账发起商户。                                                                                                                                                                                                                                                                                 |
|                |            |      | 1900000100                                                                                                                                                                                                                                                                                                              |
| sub_mchid      | string(32) | 否   | `子商户号` 服务商模式分账出资商户。                                                                                                                                                                                                                                                                                     |
|                |            |      | 1900000100                                                                                                                                                                                                                                                                                                              |
| transaction_id | string(32) | 是   | `微信订单号` 微信支付订单号。                                                                                                                                                                                                                                                                                           |
|                |            |      | 4200000000000000000000000000                                                                                                                                                                                                                                                                                            |
| order_id       | string(64) | 是   | `微信分账/回退单号`。                                                                                                                                                                                                                                                                                                   |
|                |            |      | 1217752501201407033233368018                                                                                                                                                                                                                                                                                            |
| out_order_no   | string(64) | 是   | `商户分账/回退单号` 分账方系统内部的分账/回退单号。                                                                                                                                                                                                                                                                     |
|                |            |      | P20150806125346                                                                                                                                                                                                                                                                                                         |
| receivers      | array      | 是   | `+分账接收方列表` 分账接收方对象                                                                                                                                                                                                                                                                                        |
| success_time   | string(32) | 是   | `成功时间`, 遵循 rfc3339 标准<br>格式为 YYYY-MM-DDTHH:mm:ss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss 表示时分秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。 |
|                |            |      | 2018-06-08T10:34:56+08:00                                                                                                                                                                                                                                                                                               |