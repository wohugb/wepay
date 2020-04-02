---
title: '合单关闭订单API'
linkTitle: '关闭订单'
weight: 4
type: 'docs'
---

合单支付订单只能使用此合单关单 api 完成关单。

## 接口说明

- **适用对象**: `电商平台` `服务商` `直连商户`
- **请求 URL**: https://api.mch.weixin.qq.com/v3/combine-transactions/out-trade-no/{combine_out_trade_no}/close
- **请求方式**: POST
- **接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 请求参数

- `path` 指该参数需在请求 URL 传参
- `query` 指该参数需在请求 JSON 传参

| 参数名         | 变量                 | 类型       | 必填 | 描述                                           | 示例值             |
| -------------- | -------------------- | ---------- | ---- | ---------------------------------------------- | ------------------ |
| 合单商户 appid | combine_appid        | string(32) | 是   | `query` 合单发起方的 appid。                   | wxd678efh567hg6787 |
| 合单商户订单号 | combine_out_trade_no | string(32) | 是   | `path` 合单支付总订单号[^combine_out_trade_no] | P20150806125346    |
| + 子单信息     | sub_orders           | array      | 是   | `query` 最多支持子单条数: 50                   |                    |

[^combine_out_trade_no]: ，要求 32 个字符内，只能是数字、大小写字母\_-|\*@ ，且在同一个商户号下唯一。

#### 请求示例

```json
{
"combine_appid ":"wxd678efh567hg6787",
"combine_out_trade_no":"P20150806125346",
 "sub_orders": [
   {
     "mchid": "1900000109",
     "out_trade_no": "20150806125346",
     "sub_mchid": "1230000109"
	 "description": "腾讯充值中心-QQ会员充值"
   }
 ]
}
```

## 返回参数

无数据（Http 状态码为 204）

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码                | 描述/解决方案                                                                     |
| ------ | --------------------- | --------------------------------------------------------------------------------- |
| 202    | USERPAYING            | 用户支付中，需要输入密码                                                          |
|        |                       | 等待 5 秒，然后调用被扫订单结果查询 API，查询当前订单的不同状态，决定下一步的操作 |
| 403    | TRADE_ERROR           | 交易错误                                                                          |
|        |                       | 因业务原因交易失败，请查看接口返回的详细信息                                      |
| 500    | SYSTEMERROR           | 系统错误                                                                          |
|        |                       | 系统异常，请用相同参数重新调用                                                    |
| 401    | SIGN_ERROR            | 签名错误                                                                          |
|        |                       | 请检查签名参数和方法是否都符合签名算法要求                                        |
| 403    | RULELIMIT             | 业务规则限制                                                                      |
|        |                       | 因业务规则限制请求频率，请查看接口返回的详细信息                                  |
| 400    | PARAM_ERROR           | 参数错误                                                                          |
|        |                       | 请根据接口返回的详细信息检查请求参数                                              |
| 403    | OUT_TRADE_NO_USED     | 商户订单号重复                                                                    |
|        |                       | 请核实商户订单号是否重复提交                                                      |
| 404    | ORDERNOTEXIST         | 订单不存在                                                                        |
|        |                       | 请检查订单是否发起过交易                                                          |
| 400    | ORDER_CLOSED          | 订单已关闭                                                                        |
|        |                       | 当前订单已关闭，请重新下单                                                        |
| 500    | OPENID_MISMATCH       | openid 和 appid 不匹配                                                            |
|        |                       | 请确认 openid 和 appid 是否匹配                                                   |
| 403    | NOTENOUGH             | 余额不足                                                                          |
|        |                       | 用户帐号余额不足，请用户充值或更换支付卡后再支付                                  |
| 403    | NOAUTH                | 商户无权限                                                                        |
|        |                       | 请商户前往申请此接口相关权限                                                      |
| 400    | MCH_NOT_EXISTS        | 商户号不存在                                                                      |
|        |                       | 请检查商户号是否正确                                                              |
| 500    | INVALID_TRANSACTIONID | 订单号非法                                                                        |
|        |                       | 请检查微信支付订单号是否正确                                                      |
| 400    | INVALID_REQUEST       | 无效请求                                                                          |
|        |                       | 请根据接口返回的详细信息检查                                                      |
| 429    | FREQUENCY_LIMITED     | 频率超限                                                                          |
|        |                       | 请降低请求接口频率                                                                |
| 500    | BANKERROR             | 银行系统异常                                                                      |
|        |                       | 银行系统异常，请用相同参数重新调用                                                |
| 400    | APPID_MCHID_NOT_MATCH | appid 和 mch_id 不匹配                                                            |
|        |                       | 请确认 appid 和 mch_id 是否匹配                                                   |
| 403    | ACCOUNTERROR          | 账号异常                                                                          |
|        |                       | 用户账号异常，无需更多操作                                                        |
