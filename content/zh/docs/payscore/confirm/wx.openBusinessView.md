---
title: '小程序调起支付分-确认订单'
linkTitle: '小程序调起支付分-确认订单'
date: 2019.08.23
weight: 1
description: >
  商户通过调用确认订单接口打开微信支付分小程序, 引导用户确认订单(小程序端）
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
跳转类型 businessType string(32) 是 固定配置: wxpayScoreUse
|||wxpayScoreUse +业务参数 extraData Object 是 需要传递给支付分的业务数据。
示例代码

if (wx.openBusinessView) {
wx.openBusinessView({
businessType: 'wxpayScoreUse',
extraData: {
mch_id: '1230000109',
package: 'XXXXXXXX',
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
接口名称: wx.navigateToMiniProgram, 详见小程序 API 文档。

接口兼容: 每个小程序可跳转的其他小程序数量限制为不超过 10 个。

接口参数
Object object
变量 类型 必填 参数名/描述/示例值 -
公众号 ID appId string(32) 是 支付分公众账号 ID, 固定配置: wxd8f3793ea3b935b8。
|||wxd8f3793ea3b935b8
路径 path string(64) 是 固定配置: pages/use/use
|||pages/use/use +业务参数 extraData Object 是 需要传递给支付分的业务数据。
示例代码

wx.navigateToMiniProgram({
appId: 'wxd8f3793ea3b935b8',
path: 'pages/use/use',
extraData: {
mch_id: '1230000109',
package: 'XXXXXXXX',
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
1.3 支付分返回商家侧小程序
触发场景: 用户从商户小程序页面进入到支付分后再返回到商户小程序页面。

## 返回参数: 商户小程序可在 App.onLaunch, App.onShow 中获取到这份数据。

接口参数
变量 类型 必填 参数名/描述/示例值 -
业务参数 query_id string(64) 是 单据查询 id, 对应【查询订单】接口中入参 query_id。
|||XXXXXXXX
注意: 只有用户点击支付分页面内返回按钮时, 才会带上返回参数；如果用户点击页面左上角的返回图标按钮, 则不会带上返回参数。

示例代码

// app.js
onShow(res) {
if (res.scene === 1038) { // 场景值 1038: 从被打开的小程序返回
const { appId, extraData } = res.referrerInfo;
if (appId === miniprogram_appid) { // miniprogram_appid 由【创建订单】返回, 建议检查是否等于 appId, 不强制
let query_id = extraData.query_id;
let result = this.queryOrderStatus(query_id);
if (result) {
// 成功
} else {
// 失败
}
}
}
}
​
/\*\*

- 查询订单状态函数
- 由商家后台服务提供
- @param query_id {string
  } 单据 id, 可以在接口【查询订单】进行单据查询
  \*/
  queryOrderStatus: function(query_id) {
  // 商家小程序向商家后台服务请求查询订单状态,
  // 这里的前后端接口和数据协议由商家侧设计
  // 函数返回查询结果, 这里以布尔值 true 代表成功, 布尔值 false 代表失败
  }
