---
title: '开发指引'
linkTitle: '开发指引'
weight: 3
description: >
  开发流程指引
type: 'docs'
---

业务流程时序图: ![](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/assets/img/common/chapter2_3_1.png)

申请单状态变化如下:

`步骤一` 商户入驻, 服务商收集商户资料后, 调用[提交申请单](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/tool/applyment4sub/chapter3_1.shtml)接口, 提交创建入驻申请单。

`步骤二` 创建申请单后, 可通过[查询申请单状态](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/tool/applyment4sub/chapter3_2.shtml)接口, 获取特约商户签约链接, 让商户扫码确认联系信息, 后续申请单进度可通过公众号自动通知超级管理员(简称超管）。

`步骤三` 进件成功后, 若特约商户需修改结算帐号时, 服务商可调用[修改结算帐号](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/tool/applyment4sub/chapter3_3.shtml)接口来帮助特约商户修改结算信息, 修改后通过状态码判断是否修改成功。也可通过调用[查询结算帐号](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/tool/applyment4sub/chapter3_4.shtml)接口来查询核查结算帐号信息。
