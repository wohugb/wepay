---
title: '小程序调起支付API'
linkTitle: '小程序支付'
weight: 4
description: >
  通过使用微信支付提供的SDK调起小程序支付。
type: 'docs'
---

通过合单下单接口获取到发起支付的必要参数 prepay_id,可以按照接口定义中的规则,使用微信支付提供的 SDK 调起小程序支付。

## 接口说明

- **适用对象**: `电商平台` `服务商` `直连商户`
- **接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

## 接口定义

此 API 无后台接口交互,需要将列表中的数据签名

客户端请求字段（**注意: 以下字段名字母大小写敏感**）:

| 参数      | 类型        | 必填 | 参数名/描述/示例值                                                                     |
| --------- | ----------- | ---- | -------------------------------------------------------------------------------------- |
| appId     | string(16)  | 是   | `小程序 id`, 请填写 merchant_appid 对应的值。                                          |
|           |             |      | wx8888888888888888                                                                     |
| timeStamp | string(32)  | 是   | `时间戳`, 当前的时间,其他详见时间戳规则。                                              |
|           |             |      | 1414561699                                                                             |
| nonceStr  | string(32)  | 是   | `随机字符串`, 不长于 32 位。推荐随机数生成算法。                                       |
|           |             |      | 5K8264ILTKCH16CQ2502SI8ZNMTM67VS                                                       |
| package   | string(128) | 是   | `订单详情扩展字符串`, 统一下单接口返回的 prepay_id 参数值,提交格式如: prepay_id=\*\*\* |
|           |             |      | prepay_id=wx201410272009395522657a690389285100                                         |
| signType  | string(32)  | 是   | `签名方式`,签名类型,默认为 RSA,仅支持 RSA。                                            |
|           |             |      | RSA                                                                                    |
| paySign   | tring(256)  | 是   | `签名`,使用字段 appId、timeStamp、nonceStr、package 按照签名生成算法计算得出的签名值   |
|           |             |      | oR9d8PuhnIc...[^demo-paysign]                                                          |

[^demo-paysign]: oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==

#### 小程序调起支付的参数需要按照签名规则进行签名计算:

1. 构造签名串

   ```
   签名串一共有四行,每一行为一个参数。行尾以\n（换行符,ASCII 编码值为 0x0A）结束,包括最后一行。
   如果参数本身以\n 结束,也需要附加一个\n
   ```

   参与签名字段及格式:

   ```
   小程序 id
   时间戳
   随机字符串
   订单详情扩展字符串
   ```

   数据举例:

   ```
    wx8888888888888888
    1414561699
    5K8264ILTKCH16CQ2502SI8ZNMTM67VS
    prepay_id=wx201410272009395522657a690389285100
   ```

2. 计算签名值

   计算签名值可参考: 签名生成

   signType 参数不参与签名,但需要传递,默认值为“RSA”,生成的签名需要通过字段 paySign 传递。

#### 调用 wx.requestPayment(OBJECT)发起微信支付

Object 参数说明:

| 参数      | 类型        | 必填 | 参数名/描述/示例值                                                                    |
| --------- | ----------- | ---- | ------------------------------------------------------------------------------------- |
| timeStamp | string(32)  | 是   | `时间戳`,当前的时间,其他详见时间戳规则。                                              |
|           |             |      | 1414561699                                                                            |
| nonceStr  | string(32)  | 是   | `随机字符串`,不长于 32 位。推荐随机数生成算法。                                       |
|           |             |      | 5K8264ILTKCH16CQ2502SI8ZNMTM67VS                                                      |
| package   | string(128) | 是   | `订单详情扩展字符串`,统一下单接口返回的 prepay_id 参数值,提交格式如: prepay_id=\*\*\* |
|           |             |      | prepay_id=wx201410272009395522657a690389285100                                        |
| signType  | string(32)  | 是   | `签名方式`,签名类型,默认为 RSA,仅支持 RSA。                                           |
|           |             |      | RSA                                                                                   |
| paySign   | string(64)  | 是   | `签名`,使用字段 appId、timeStamp、nonceStr、package 按照签名生成算法计算得出的签名值  |
|           |             |      | oR9d8PuhnIc+...[^demo-paysign]                                                        |

## 回调结果

| 回调类型 | errMsg                               | 类型                                                      |
| -------- | ------------------------------------ | --------------------------------------------------------- |
| success  | requestPayment:ok                    | 调用支付成功                                              |
| fail     | requestPayment:fail cancel           | 用户取消支付                                              |
| fail     | requestPayment:fail (detail message) | 调用支付失败,其中 detail message 为后台返回的详细失败原因 |

## 请求示例

```js
wx.requestPayment({
  timeStamp: '1414561699',
  nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
  package: 'prepay_id=wx201410272009395522657a690389285100',
  signType: 'RSA',
  paySign:
    'oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq/xDg==',
});
```
