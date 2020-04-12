---
title: '提交申请单 API'
linkTitle: '提交申请单'
date: '2020-04-07'
weight: 3
description: >
  服务商可以通过该接口向微信支付提交商户的联系人信息、主体信息以及联系人信息。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 商户上送敏感信息时使用微信支付平台公钥加密, 证书序列号包含在请求 HTTP 头部的 Wechatpay-Serial, 详见接口规则。

## 接口说明

**适用对象**: 从业机构 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/apply4subject/applyment\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

渠道商户号 channel_id string(9) 否
query 1、微信支付分配的渠道商唯一标识。
2、当从业机构调用时, 该字段必填, 需要填写从业机构下的渠道商商户号(渠道号)。
3、当渠道商调用时, 该字段无需填写, 此时只需要在 HTTP Authorization 里面把 mchid 设置为渠道号即可。
特殊规则: 长度最小 8 个字节。
|||20001111

业务申请编号 business_code string(128) 是 query 服务商自定义的唯一编号, 每个编号对应一个申请单。
|||1111111111 +联系人信息 contact_info object 是 query 联系人信息, 联系人是商户的超级管理员, 将接收开户信息及日常重要管理信息, 请确定超级管理员为商户法定代表人或负责人再进行操作。如超级管理员非商户法定代表人或负责人, 请联系法定代表人或负责人提交申请。 +主体信息 subject_info object 是 query 主体信息 +法人身份信息 identification_info object 是 query 法人身份信息

### 请求示例

```json
{
  "business_code": "1111111111",
  "contact_info": {
    "name": "张三",
    "mobile": "13312345678",
    "id_card_number": "430422199001236704"
  },
  "subject_info": {
    "subject_type": "SUBJECT_TYPE_ENTERPRISE",
    "business_licence_info": {
      "licence_number": "914201123033363296",
      "licence_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
      "merchant_name": "李四网络有限公司",
      "legal_person": "李四",
      "company_address": "广东省深圳市南山区 xx 路 xx 号",
      "licence_valid_date": "[\"1970-01-01\",\"forever\"]"
    },
    "certificate_info": {
      "cert_type": "CERTIFICATE_TYPE_2388",
      "cert_number": "111111111111",
      "cert_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
      "merchant_name": "xx 公益团体",
      "legal_person": "李四",
      "company_address": "广东省深圳市南山区 xx 路 xx 号",
      "cert_valid_date": "[\"1970-01-01\",\"forever\"]"
    },
    "company_prove_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
    "assist_prove_info": {
      "micro_biz_type": "MICRO_TYPE_STORE",
      "store_name": "大郎烧饼",
      "store_address_code": "440305",
      "store_address": "广东省深圳市南山区 xx 大厦 x 层 xxxx 室",
      "store_header_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
      "store_indoor_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
    }
  },
  "identification_info": {
    "identification_type": "IDENTIFICATION_TYPE_IDCARD",
    "identification_name": "李四",
    "identification_number": "430422199001236705",
    "identification_valid_date": "[\"1970-01-01\",\"forever\"]",
    "identification_front_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
    "identification_back_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
  }
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

申请单编号 applyment_id uint64 是 微信支付分配的申请单号。
|||20000000011111

### 返回示例

```json
{
  "applyment_id": 20000000011111
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEMERROR 系统错误 系统异常, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 请使用正确的参数重新调用
400 INVALID_REQUEST 无效请求 请查看返回的错误信息, 根据错误信息进行操作
403 NOAUTH 商户权限异常 请确认是否已经开通相关权限
