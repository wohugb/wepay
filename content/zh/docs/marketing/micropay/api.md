---
title: '小程序发券插件API'
linkTitle: '发券插件'
date: 2019.11.20
weight: 1
description: >
  商户在已有小程序场景内, 向指定用户发放指定批次的支付券(当前仅支持商家券, 暂不支持微信支付代金券）
type: 'docs'
---

## 接口说明

**适用对象**: 微信支付商户\
**接口规则**: https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=4_3

小程序接入插件操作
1、添加插件配置(引入插件包）
在小程序配置 app.json 文件中加入如下配置:

```json
// app.json
{
  "plugins": {
    "sendCoupon": {
      "version": "1.1.1",
      "provider": "wxf3f436ba9bd4be7b"
    }
  }
}
```

2、在小程序页面中引入发券插件
注意: 插件本身不带任何样式, 只用于发起请求, 支持插入子节点, 子节点供商户任意定义样式和内容。

1）在小程序页面配置文件中加入如下配置, 引入 send-coupon 组件:

```json
// page.json
{
  "usingComponents": {
    "send-coupon": "plugin://sendCoupon/send-coupon"
  }
}
```

2）在小程序页面的 WXML 模板中加入如下代码, 并填入相关字段, 字段说明参见小程序发券插件字段说明表

```xml
//page.wxml
<send-coupon
bindcustomevent="getcoupon"
send_coupon_params="{{send_coupon_params}}"
sign="{{sign}}"
send_coupon_merchant="{{send_coupon_merchant}}"

>

  <!-- 内部为自定义代码, 按钮点击部分的代码写在这里 -->
  <!-- [[以下为示例代码 -->

<view class="text">领取</view>

  <!-- 以上为示例代码 ]] -->
</send-coupon>
```

小程序发券插件字段说明表

变量 |类型 |必填 |参数名/描述/示例值

自定义事件 bindcustomevent string 否 领券后调用的事件, bindcustomevent 说明参考《自定义组件文档》 +发券参数 send_coupon_params array 是 发券参数, 一次最多 10 张
示例值:
发一张券 JSON:
"send_coupon_params":[
{ "stock_id": "98065001",
"out_request_no": "89560002019101000121",
} ]
发多张券 JSON:
"send_coupon_params":[
{ "stock_id": "98065001",
"out_request_no": "89560002019101000121" }
{ "stock_id": "98065001",
"out_request_no": "89560002019101000122" } ]
签名 sign string
是 签名计算值
签名方式: HMAC-SHA256。
签名规则: 详见《V2 签名规则》
参与签名字段说明
注意: 为了安全, 签名必须在后台服务器计算, 禁止在小程序中计算, 签名 key 为微信支付 apiv2 的 signkey
|||9A0A8659F005D6984697E2CA0A9CF3B79A0A8659F005D6984697E2CA0A9CF3B7
发券商户号 send_coupon_merchant string(15) 是 发券商户号
特殊规则: 长度最小 8 个字节
|||10016226
参与签名字段说明

{{% alert title="注意" color="warning"%}}

1、当存在发放一张或多张券的情况下, 参数名使用后标表示, 后标从 0 开始:
发放一张券示例值: out_request_no0=abc123&send_coupon_merchant=10016226&stock_id0=1234567&key=xxxxx

发放多张券示例值: out_request_no0=abc123&out_request_no1=123abc&send_coupon_merchant=10016226
&stock_id0=1234567&stock_id1=2345678&key=xxxxx

2、当 批次是发放时指定 code 的类型的情况下:
发放一张券示例值: coupon_code0=asdsada&out_request_no0=abc123&send_coupon_merchant=10016226
&stock_id0=1234567&key=xxxxx

发放多张券示例值: coupon_code0=asdsada&coupon_code1=asdsada&out_request_no0=abc123&out_request_no1=123abc
&send_coupon_merchant=10016226&stock_id0=1234567&stock_id1=2345678&key=xxxxx

3、如果遇到签名失败, 请按照下面几项进行检查

1）签名方式一定要用 HMAC-SHA256

2）key 需要使用 apiv2 的 signkey, 设置路径: 微信商户平台(pay.weixin.qq.com)-->账户设置-->API 安全-->密钥设置

3）确认 key 的正确性, 例如是否是本商户号下的 key

4）签名源串请按照示例参数格式进行拼接, 参数顺序务必确保和示例一致

5）参数名严格区分大小写

6）更多规则详见《V2 签名规则》

{{% /alert %}}

变量 |类型 |必填 |参数名/描述/示例值

发券商户号 send*coupon_merchant string(15) 是 发券商户号
特殊规则: 长度最小 8 个字节
|||10016226
批次号 stock_id{n} string(20) 是 微信支付券批次 id, {n}为下标, 从 0 开始, 例如 stock_id0
|||123
发券凭证 out_request_no{n} string(128) 是 发券凭证, {n}为下标, 从 0 开始, 例如 out_request_no0。
可包含英文字母, 数字, ｜, *, \*, -等内容, 不允许出现其他不合法符号, 需在单个批次单个用户下确保唯一性
|||1234567
券 code coupon_code{n} string(128) 条件选填 券 code, 如果批次是发放时指定 code 的类型, 则发券时必填 coupon_code
{n}为下标, 从 0 开始, 例如 stock_id0
|||asdsada
3、在小程序页面对应的 JS 逻辑中, 获取插件实例并执行初始化操作

javascript
//page.js
Page({
// 此函数名称可以自定义, 跟 bindcustomevent 绑定的保持一致
getcoupon: function(params) {
// 插件返回信息在 params.detail
console.log('getcoupon', params)
}
})

如果事件绑定正确, 在用户点击领券后, 会触发领券事件, 得到返回之后会调用 getcoupon 函数。

返回处理
从回调函数参数 detail 中, 获取参数。

变量 |类型 |必填 |参数名/描述/示例值

外层错误码 errcode string
是 返回整体错误码
错误信息 msg string
是 返回整体错误信息 +发券结果 send_coupon_result object 是 发券结果, 包含需要发放的每张券的结果信息, 是否成功或失败原因

### 返回示例

```js
javascript;
//获取代码示例
Page({
  data: {
    // ...
  },
  onLoad: function () {
    // ...
  },
  getcoupon: function (params) {
    console.log('getcoupon', params);
    console.log('detail', params.detail);
  },
});
```

## 错误码

Detail 中 errcode 返回错误码

错误码 描述 解决方案
OK 调用成功 接口调用成功, 具体发券结果(是否发券成功）需查看发券结果(send_coupon_result）中的参数
PARAM_ERROR 参数错误 参数错误, 请开发者查看 msg 中具体的错误信息并进行修复处理
USER_NOT_EXISTS 登录态获取失效 引导用户重试
USER_GET_FAILED 登录态获取失败 报错, 提示用户稍后操作
SIGN_ERROR 签名错误 请开发者检查签名正确性
SYSTEMERROR 发券超时 提示报错, 提示用户稍后操作
发券结果(send_coupon_result）中的错误码

错误码 描述 解决方案
SUCCESS 该张券发券成功 提示用户领取成功/改变前端领券按钮状态
FAILED 该张券发券失败, 查看 message 中的具体错误信息 提示用户领券失败, 请开发者查看 message 中具体的错误信息并进行修复处理
NOTENOUGH 总预算用完 提示用户领券失败, 请增加批次预算
DAYLIMIT 用户达到单天限领 提示用户领券失败, 如需继续发放, 可调整该批次单天发放上限
NATURELIMIT 用户自然人限领 提示用户领券失败, 可提示用户检查其所有微信号领券情况, 并请商户留意刷单风险
MAXQUOTA 用户领取张数达到上限 提示用户领券失败, 该用户领取数量已达上限
DUPREQUEST 已通过该发券凭证给用户发券 提示用户领取成功/改变前端领券按钮状态
NOTRUNNING 批次状态非运营中 提示用户领券失败, 并检查批次状态
如果批次是暂停状态, 需重启后方可发放
如果批次已过期, 请更换批次
