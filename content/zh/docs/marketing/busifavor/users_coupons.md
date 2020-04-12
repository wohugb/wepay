---
title: '根据过滤条件查询用户券API'
linkTitle: ''
date: 2020.03.20
weight: 6
description: >
  服务商自定义筛选条件(如创建商户号、归属商户号、发放商户号等）, 查询指定微信用户卡包中满足对应条件的所有商家券信息。
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/busifavor/users/{openid}/coupons\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

用户标识 openid string(128) 是 path Openid 信息, 用户在 appid 下的唯一标识。
|||2323dfsdf342342
公众账号 ID appid string(32) 是 path 微信为可核销商户分配的公众账号 ID, 接口传入的所有 appid 应该为公众号的 appid(在 mp.weixin.qq.com 申请的）, 不能为 APP 的 appid(在 open.weixin.qq.com 申请的）。
|||wx233544546545989
批次号 stock_id string(20) 否 path 批次号, 是否指定批次号查询。
|||9865000
券状态 coupon_state string(16) 否
path 券状态

枚举值:
SENDED: 可用
USED: 已核销
EXPIRED: 已过期
|||SENDED

创建批次的商户号 creator_merchant string(32) 否 path 批次创建方商户号
|||1000000001
批次归属商户号 belong_merchant string(15) 否 path 批次归属商户号
特殊规则: 长度最小 8 个字节。
|||1000000002
批次发放商户号 sender_merchant string(32) 否 path 批次发放商户号
|||1000000003
分页页码 offset int 否 path 分页页码
|||0
分页大小 limit int 否 path 分页大小
|||20

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/marketing/busifavor/users/2323dfsdf342342/coupons?appid=wx233544546545989&stock_id=9865000&coupon_state=USED&creator_merchant=1000000001&offset=0&limit=20

## 返回参数

变量 类型 必填 描述 +结果集 data array 是 结果集
总数量 total_count int 是 总数量
|||100
分页页码 offset int 是 分页页码
|||1
分页大小 limit int 是 分页大小
|||10
卡券背景颜色图

### 返回示例

正常示例

```http
> 200 Response
> {
> "data": [

    {
      "belong_merchant": "100000222",
      "stock_name": "商家券",
      "comment": "xxx可用",
      "goods_name": "xxx商品可用",
      "stock_type": "NORMAL",
      "transferable": "false",
      "shareable": "false",
      "coupon_state": "SENDED",
      "display_pattern_info": {
        "description": "xxx门店可用",
        "merchant_logo_url": "https://xxx",
        "merchant_name": "微信支付",
        "background_color": "xxxxx",
        "coupon_image_url": "图片cdn地址"
      },
      "coupon_use_rule": {
        "coupon_available_time": {
          "available_begin_time": "2015-05-20T13:29:35.120+08:00",
          "available_end_time": "2015-05-20T13:29:35.120+08:00",
          "available_day_after_receive": 3,
          "available_week": {
            "week_day": [
              "1",
              "2"
            ],
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
      "coupon_code": "123446565767",
      "stock_id": "1002323",
      "available_start_time": "2019-12-30T13:29:35.120+08:00",
      "expire_time": "2019-12-31T13:29:35.120+08:00",
      "receive_time": "2019-12-30T13:29:35.120+08:00"
      "send_request_no": "MCHSEND202003101234"
      "use_request_no": "MCHSEND202003101234"
      "use_time": "2019-12-30T13:29:35.120+08:00"
    }

],
"total_count": 100,
"limit": 10,
"offset": 1
}
```

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
