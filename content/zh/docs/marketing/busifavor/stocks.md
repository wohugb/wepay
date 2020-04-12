---
title: '创建商家券API'
linkTitle: ''
date: 2020.03.20
weight: 3
description: >
  服务商可以通过该接口为有需求的商户创建商家券。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/stocks\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

商家券批次名称 stock_name string(24) 是 query 批次名称, 字数上限为 24 个字节长度(中文按 UTF8 编码算字节数）。
|||8 月 1 日活动券
批次归属商户号 belong_merchant string(15) 是 query 批次归属于哪个商户。
特殊规则: 最小长度取值为 8。
|||10000022
批次备注 comment string(20) 否 query 仅配置商户可见, 用于自定义信息。
|||活动使用
适用商品范围 goods_name string(15) 是 query 用来描述批次在哪些商品可用, 会显示在微信卡包中。
|||xxx 商品使用
批次类型 stock_type string(32) 是 query 批次类型
NORMAL: 固定面额满减券批次
DISCOUNT: 折扣券批次
EXCHANGE: 换购券批次
|||NORMAL +核销规则 coupon_use_rule object 是 query 券核销相关规则 +发放规则 stock_send_rule object 是 query 券发放相关规则
商户请求单号 out_request_no string(128) 是 query 商户创建批次凭据号(格式: 商户 id+日期+流水号）, 商户侧需保持唯一性。
|||100002322019090134234sfdf +自定义入口 custom_entrance object 否 query 卡详情页面, 可选择多种入口引导用户。 +样式信息 display_pattern_info object 否 query 创建批次时的样式信息。
券 code 模式 coupon_code_mode string(128) 是 query 枚举值:
WECHATPAY_MODE: 系统分配券 code。(固定 22 位纯数字）
MERCHANT_API: 商户发放时接口指定券 code。
MERCHANT_UPLOAD: 商户上传自定义 code, 发券时系统随机选取上传的券 code。
|||WECHATPAY_MODE +事件通知配置 notify_config object 否 query 事件回调通知商户的配置。
卡券背景颜色图

### 请求示例

```json
{
  "stock_name": "8 月 1 日活动券",
  "belong_merchant": "10000098",
  "comment": "活动使用",
  "goods_name": "填写代金券可适用的商品或服务",
  "stock_type": "NORMAL",
  "coupon_use_rule": {
    "coupon_available_time": {
      "available_begin_time": "2015-05-20T13:29:35.120+08:00",
      "available_end_time": "2015-05-20T13:29:35.120+08:00",
      "available_day_after_receive": 3,
      "available_week": {
        "week_day": ["1", "2"],
        "available_day_time": [
          {
            "begin_time": 3600,
            "end_time": 86399
          }
        ]
      },
      "irregulary_avaliable_time": [
        {
          "begin_time": "2015-05-20T13:29:35.120+08:00",
          "end_time": "2015-05-20T13:29:35.120+08:00"
        }
      ]
    },
    "fixed_normal_coupon": {
      "discount_amount": 5,
      "transaction_minimum": 100
    },
    "discount_coupon": {
      "discount_percent": 88,
      "transaction_minimum": 100
    },
    "exchange_coupon": {
      "exchange_price": 100,
      "transaction_minimum": 100
    },
    "use_method": "OFF_LINE",
    "mini_programs_appid": "wx23232232323",
    "mini_programs_path": "/path/index/index"
  },
  "stock_send_rule": {
    "max_amount": 100000,
    "max_coupons": 100,
    "max_coupons_per_user": 5,
    "max_amount_by_day": 1000,
    "max_coupons_by_day": 100,
    "natural_person_limit": "false",
    "prevent_api_abuse": "false",
    "transferable": "false",
    "shareable": "false"
  },
  "out_request_no": "100002322019090134234sfdf",
  "custom_entrance": {
    "mini_programs_info": {
      "mini_programs_appid": "wx234545656765876",
      "mini_programs_path": "/path/index/index",
      "entrance_words": "欢迎选购",
      "guiding_words": "获取更多优惠"
    },
    "appid": "wx324345hgfhfghfg",
    "hall_id": "233455656",
    "store_id": "233554655"
  },
  "display_pattern_info": {
    "description": "xxx 门店可用",
    "merchant_logo_url": "https://xxx",
    "merchant_name": "微信支付",
    "background_color": "xxxxx",
    "coupon_image_url": "图片 cdn 地址"
  },
  "coupon_code_mode": "WECHATPAY_MODE"
}
```

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

批次号 stock_id string(20) 是 批次号
|||98065001
创建时间 create_time string(32) 是 创建时间, 遵循 rfc3339 标准格式, 格式为 YYYY-MM-DDTHH:mm:ss:sss+TIMEZONE, YYYY-MM-DD 表示年月日, T 出现在字符串中, 表示 time 元素的开头, HH:mm:ss:sss 表示时分秒毫秒, TIMEZONE 表示时区(+08:00 表示东八区时间, 领先 UTC 8 小时, 即北京时间）。例如: 2015-05-20T13:29:35.120+08:00 表示, 北京时间 2015 年 5 月 20 日 13 点 29 分 35 秒。
|||2015-05-20T13:29:35.120+08:00

### 返回示例

```json
{
  "stock_id": "98065001",
  "create_time": "2015-05-20T13:29:35.120+08:00"
}
```

跳转小程序带参数说明
如果商家券配置了跳转小程序的入口(包括立即使用以及自定义入口）, 跳转链接会带有批次号、openid 以及加密的 code, 解密方式可参考解密说明。

/path/index/index.html?stock_id=128695000000007&openid=o7tgX0RiTlJo9IXVVfemjFSlFMo4&nonce=B9Jr9gtzMSs7&associate=COUPON_CODE&ciphertext=nmARA5zbjlL%2FaCiKN7S3h1z%2FGhmCfNW9IGQHX6XqTR3zYzQ43sQ%3D

解密说明
通过以下步骤, 可对加密的数据进行解密:

1、用商户平台上设置的 APIv3 密钥【微信商户平台(pay.weixin.qq.com）—>账户设置—>API 安全—>设置 APIv3 密钥】, 记为 key。
2、从跳转路径中取得参数 nonce、associate 和密文 ciphertext；
3、使用 urldecode 对 ciphertext 进行解码, 得到 strUrlDecodeText；
4、使用 base64 对 strUrlDecodeText 进行解码, 得到 strBase64DecodeText；
5、使用 key、nonce 和 associate, 对数据密文 strBase64DecodeText 进行解密, 得到的字符串即为 coupon_code。

注: AEAD_AES_256_GCM 算法的接口细节, 请参考 rfc5116。微信支付使用的密钥 key 长度为 32 个字节, 随机串 nonce 长度 12 个字节, associated 当前为固定值"COUPON_CODE"。

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
400 PARAM_ERROR 参数错误 查看具体错误信息, 调整参数
400 SYSTEM_ERROR 系统错误 请使用相同参数稍后重新调用
400 RESOURCE_ALREADY_EXISTS 批次已存在 查看 out_request_no 字段是否重复使用
券已被其他订单核销 请通过查询券 API 确认券是否已被其他订单核销
404 RESOURCE_NOT_EXISTS 查询的资源不存在 请检查查询资源的对应 id 是否填写正确
403 NOAUTH 无权限 查看具体错误信息, 确认是否有权限
400 APPID_MCHID_NOT_MATCH appid 与请求方商户无关联关系 appid 与请求方商户不匹配, 请确认 appid 与请求方商户是否有关联关系
400 MCH_NOT_EXISTS 商户号不存在 请确认传入的商户号是否正确
404 USER_NOT_EXISTS openid 不正确 请确认传入的 openid 是否正确
500 SYSTEM_ERROR 系统失败 多为网络超时引起, 重试
429 FREQUENCY_LIMITED 频率限制 调用太频繁, 请降低调用接口频率
403 RULELIMIT 券不在有效期 请确认券是否能在当前时间核销
400 INVALID_REQUEST 发券模式不合法 请更换支持预上传 code 的批次后重试
上传的自定义 code 已达上限 请更换一个新的批次后重试
