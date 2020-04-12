---
title: '查询二级商进件申请状态 API'
linkTitle: '查询申请状态'
date: '2019-09-09'
weight: 3
description: >
  电商平台通过查询申请状态 API 查询二级商户入驻申请结果。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 查询申请状态 API 可按以下两种不同方式查询:

  1. 通过申请单 ID 查询申请状态；
  2. 通过业务申编号查询申请状态

- 两种不同查询方式返回结果相同

## 1. 通过申请单 ID 查询申请状态

### 接口说明

**适用对象**: 电商平台\
**请求 URL**: https://api.mch.weixin.qq.com/v3/ecommerce/applyments/{applyment_id}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

### 请求参数

| 变量         | 类型   | 必填 | 参数名/描述/示例值                                             |
| ------------ | ------ | ---- | -------------------------------------------------------------- |
| applyment_id | uint64 | 是   | `微信支付申请单号` `path` 申请单的主键, 唯一定义此资源的标识。 |
|              |        |      | 2000002124775691                                               |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/ecommerce/applyments/2000002124775691

## 2. 通过业务申请编号查询申请状态

### 接口说明

**适用对象**: 电商平台\
**请求 URL**: https://api.mch.weixin.qq.com/v3/ecommerce/applyments/out-request-no/{out_request_no}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

### 请求参数

| 变量           | 类型        | 必填 | 参数名/描述/示例值                                                                                                                     |
| -------------- | ----------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| out_request_no | string(124) | 是   | `业务申请编号` `path` <br>1. 服务商自定义的商户唯一编号。<br>2. 每个编号对应一个申请单, 每个申请单审核通过后会生成一个微信支付商户号。 |
|                |             |      | APPLYMENT_00000000001                                                                                                                  |

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/ecommerce/applyments/out-request-no/APPLYMENT_00000000001

## 返回参数

| 变量                 | 类型        | 必填 | 参数名/描述/示例值                                                                                                                                                           |
| -------------------- | ----------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applyment_state      | string(32)  | 否   | `申请状态` 枚举值:<br>CHECKING: 资料校验中<br>ACCOUNT_NEED_VERIFY: 待账户验证<br>AUDITING: 审核中<br>REJECTED: 已驳回<br>NEED_SIGN: 待签约<br>FINISH: 完成<br>FROZEN: 已冻结 |
|                      |             |      | FINISH                                                                                                                                                                       |
| applyment_state_desc | string(32)  | 否   | `申请状态描述` 申请状态描述                                                                                                                                                  |
|                      |             |      | “审核中”                                                                                                                                                                     |
| sign_url             | string(256) | 否   | `签约链接` <br>1. 当申请状态为 NEED_SIGN 时才返回。<br>2. 建议将链接转为二维码展示, 需让申请单-管理者用微信扫码打开, 完成签约。                                              |
|                      |             |      | https://pay.weixin.qq.com/public/apply4ec_sign/s?applymentId=2000002126198476&sign=b207b673049a32c858f3aabd7d27c7ec                                                          |
| sub_mchid            | string(32)  | 否   | `电商平台二级商户号` 当申请状态为 NEED_SIGN 或 FINISH 时才返回。                                                                                                             |
|                      |             |      | 1542488631                                                                                                                                                                   |
| account_validation   | object      | 否   | `+汇款账户验证信息` 当申请状态为 ACCOUNT_NEED_VERIFY 时有返回, 可根据指引汇款, 完成账户验证。                                                                                |
| audit_detail         | array       | 否   | `+驳回原因详情` 各项资料的审核情况。当申请状态为 REJECTED 或 FROZEN 时才返回。                                                                                               |
| legal_validation_url | string(256) | 否   | `法人验证链接` <br>1. 当申请状态为 ACCOUNT_NEED_VERIFY, 且通过系统校验的申请单, 将返回链接。<br>2. 建议将链接转为二维码展示, 让商户法人用微信扫码打开, 完成账户验证。        |
|                      |             |      | https://pay.weixin.qq.com/public/apply4ec_sign/s?applymentId=2000002126198476&sign=b207b673049a32c858f3aabd7d27c7ec                                                          |
| out_request_no       | string(124) | 是   | `业务申请编号` 提交接口填写的业务申请编号。                                                                                                                                  |
|                      |             |      | APPLYMENT_00000000001                                                                                                                                                        |
| applyment_id         | uint64      | 否   | `微信支付申请单号` 微信支付分配的申请单号。                                                                                                                                  |
|                      |             |      | 2000002124775691                                                                                                                                                             |

汇款账户验证信息

| 变量                       | 类型        | 必填 | 参数名/描述/示例值                                                             |
| -------------------------- | ----------- | ---- | ------------------------------------------------------------------------------ |
| account_name               | uint64      | 否   | `付款户名` 需商户使用该户名的账户进行汇款。                                    |
|                            |             |      | rDdICA3ZYXshYqeOSslSjSMf+MhhC4oaujiISFzq3AE+as7mAEDJly+DgRuVs74msmKUH8pl+3oA== |
| account_no                 | string(128) | 否   | `付款卡号` 结算账户为对私时会返回, 商户需使用该付款卡号进行汇款。              |
|                            |             |      | 9nZYDEvBT4rDdICA3ZYXshYqeOSslSjSauAE+as7mAEDJly+DgRuVs74msmKUH8pl+3oA==        |
| pay_amount                 | string(32)  | 否   | `汇款金额` 需要汇款的金额(单位: 分)。                                          |
|                            |             |      | 124                                                                            |
| destination_account_number | string(128) | 否   | `收款卡号` 收款账户的卡号                                                      |
|                            |             |      | 7222223333322332                                                               |
| destination_account_name   | string(128) | 否   | `收款户名` 收款账户名                                                          |
|                            |             |      | 财付通支付科技有限公司                                                         |
| destination_account_bank   | string(128) | 否   | `开户银行` 收款账户的开户银行名称。                                            |
|                            |             |      | 招商银行威盛大厦支行                                                           |
| city                       | string(128) | 否   | `省市信息` 收款账户的省市。                                                    |
|                            |             |      | 深圳                                                                           |
| remark                     | string(128) | 否   | `备注信息` 商户汇款时, 需要填写的备注信息。                                    |
|                            |             |      | 入驻账户验证                                                                   |
| deadline                   | string(20)  | 否   | `汇款截止时间` 请在此时间前完成汇款。                                          |
|                            |             |      | 2018-12-1017:09:01                                                             |

驳回原因详情

| 变量          | 类型       | 必填 | 参数名/描述/示例值                           |
| ------------- | ---------- | ---- | -------------------------------------------- |
| param_name    | string(32) | 否   | `参数名称` 提交申请单的资料项名称。          |
|               |            |      | id_card_copy                                 |
| reject_reason | string(32) | 否   | `驳回原因` 提交资料项被驳回原因。            |
|               |            |      | 身份证背面识别失败, 请上传更清晰的身份证图片 |

### 返回示例

正常示例

```json
{
  "applyment_state": "FINISH",
  "applyment_state_desc": "审核中",
  "sign_url": "https://pay.weixin.qq.com/public/apply4ec_sign/s?applymentId=2000002126198476&sign=b207b673049a32c858f3aabd7d27c7ec",
  "sub_mchid": "1542488631",
  "account_validation": {
    "account_name": "aOf7Gk2qT26kakkuTZpbFAn7Mb7xcar0LlQaYoi3+LnnWwgAsfaUUTg9+GmYJq6YCzRiluWHeHFq1lt8n3eIkF0laVvqmAU80xIWGZgWJnRmnRuZxsg0HJZfnUac2JfqyuL8OoyM2YSuYDqdsyvcOlgUQgq8MPCR6pmvhBCmIeJvnVSm8J+L+yx912itUmTDxhdBlu1CFBIUefME9nYB70vCVTNAVXgURkf65mjHMBiE9Y+wrPZVmTIIz3C3PtPVMZYDEvBT4rDdICA3ZYXshYqeOSslSjSMf+MhhC4oaujiISFzq3AE+as7mAEDJly+DgRuVs74msmKUH8pl+3oA==",
    "account_no": "aOf7Gk2qT26kakkuTZpbFAn7Mb7xcar0LlQaYoi3+LnnWwgAsfaUUTg9+GmYJq6YCz+RiluWHeHFq1lt8n3eIkF0laVvqmAU80xIWGZgWJnRmnRuZxsg0HJZfnUac2JfqyuL8OoyM2YSuYDqdsyvcOlgUQgq8MPCR6pmvhBCmIeJvnVSm8J+L+yx912itUmTDxhdBlu1CFBIUefME9nYB70vCVTNAVXgURkf65mjHMBiE9Y+wrPZVmTIIz3C3PtPVMZYDEvBT4rDdICA3ZYXshYqeOSslSjSMf+MhhC4oaujiISFzq3AE+as7mAEDJly+DgRuVs74msmKUH8pl+3oA==",
    "pay_amount": 124,
    "destination_account_number": "7222223333322332",
    "destination_account_name": "财付通支付科技有限公司",
    "destination_account_bank": "招商银行威盛大厦支行",
    "city": "深圳",
    "remark": "入驻账户验证",
    "deadline": "2018-12-10 17:09:01"
  },
  "audit_detail": [
    {
      "param_name": "id_card_copy",
      "reject_reason": "身份证背面识别失败, 请上传更清晰的身份证图片。"
    }
  ],
  "legal_validation_url": "https://pay.weixin.qq.com/public/apply4ec_sign/s?applymentId=2000002126198476&sign=b207b673049a32c858f3aabd7d27c7ec",
  "out_request_no": "APPLYMENT_00000000001",
  "applyment_id": 2000002124775691
}
```

## 错误码<sub>公共错误码</sub>

| 状态码 | 错误码                  | 描述                                   | 解决方案                                         |                               |
| ------ | ----------------------- | -------------------------------------- | ------------------------------------------------ | ----------------------------- |
| 500    | SYSTEMERROR             | 系统错误                               | 系统异常, 请使用相同参数稍后重新调用             |                               |
| 400    | PARAM_ERROR             | 参数错误                               | 请使用正确的参数重新调用                         |                               |
| 400    | RESOURCE_ALREADY_EXISTS | 存在流程进行中的申请单, 请检查是否重入 | 可通过查询申请状态查看此申请单的申请状态, 或更换 | out_request_no 提交新的申请单 |
| 403    | NO_AUTH                 | 商户权限异常                           | 请确认是否已经开通相关权限                       |                               |
| 429    | RATE_LIMITED            | 频率限制                               | 请降低调用频率                                   |                               |
| 404    | RESOURCE_NOT_EXISTS     | 申请单不存在                           | 确认入参, 传入正确的申请单编号                   |                               |
