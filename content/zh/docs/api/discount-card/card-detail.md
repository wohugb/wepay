---
title: 'APP 拉起先享卡小程序查看详情 API'
linkTitle: 'APP 拉起先享卡小程序查看详情'
date: '2020-03-26'
weight: 1
description: >
  通过调用该接口打开先享卡小程序, 查看用户已领取先享卡的卡片详情。
type: 'docs'
---

## 接口说明

**适用对象**: 直连商户

APP 拉起小程序标准流程请参考《APP 拉起小程序功能》文档。

先享卡小程序 appid 为: wxcc2e4fbc5887661e

先享卡详情页路径为: /pages/card-detail/card-detail

接口参数
path
变量 类型 必填 参数名/描述/示例值 -
先享卡订单号 out_order_no string(64） 是 先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95
path 示例

/pages/card-detail/card-detail? out_order_no=233bcbf407e87789b8e471f251774f95
