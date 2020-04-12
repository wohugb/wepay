---
title: '小程序拉起先享卡小程序查看详情 API'
linkTitle: '小程序拉起先享卡小程序查看详情'
date: '2020-03-26'
weight: 1
description: >
  通过调用该接口打开先享卡小程序, 查看用户已领取先享卡的卡片详情。
type: 'docs'
---

{{% alert title="注意" color="warning"%}}

- 同调用该接口时, 需要在代码配置(app.json 中的 navigateToMiniProgramAppIdList 选项）中声明将要跳转的小程序名单。

## 接口说明

**适用对象**: 直连商户

接口名称: wx.navigateToMiniProgram, 详情请参见《小程序跳转 API》文档

接口兼容: 每个小程序可跳转的其他小程序数量限制为不超过 10 个。

先享卡小程序 appid 为: wxcc2e4fbc5887661e

先享卡领取页路径为: /pages/card-detail/card-detail

接口参数
path
变量 类型 必填 参数名/描述/示例值 -
先享卡订单号

out_order_no

string(64）

是

先享卡订单的主键, 唯一定义此资源的标识。
|||233bcbf407e87789b8e471f251774f95

示例代码

appid: "wxcc2e4fbc5887661e",
path:"/pages/card-detail/card-detail?out_order_no=233bcbf407e87789b8e471f251774f95",
extraData: {}
