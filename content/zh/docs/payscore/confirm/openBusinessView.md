---
title: 'H5 调起支付分-确认订单'
linkTitle: 'H5 调起支付分-确认订单'
date: 2019.12.16
weight: 1
description: >
  商商户通过调用确认订单接口打开微信支付分小程序, 引导用户确认订单(Web 端）

type: 'docs'
---

简介
接口名称: openBusinessView

接口兼容:
此接口引用 JSAPI 版本 1.5.0, 引用地址: https://res.wx.qq.com/open/js/jweixin-1.5.0.js。

要求用户微信版本>=7.0.5

接口参数
Object
变量 类型 必填 参数名/描述/示例值 -
跳转类型 businessType string(16) 是 固定配置: wxpayScoreUse
|||wxpayScoreUse
业务参数 queryString string(2048) 是 使用 URL 的 query string 方式传递参数, 格式为 key=value&key2=value2, 其中 value, value2 需要进行 UrlEncode 处理。
|||见 queryString 示例
query 示例

mch_id=1230000109&package=XXXXXXXX&
timestamp=1530097563&nonce_str=zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2
&sign_type=HMAC-SHA256&sign=029B52F67573D7E3BE74904BF9AEA
query 内部参数
变量 类型 必填 参数名/描述/示例值 -
商户号 mch_id string(32) 是 微信支付分配的商户号。
|||1230000109
扩展字符串 package string(128) 是 可在【创建订单】接口的返回字段 package 中获取。
|||XXXXXXXX
时间戳 timestamp string(32) 是 生成签名时间戳, 单位秒。
|||1530097563
随机字符串 nonce_str string(32) 是 生成签名随机串。由数字、大小写字母组成, 长度不超过 32 位。
|||zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2
签名方式 sign_type string(32) 是 签名类型, 仅支持 HMAC-SHA256。
|||HMAC-SHA256
签名 sign string(64) 是 使用字段 mch_id、package、timestamp、nonce_str、sign_type 按照签名生成算法计算得出的签名值。
|||029B52F67573D7E3BE74904BF9AEA

## 返回参数

Object res
变量 类型 必填 参数名/描述/示例值 -
返回码 err_code Number/string(32) 是 返回码, 由于 iOS 和 Android 实现的差异, err_code 类型可能为 Number 或 string
, 所以在判断支付分是否成功返回商户的 H5 时, 需要对 err_code 做整型化处理。
示例值:
iOS: 0
Android: '0'
返回信息 err_msg string(128) 是 返回信息
|||openBusinessView:ok +业务参数 extraData Object 否 当 err_code 为 0 时, extraData 才返回；反之, 则不返回。
注意: 只有用户点支付分页面内返回按钮时, 才会带上返回参数；如果用户左滑返回或者点击页面左上角的返回图标返回, 则不会带上返回参数。所以推荐在【查询订单】接口使用 out_order_no 作为入参。另外商户侧后台在创建支付分订单时需向前端返回 out_order_no, 同时前端需缓存 out_order_no, 以便在接口回调中查询订单状态。

示例代码

let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
let wechatVersion = wechatInfo[1];
​
if (compareVersion(wechatVersion, '7.0.5') >= 0) {
goToWXScore();
} else {
// 提示用户升级微信客户端版本
window.href = 'https://support.weixin.qq.com/cgi-bin/readtemplate?t=page/common_page__upgrade&
text=text005&btn_text=btn_text_0'
}
​
/\*\*

- 跳转微信支付分
  \*/
  function goToWXScore() {
  wx.checkJsApi({
  jsApiList: ['openBusinessView'], // 需要检测的 JS 接口列表
  success: function (res) {
  // 以键值对的形式返回, 可用的 api 值 true, 不可用为 false
  // 如: {"checkResult":{"openBusinessView":true},"errMsg":"checkJsApi:ok"}
  if (res.checkResult.openBusinessView) {
  wx.invoke(
  'openBusinessView', {
  businessType: 'wxpayScoreUse',
  queryString
  : 'mch_id=1230000109&package=xxxxx&
  timestamp=1530097563&nonce_str=zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2&sign_type=HMAC-SHA256&
  sign=029B52F67573D7E3BE74904BF9AEA'
  },
  function (res) {
  // 从支付分返回时会执行这个回调函数
  if (parseInt(res.err_code) === 0) {
  // 返回成功
  } else {
  // 返回失败
  }
  });
  }
  }
  });
  }
  ​
  /\*\*
- 版本号比较
- @param {string
  } v1
- @param {string
  } v2
  \*/
  function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

      while (v1.length < len) {
        v1.push('0')
      }
      while (v2.length < len) {
        v2.push('0')
      }

      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
          return 1
        } else if (num1 < num2) {
          return -1
        }
      }

      return 0

  }
