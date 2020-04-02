---
title: '合单下单-JS支付API'
linkTitle: 'JS支付'
weight: 2
type: 'docs'
---

使用合单支付接口，用户只输入一次密码，即可完成多个订单的支付。

目前最多一次可支持 **50** 笔订单进行合单支付。

{{% alert title="注意" color="warning" %}}

- 订单如果需要进行抽佣等，需要在合单中指定需要进行分账（profit_sharing 为 true）；指定后，交易资金进入二级商户账户，处于冻结状态，可在后续使用分账接口进行分账，利用分账完结进行资金解冻，实现抽佣和对二级商户的账期。
- 合单中同一个二级商户只允许有一笔子订单。

{{% /alert %}}

## 接口说明

- **适用对象:** `电商平台` `服务商` `直连商户`
- **请求 URL:** https://api.mch.weixin.qq.com/v3/combine-transactions/jsapi
- **请求方式:** POST
- **接口规则:** https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 请求参数

- `path` 指该参数需在请求 URL 传参
- `query` 指该参数需在请求 JSON 传参

| 参数名                     | 变量                 | 类型        | 必填 | 描述                                    | 示例值                     |
| -------------------------- | -------------------- | ----------- | ---- | --------------------------------------- | -------------------------- |
| 合单商户 appid             | combine_appid        | string(32)  | 是   | 合单发起方的 appid。                    | wxd678efh567hg6787         |
| 合单商户号                 | combine_mchid        | string(32)  | 是   | 合单发起方商户号。                      | 1900000109                 |
| 合单商户订单号             | combine_out_trade_no | string(32)  | 是   | 合单支付总订单号[^combine_out_trade_no] | P20150806125346            |
| :arrow_right_hook:场景信息 | scene_info           | object      | 否   | 支付场景信息描述                        |                            |
| :arrow_right_hook:子单信息 | sub_orders           | array       | 是   | 最多支持子单条数：50                    |                            |
| :arrow_right_hook:支付者   | combine_payer_info   | object      | 是   | 支付者信息                              |                            |
| 交易起始时间               | time_start           | string(14)  | 否   | 订单生成时间[^rfc3339]                  | 2019-12-31T15:59:60+08:00  |
| 交易结束时间               | time_expire          | string(14)  | 否   | 订单失效时间[^rfc3339]                  |                            |
| 通知地址                   | notify_url           | string(256) | 是   | 步通知回调地址[^notify_url]             | https://yourapp.com/notify |
| 指定支付方式               | limit_pay            | string(32)  | 否   | 指定支付方式                            | no_debit                   |

[^combine_out_trade_no]: 要求 32 个字符内，只能是数字、大小写字母及`_-|\*@` ，且在同一个商户号下唯一。
[^rfc3339]: 遵循 rfc3339 标准格式，格式为 YYYY-MM-DDTHH:mm:ss+TIMEZONE，YYYY-MM-DD 表示年月日，T 出现在字符串中，表示 time 元素的开头，HH:mm:ss 表示时分秒，TIMEZONE 表示时区（+08:00 表示东八区时间，领先 UTC 8 小时，即北京时间）。例如：2015-05-20T13:29:35+08:00 表示，北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
[^notify_url]: 接收微信支付异步通知回调地址，必须为直接可访问的 URL，不能携带参数。

#### 请求示例

```json
{
  "combine_out_trade_no": "1217752501201407033233368018",
  "combine_mchid": "1230000109",
  "scene_info": {
    "device_id": "POS1:1",
    "payer_client_ip": "14.17.22.32"
  },
  "sub_orders": [
    {
      "mchid": "1230000109",
      "attach": "深圳分店",
      "amount": {
        "total_amount": 10,
        "currency": "CNY"
      },
      "out_trade_no": "20150806125346",
      "sub_mchid": "1900000109",
      "detail": "",
      "profit_sharing": null,
      "description": "腾讯充值中心-QQ 会员充值"
    }
  ],
  "combine_payer_info": {
    "openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"
  },
  "time_start": "2018-06-08T10:34:56+08:00",
  "time_expire": "2018-06-08T10:34:56+08:00",
  "notify_url": "https://yourapp.com/notify",
  "limit_pay": ["no_debit"]
}
```

## 返回参数

| 参数名             | 变量      | 类型       | 必填 | 描述                   | 示例值                               |
| ------------------ | --------- | ---------- | ---- | ---------------------- | ------------------------------------ |
| 预支付交易会话标识 | prepay_id | string(64) | 是   | 数字和字母[^prepay_id] | wx201410272009395522657a690389285100 |

[^prepay_id]: 微信生成的预支付会话标识，用于后续接口调用使用。

#### 返回示例

正常示例

```json
{
  "prepay_id": "wx201410272009395522657a690389285100"
}
```

## 错误码 <sub>公共错误码</sub>

| 状态码   | 错误码                | 描述                                                                              |
| -------- | --------------------- | --------------------------------------------------------------------------------- |
| 202      | USERPAYING            | 用户支付中，需要输入密码                                                          |
| 解决方案 |                       | 等待 5 秒，然后调用被扫订单结果查询 API，查询当前订单的不同状态，决定下一步的操作 |
| 403      | TRADE_ERROR           | 交易错误                                                                          |
|          |                       | 因业务原因交易失败，请查看接口返回的详细信息                                      |
| 500      | SYSTEMERROR           | 系统错误                                                                          |
|          |                       | 系统异常，请用相同参数重新调用                                                    |
| 401      | SIGN_ERROR            | 签名错误                                                                          |
|          |                       | 请检查签名参数和方法是否都符合签名算法要求                                        |
| 403      | RULELIMIT             | 业务规则限制                                                                      |
|          |                       | 因业务规则限制请求频率，请查看接口返回的详细信息                                  |
| 400      | PARAM_ERROR           | 参数错误                                                                          |
|          |                       | 请根据接口返回的详细信息检查请求参数                                              |
| 403      | OUT_TRADE_NO_USED     | 商户订单号重复                                                                    |
|          |                       | 请核实商户订单号是否重复提交                                                      |
| 404      | ORDERNOTEXIST         | 订单不存在                                                                        |
|          |                       | 请检查订单是否发起过交易                                                          |
| 400      | ORDER_CLOSED          | 订单已关闭                                                                        |
|          |                       | 当前订单已关闭，请重新下单                                                        |
| 500      | OPENID_MISMATCH       | openid 和 appid 不匹配                                                            |
|          |                       | 请确认 openid 和 appid 是否匹配                                                   |
| 403      | NOTENOUGH             | 余额不足                                                                          |
|          |                       | 用户帐号余额不足，请用户充值或更换支付卡后再支付                                  |
| 403      | NOAUTH                | 商户无权限                                                                        |
|          |                       | 请商户前往申请此接口相关权限                                                      |
| 400      | MCH_NOT_EXISTS        | 商户号不存在                                                                      |
|          |                       | 请检查商户号是否正确                                                              |
| 500      | INVALID_TRANSACTIONID | 订单号非法                                                                        |
|          |                       | 请检查微信支付订单号是否正确                                                      |
| 400      | INVALID_REQUEST       | 无效请求                                                                          |
|          |                       | 请根据接口返回的详细信息检查                                                      |
| 429      | FREQUENCY_LIMITED     | 频率超限                                                                          |
|          |                       | 请降低请求接口频率                                                                |
| 500      | BANKERROR             | 银行系统异常                                                                      |
|          |                       | 银行系统异常，请用相同参数重新调用                                                |
| 400      | APPID_MCHID_NOT_MATCH | appid 和 mch_id 不匹配                                                            |
|          |                       | 请确认 appid 和 mch_id 是否匹配                                                   |
| 403      | ACCOUNTERROR          | 账号异常                                                                          |
|          |                       | 用户账号异常，无需更多操作                                                        |
