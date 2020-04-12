---
title: '查询申请单审核结果 API'
linkTitle: '查询申请单审核结果'
date: '2019-08-08'
weight: 3
description: >
  当服务商提交申请单后, 需要定期调用此接口查询申请单的审核状态。
type: 'docs'
---

## 接口说明

**适用对象**: 从业机构 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/apply4subject/applyment?applyment_id={applyment_id}
或
https://api.mch.weixin.qq.com/v3/apply4subject/applyment?business_code={business_code}\
**请求方式**: GET\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

申请单编号 applyment_id uint64 二选一 path 微信支付分配的申请单号。
|||20000011111
业务申请编号 business_code string(128) path 服务商自定义的唯一编号。每个编号对应一个申请单。
|||1111111111

### 请求示例

`URL` https://api.mch.weixin.qq.com/v3/apply4subject/applyment?applyment_id=20000011111

或

https://api.mch.weixin.qq.com/v3/apply4subject/applyment?business_code=1111_2222

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

申请单状态 applyment_state string(32) 是 申请单状态
枚举值说明:
APPLYMENT_STATE_WAITTING_FOR_AUDIT-【审核中】: 请耐心等待 1~2 个工作日, 微信支付将会完成审核。
APPLYMENT_STATE_EDITTING-【编辑中】: 可能提交申请发生了错误导致, 可用同一个业务申请编号重新提交。
APPLYMENT_STATE_WAITTING_FOR_CONFIRM_CONTACT-【待确认联系信息】: 请扫描微信支付返回的小程序码确认联系信息(此过程可修改超级管理员手机号)。
APPLYMENT_STATE_WAITTING_FOR_CONFIRM_LEGALPERSON-【待账户验证】: 请扫描微信支付返回的小程序码在小程序端完成账户验证。
APPLYMENT_STATE_PASSED-【审核通过】: 请扫描微信支付返回的小程序码在小程序端完成授权流程。
APPLYMENT_STATE_REJECTED-【审核驳回】: 请按照驳回原因修改申请资料, 并更换业务申请编码, 重新提交申请。
APPLYMENT_STATE_FREEZED-【已冻结】: 可能是该主体已完成过入驻, 请查看驳回原因, 并通知驳回原因中指定的联系人扫描微信支付返回的小程序码在小程序端完成授权流程。
8、APPLYMENT_STATE_CANCELED-【已作废】: 表示申请单已被撤销, 无需再对其进行操作。
|||APPLYMENT_STATE_PASSED
小程序码图片 qrcode_data string (30000) 否 1、当申请单状态为 APPLYMENT_STATE_WAITTING_FOR_CONFIRM_CONTACT、APPLYMENT_STATE_WAITTING_FOR_CONFIRM_LEGALPERSON、APPLYMENT_STATE_PASSED、APPLYMENT_STATE_FREEZED 时, 会返回小程序码图片。
2、使用 base64 解码该字段, 可得到图片二进制数据。
3、可用 img 标签直接加载该图片。示例如下:
<img src=“data:image/png;base64,iVBORw0KGgoAAAANSU=” style=“display: block;”>
|||cGFnZXMvYXBwbHkvYXBpdzQvd2VsY29tZS93ZWxjb21lP2FwcGx5bWVudF9pZD14eHg=
驳回参数 reject_param string (256) 否 当申请单状态为“审核驳回”时, 会返回该字段, 标识被驳回的字段名。
|||merchant_name
驳回原因 reject_reason string (1024) 否 当申请单状态为“审核驳回”时, 会返回该字段, 表示驳回原因。
|||公司名称与工商局登记不一致

### 返回示例

```json
{
"applyment_state": "APPLYMENT_STATE_PASSED",
"qrcode_data": "cGFnZXMvYXBwbHkvYXBpdzQvd2VsY29tZS93ZWxjb21lP2FwcGx5bWVudF9pZD14eHg=",
"reject_param": "merchant_name",
"reject_reason": "公司名称与工商局登记不一致"
}

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEMERROR 系统错误 系统异常, 请使用相同参数稍后重新调用
400 PARAM_ERROR 参数错误 请使用正确的参数重新调用
400 INVALID_REQUEST 无效请求 请查看返回的错误信息, 根据错误信息进行操作
403 NOAUTH 商户权限异常 请确认是否已经开通相关权限
```
