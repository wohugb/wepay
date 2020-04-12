---
title: '提交申请单API'
linkTitle: '提交申请单'
date: '2019-03-05'
weight: 4
description: >
  普通服务商(银行、支付机构、电商平台不可用）使用该接口提交商家资料, 帮助商家入驻成为微信支付的特约商户。
type: 'docs'
---

{{% alert title="注意" color="warning" %}}

商户上送敏感信息时使用微信支付平台公钥加密, 证书序列号包含在请求 HTTP 头部的 `Wechatpay-Serial`, 详见[接口规则](https://wechatpay-api.gitbook.io/wechatpay-api-v3/qian-ming-zhi-nan-1/min-gan-xin-xi-jia-mi)。

{{% /alert %}}

## 接口说明

**适用对象**: `普通服务商` \
**请求 URL**: https://api.mch.weixin.qq.com/v3/applyment4sub/applyment/\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

| 变量              | 类型        | 必填 | 参数名/描述/示例值                                                                                                                                                                                               |
| ----------------- | ----------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| business_code     | string(124) | 是   | `业务申请编号` `query`<br> 1. 服务商自定义的唯一编号。<br>2. 每个编号对应一个申请单, 每个申请单审核通过后会生成一个微信支付商户号。<br>3. 若申请单被驳回, 可填写相同的“业务申请编号”, 即可覆盖修改原申请单信息。 |
|                   |             |      | APPLYMENT_00000000001                                                                                                                                                                                            |
| contact_info      | object      | 是   | `+超级管理员信息` `query` 超级管理员需在开户后进行签约, 并接收日常重要管理信息和进行资金操作, 请确定其为商户法定代表人或负责人。                                                                                 |
| subject_info      | object      | 是   | `+主体资料` `query` 请填写商家的营业执照/登记证书、经营者/法人的证件等信息。                                                                                                                                     |
| business_info     | object      | 是   | `+经营资料` `query` 请填写商家的经营业务信息、售卖商品/提供服务场景信息。                                                                                                                                        |
| settlement_info   | object      | 是   | `+结算规则` `query` 请填写商家的结算费率规则、特殊资质等信息。                                                                                                                                                   |
| bank_account_info | object      | 选   | `+结算银行账户` `query`<br>1. 请填写商家提现收款的银行账户信息。<br>2. 若结算规则 id 为“719、721、716、717、730、739、727、738、726”, 可选填结算账户。                                                           |
| addition_info     | object      | 否   | `+补充材料` `query` 根据实际审核情况, 额外要求商家提供指定的补充资料。                                                                                                                                           |

### 请求示例

```json
{
  "business_code": "1900013511_10000",
  "contact_info": {
    "contact_name": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9Gmsu
	gMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty
	7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
    "contact_id_number": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu
	9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5A
	Pomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
    "openid": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r
	3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYN
	xLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg== 字段加密: 使用APIv3定义的方式加密",
    "mobile_phone": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9Gms
	ugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APo
	mty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
    "contact_email": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9G
	msugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5
	APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg=="
  },
  "subject_info": {
    "subject_type": "SUBJECT_TYPE_ENTERPRISE",
    "business_license_info": {
      "license_copy": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
      "license_number": "123456789012345678",
      "merchant_name": "腾讯科技有限公司",
      "legal_person": "张三"
    },
    "certificate_info": {
      "cert_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
      "cert_type": "CERTIFICATE_TYPE_2388",
      "cert_number": "111111111111",
      "merchant_name": "xx公益团体",
      "company_address": "广东省深圳市南山区xx路xx号",
      "legal_person": "李四",
      "period_begin": "2019-08-01",
      "period_end": "2019-08-01"
    },
    "organization_info": {
      "organization_copy": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
      "organization_code": "123456789-A",
      "org_period_begin": "2019-08-01",
      "org_period_end": "2019-08-01长期"
    },
    "certificate_letter_copy": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
    "micro_biz_info": {
      "micro_biz_type": "MICRO_TYPE_STORE",
      "micro_store_info": {
        "micro_name": "大郎烧饼",
        "micro_address_code": "440305",
        "micro_address": "南山区xx大厦x层xxxx室",
        "store_entrance_pic": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
        "micro_indoor_copy": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo",
        "store_longitude": "113.941355",
        "store_latitude": "22.546245",
        "address_certification": "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
      },
      "micro_mobile_info": {
        "micro_mobile_name": "早餐车",
        "micro_mobile_city": "440305",
        "micro_mobile_address": "无",
        "micro_mobile_pics": [
          "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
        ]
      },
      "micro_online_info": {
        "micro_online_store": "李三服装店",
        "micro_ec_name": "XX购物平台",
        "micro_qrcode": "https://www.qq.com",
        "micro_link": "https://www.qq.com"
      }
    },
    "identity_info": {
      "id_doc_type": "IDENTIFICATION_TYPE_IDCARD",
      "id_card_info": {
        "id_card_copy": "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
        "id_card_national": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
        "id_card_name": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9G
		msugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5
		APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
        "id_card_number": "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9jVb
		VZh3QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11NdbbHoC
		rJc7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
        "card_period_begin": "2026-06-06",
        "card_period_end": "2026-06-06"
      },
      "id_doc_info": {
        "id_doc_copy": "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
        "id_doc_name": "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTE
		u9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+
		xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
        "id_doc_number": "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9j
		VbVZh3QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11Nd
		bbHoCrJc7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
        "doc_period_begin": "2019-06-06",
        "doc_period_end": "2026-06-06"
      },
      "owner": "true"
    },
    "ubo_info": {
      "id_type": "IDENTIFICATION_TYPE_IDCARD",
      "id_card_copy": "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
      "id_card_national": "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
      "id_doc_copy": "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
      "name": "李四",
      "id_number": "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9jVbVZh3
	  QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11NdbbHoCrJc
	  7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
      "id_period_begin": "2019-06-06",
      "id_period_end": "2026-06-06"
    }
  },
  "business_info": {
    "merchant_shortname": "张三餐饮店",
    "service_phone": "0758XXXXX",
    "sales_info": {
      "sales_scenes_type": [
        "string"
      ],
      "biz_store_info": {
        "biz_store_name": "大郎烧饼",
        "biz_address_code": "440305",
        "biz_store_address": "南山区xx大厦x层xxxx室",
        "store_entrance_pic": [
          "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
        ],
        "indoor_pic": [
          "0P3ng6KTIW4-Q_l2FjKLZuhHjBWoMAjmVtCz7ScmhEIThCaV-4BBgVwtNkCHO_XXqK5dE5YdOmFJBZR9FwczhJehHhAZN6BKXQPcs-VvdSo"
        ],
        "biz_sub_appid": "wx1234567890123456"
      },
      "mp_info": {
        "mp_appid": "wx1234567890123456",
        "mp_sub_appid": "wx1234567890123456",
        "mp_pics": [
          "string"
        ]
      },
      "mini_program_info": {
        "mini_program_appid": "wx1234567890123456",
        "mini_program_sub_appid": "wx1234567890123456",
        "mini_program_pics": [
          "string"
        ]
      },
      "app_info": {
        "app_appid": "wx1234567890123456",
        "app_sub_appid": "wx1234567890123456",
        "app_pics": [
          "string"
        ]
      },
      "web_info": {
        "domain": "http://www.qq.com",
        "web_authorisation": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
        "web_appid": "wx1234567890123456"
      },
      "wework_info": {
        "corp_id": "wx1234567890123456",
        "sub_corp_id": "wx1234567890123456",
        "wework_pics": [
          "string"
        ]
      }
    }
  },
  "settlement_info": {
    "settlement_id": "719",
    "qualification_type": "餐饮",
    "qualifications": [
      "string"
    ],
    "activities_id": "716",
    "activities_rate": "0.6",
    "activities_additions": [
      "string"
    ]
  },
  "bank_account_info": {
    "bank_account_type": "BANK_ACCOUNT_TYPE_CORPORATE",
    "account_name": "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9jV
	bVZh3QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11Ndb
	bHoCrJc7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
    "account_bank": "工商银行",
    "bank_address_code": "110000",
    "bank_branch_id": "402713354941",
    "bank_name": "施秉县农村信用合作联社城关信用社",
    "account_number": "d+xT+MQCvrLHUVDWv/8MR/dB7TkXM2YYZlokmXzFsWs35NXUot7C0NcxIrUF5FnxqCJHkNgKtxa6RxEYyba1+VBRLnqKG2fSy/Y5qDN08
	Ej9zHCwJjq52Wg1VG8MRugli9YMI1fI83KGBxhuXyemgS/hqFKsfYGiOkJqjTUpgY5VqjtL2N4l4z11T0ECB/aSyVXUysOFGLVfSrUxMPZy6jWWYGvT1+4P633f+
	R+ki1gT4WF/2KxZOYmli385ZgVhcR30mr4/G3HBcxi13zp7FnEeOsLlvBmI1PHN4C7Rsu3WL8sPndjXTd75kPkyjqnoMRrEEaYQE8ZRGYoeorwC+w=="
  },
  "addition_info": {
    "legal_person_commitment": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
    "legal_person_video": "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
    "business_addition_pics": [
      "string"
    ],
    "business_addition_msg": "特殊情况, 说明原因"
  }
}
```

## 返回参数

| 变量         | 类型   | 必填 | 参数名/描述/示例值                          |
| ------------ | ------ | ---- | ------------------------------------------- |
| applyment_id | uint64 | 是   | `微信支付申请单号` 微信支付分配的申请单号。 |
|              |        |      | 2000002124775691                            |

### 返回示例

正常示例

```shell
> 200 Response
> {
> "applyment_id": 2000002124775691
> }
```

## 错误码<sub>[公共错误码](https://wechatpay-api.gitbook.io/wechatpay-api-v3/wei-xin-zhi-fu-api-v3-jie-kou-gui-fan#http-zhuang-tai-ma)</sub>

| 错误码             | 描述                                   | 解决方案                                                                                                                                                               |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SYSTEMERROR        | 系统错误                               | 系统异常, 请使用相同参数稍后重新调用                                                                                                                                   |
| PARAM_ERROR        | 参数错误                               | 请使用正确的参数重新调用                                                                                                                                               |
| PROCESSING         | 存在流程进行中的申请单, 请检查是否重入 | 可通过[查询申请单状态](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/tool/applyment4sub/chapter3_2.shtml)查看此申请单的申请状态, 或更换 out_request_no 提交新的申请单 |
| NO_AUTH            | 商户权限异常                           | 请确认是否已经开通相关权限                                                                                                                                             |
| RATE_LIMITED       | 频率限制                               | 请降低调用频率                                                                                                                                                         |
| APPLYMENT_NOTEXIST | 申请单不存在                           | 确认入参, 传入正确的申请单编号                                                                                                                                         |
