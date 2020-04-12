---
title: '小程序发券插件'
linkTitle: '小程序发券'
weight: 3
description: >
  小程序场景内, 向指定用户发放指定批次的支付券。
type: 'docs'
---

## 简介

微信支付为商户小程序提供官方小程序发券插件, 商户小程序接入此插件后, 可在小程序内向指定用户发放指定批次的微信支付券。
用户通过该插件领取微信支付券后, 将自动加入微信卡包, 提升用户领券感知及核销率。(当前仅支持商家券, 暂不支持微信支付代金券）

![用户端流程示例](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/marketing/chapter3_1.png)

## 开发前准备

1、申请插件使用权限
1）以小程序账号登录微信公众平台(mp.weixin.qq.com), 选择【设置—>第三方服务—>添加插件】, 进入添加插件操作页面。

2）搜索插件名“微信支付券”并添加

3）提交审核申请后, 商户可通过微信公众平台查看审核进度

4）审核通过后, 小程序开发者即可在小程序内使用该插件

2、学习使用自定义插件
开始开发前请仔细阅读:

1）小程序自定义组件文档: https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component

2）小程序插件文档: https://developers.weixin.qq.com/miniprogram/dev/framework/plugin

## 商户使用流程如下:

1、申请插件使用权限

2、在商户小程序内添加插件

3、创建微信支付券

4、用户触发领券请求后, 商户小程序传入券批次参数, 微信支付自动为用户发券
