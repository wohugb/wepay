---
title: '电商平台提现状态查询API'
linkTitle: '平台提现查询'
date: '2020-04-07'
weight: 4
description: >
  电商平台通过该接口查询其提现结果
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 发起提现后如果微信支付正确返回了微信支付提现单号, 查询状态需要隔日早上 8 点后进行。
- 查询结果可能存在延迟, 提现发起后查询无单据并不代表没有发起提现, 应以隔日查询结果为准判断单据是否存在。
- 查询结果中状态为 INIT 时并不代表一定未受理成功, 需要等待 7 日后确定单据最终状态或者原单(所有请求参数保持不变）重入请求。
- 可查询 90 天内的提现数据, 时间以微信支付提现单创建时间为准。

{{% /alert %}}

## 接口说明

**适用对象**: 电商平台\
**请求 URL**: https://api.mch.weixin.qq.com/v3/merchant/fund/withdraw/out-request-no/{out_request_no}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量           | 类型        | 必填 | 参数名/描述/示例值                        |
| -------------- | ----------- | ---- | ----------------------------------------- |
| out_request_no | string(32） | 是   | _path_ `商户提现单号`, 由商户自定义生成。 |
|                |             |      | 20190611222222222200000000012122          |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/merchant/fund/withdraw/out-request-no/20190611222222222200000000012122

## 返回参数

| 变量           | 类型         | 必填 | 参数名/描述/示例值                                                                                                                                                                                |
| -------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status         | string       | 否   | `提现单状态` 枚举值:<br>CREATE_SUCCESS: 受理成功<br>SUCCESS: 提现成功<br>FAIL: 提现失败<br>REFUND: 提现退票<br>CLOSE: 关单<br>INIT: 业务单已创建(业务单处于刚创建状态, 需要重入驱动到受理成功。） |
|                |              |      | CREATE_SUCCESS                                                                                                                                                                                    |
| withdraw_id    | string(128） | 否   | `微信支付提现单号` 微信支付系统生成的提现单号。                                                                                                                                                   |
|                |              |      | 12321937198237912739132791732912793127931279317929791239112123                                                                                                                                    |
| out_request_no | string(32）  | 是   | `商户提现单号`, 由商户自定义生成。                                                                                                                                                                |
|                |              |      | 20190611222222222200000000012122                                                                                                                                                                  |
| amount         | int          | 否   | `提现金额`, 单位: 分(RMB）                                                                                                                                                                        |
|                |              |      | 1                                                                                                                                                                                                 |
| create_time    | string(32）  | 否   | `发起提现时间` 时间日期遵循 rfc3339 所定义的格式, 入参不限制时区, 出参统一使用北京时间(+08:00）。                                                                                                 |
|                |              |      | 2015-05-20T13:29:35.120+08:00                                                                                                                                                                     |
| update_time    | string(32）  | 否   | `提现状态更新时间` 时间日期遵循 rfc3339 所定义的格式, 入参不限制时区, 出参统一使用北京时间(+08:00）。                                                                                             |
|                |              |      | 2015-05-20T13:29:35.120+08:00                                                                                                                                                                     |
| reason         | string(255） | 否   | `失败原因`                                                                                                                                                                                        |
|                |              |      | 卡号错误                                                                                                                                                                                          |
| remark         | string(255） | 否   | `备注` 商户对提现单的备注。                                                                                                                                                                       |
|                |              |      | 交易体现                                                                                                                                                                                          |
| bank_memo      | string(32）  | 否   | `银行附言` 展示在收款银行系统中的附言, 由数字、字母、汉字组成(能否成功展示依赖银行系统支持）。                                                                                                    |
|                |              |      | xx 平台提现                                                                                                                                                                                       |
| account_type   | string       | 否   | `账户类型` 枚举值:<br>BASIC: 基本账户<br>OPERATION: 运营账户<br>FEES: 手续费账户                                                                                                                  |
|                |              |      | BASIC                                                                                                                                                                                             |
| solution       | string(255） | 否   | `解决方案` 出错解决方案指引。                                                                                                                                                                     |
|                |              |      | 请修改结算银行卡信息                                                                                                                                                                              |

### 返回示例

正常示例

```json
{
  "status": "CREATE_SUCCESS",
  "withdraw_id": "12321937198237912739132791732912793127931279317929791239112123",
  "out_request_no": "20190611222222222200000000012122",
  "amount": 1,
  "create_time": "2015-05-20T13:29:35.120+08:00",
  "update_time": "2015-05-20T13:29:35.120+08:00",
  "reason": "卡号错误",
  "remark": "交易提现",
  "bank_memo": "xx 平台提现",
  "account_type": "BASIC",
  "solution": "请修改结算银行卡信息"
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码           | 描述                           | 解决方案                   |
| ------ | ---------------- | ------------------------------ | -------------------------- |
| 403    | NO_AUTH          | 当前商户号没有使用该接口的权限 | 请确认是否已经开通相关权限 |
| 400    | PARAM_ERROR      | 参数错误                       | 请使用正确的参数重新调用   |
| 404    | ORDER_NOT_EXISTS | 该提现单号不存在               | 请检查订单号是否正确       |