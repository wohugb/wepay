---
title: '小程序调起支付分-授权服务'
linkTitle: '小程序调起支付分-授权服务'
date: 2020.03.05
weight: 1
description: >
  商户通过调用授权服务接口打开微信支付分小程序, 引导用户授权服务(小程序端）
type: 'docs'
---

简介
商户小程序跳转微信侧小程序建议使用两种方式: 调用 wx.openBusinessView 或者 wx.navigateToMiniProgram。其中 wx.openBusinessView 不占用小程序跳转其他小程序的数量名额。

1.1 wx.openBusinessView
接口名称: wx.openBusinessView

接口兼容:
● 小程序版本库 >= 2.6.0, 低版本需提示用户升级微信版本。
● iOS 兼容性表现: 若微信版本 >= 7.0.3, 开发者可以通过此 openSDK 接口跳转到微信支付分小程序；若微信版本 < 7.0.3, 开发者通过此 openSDK 接口可以跳转到微信, 但不能跳转到微信支付分小程序, 此时微信会提示用户可能由于应用的请求非法或者微信版本过低。
● Android 兼容性表现: 若微信版本>=7.0.3, 开发者可以通过此 openSDK 接口跳转到微信支付分小程序；若微信版本< 7.0.3, 开发者通过此 openSDK 接口不能跳转到微信, 此时开发者应提示用户更新微信版本。

接口参数
Object object
变量 类型 必填 参数名/描述/示例值 -
跳转类型 businessType string(16) 是 固定配置: wxpayScoreEnable
|||wxpayScoreEnable +业务参数 extraData Object 是 需要传递给支付分的业务数据。
示例代码

if (wx.openBusinessView) {
wx.openBusinessView({
businessType: 'wxpayScoreEnable',
extraData: {
mch_id: '1230000109',
service_id: '88888888000011',
out_request_no: '1234323JKHDFE1243252'
timestamp: '1530097563',
nonce_str: 'zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2',
sign_type: 'HMAC-SHA256',
sign: '029B52F67573D7E3BE74904BF9AEA'
},
success() {
//dosomething
},
fail() {
//dosomething
},
complete() {
//dosomething
}
});
} else {
//引导用户升级微信版本
}
1.2 wx.navigateToMiniProgram
接口名称: wx.navigateToMiniProgram, 详见小程序 API 文档

接口兼容: 每个小程序可跳转的其他小程序数量限制为不超过 10 个。

接口参数
Object object
变量 类型 必填 参数名/描述/示例值 -
公众号 ID appId string(32) 是 支付分公众账号 ID, 固定配置: wxd8f3793ea3b935b8。
|||wxd8f3793ea3b935b8
路径 path string(64) 是 固定配置: pages/use/enable
|||pages/use/enable +业务参数 extraData Object 是 需要传递给支付分的业务数据。
示例代码

wx.navigateToMiniProgram({
appId: 'wxd8f3793ea3b935b8',
path: 'pages/use/enable',
extraData: {
mch_id: '1230000109',
service_id: '88888888000011',
out_request_no: '1234323JKHDFE1243252',
timestamp: '1530097563',
nonce_str: 'zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2',
sign_type: 'HMAC-SHA256',
sign: '029B52F67573D7E3BE74904BF9AEA'
},
success() {
//dosomething
},
fail() {
//dosomething
},
complete() {
//dosomething
}
});
