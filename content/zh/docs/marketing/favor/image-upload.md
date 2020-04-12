---
title: '图片上传 API'
linkTitle: '图片上传'
date: '2019-12-06'
weight: 16
description: >
  通过本接口上传图片后可获得图片 url 地址。图片 url 可在微信支付营销相关的 API 使用, 包括商家券、代金券、支付有礼等。
type: 'docs'
---

## 开发指引

图片上传步骤:

1. 创建一个 POST 的方法请求/upload URI

例如: POST https://api.mch.weixin.qq.com/v3/marketing/favor/media/image-upload HTTP/1.1

2. 将文件的数据添加到请求主体

   2.1 图片文件 file 参数的获取方式说明:
   媒体图片二进制内容, 放在请求 http 的 body 中。

   2.2 媒体文件元信息 meta 参数的获取方式说明:
   媒体文件元信息, 使用 json 表示, 包含两个对象: filename、sha256。
   ● filename 参数获取方式说明:
   商户上传的媒体图片的名称, 商户自定义, 必须以 JPG、BMP、PNG 为后缀。
   ● sha256 参数获取方式说明:
   图片文件的文件摘要, 即对图片文件的二进制内容进行 sha256 计算得到的值。

   2.3 签名计算说明:
   https://wechatpay-api.gitbook.io/wechatpay-api-v3/qian-ming-zhi-nan-1/qian-ming-sheng-cheng
   参与签名计算的请求主体为 meta 的 json 串:

   ```json
   { "filename": "filea.jpg", "sha256": "hjkahkjsjkfsjk78687dhjahdajhk" }
   ```

   待签名串示例:

   ```http
   POST
   /v3/marketing/favor/media/image-upload
   1566987169 //时间戳
   12ced2db6f0193dda91ba86224ea1cd8 //随机数
   {"filename":" filea.jpg ","sha256":" hjkahkjsjkfsjk78687dhjahdajhk "}
   ```

3. 添加 HTTP 头:

   ```http
   Content-Type: multipart/form-data.设置为要上载的对象的 MIME 媒体类型。
   Authorization: WECHATPAY2-SHA256-RSA2048 mchid="1900231671",
   nonce_str="PCHK6HSOEDTACETP6P3AL7DWPHTBKIAT",timestamp="1567067659",
   serial_no="1FB89742D19F2BD30B69948D16DECA0FCB4481EB",
   signature="PB6M7+3JL7TSCl5zqD1sdWVypOIEQsD4dgOU+vPiVM6GMRo2qYSWKf8u46i9ZJFhyZTBdZ7SFR+BjDZh6
   89hFgN8LZL+QWTvq3cse/FEUFYyOLN7L/2IZX4GA4cWInuJ2MpOhZRMpm+emrcn42gTMKAPNQ7dBLO7ux6MoSuQp69
   PW+p1ogmkER68exTVUXYqA5P3vITlWNr++RDy2+ExvB7qVISOKW0vBkxUxN9e7hwUbDwGln170ZXomoO1KpQSbw3f1u
   WUCx/IlWJhJIun7rUMtVT+kfijNUqcILtSfE4hWKKVaZn9j5CX8M7aKbbDOFy3SvbSJ3WQgRnRbgog5w=="
   Content-Type: multipart/form-data;boundary=boundary
   ```

4. 添加 body:

   ```http
   // 以下为 body 的内容
   --boundary // boundary 为商户自定义的一个字符串
   Content-Disposition: form-data; name="meta";
   Content-Type: application/json
   //此处必须有一个空行
   { "filename": "filea.jpg", "sha256": " hjkahkjsjkfsjk78687dhjahdajhk " }
   --boundary
   Content-Disposition: form-data; name="file"; filename="filea.jpg";
   Content-Type: image/jpg
   //此处必须有一个空行
   pic1 //pic1 即为媒体图片的二进制内容
   --boundary--
   ```

   说明: 请求包体每行结尾都需要包含\r\n(空行也需要）。

5. 发送请求

   ```http
   POST /v3/marketing/favor/media/image-upload HTTP/1.1
   Host: api.mch.weixin.qq.com
   Authorization: WECHATPAY2-SHA256-RSA2048
   mchid="1900231671",nonce_str="PCHK6HSOEDTACETP6P3AL7DWPHTBKIAT",
   timestamp="1567067659",
   serial_no="1FB89742D19F2BD30B69948D16DECA0FCB4481EB",
   signature="PB6M7+3JL7TSCl5zqD1sdWVypOIEQsD4dgOU+vPiVM6GMRo2qYSWKf8u46i9ZJFhyZTBdZ7
   SFR+BjDZh689hFgN8LZL+QWTvq3cse/FEUFYyOLN7L/2IZX4GA4cWInuJ2MpOhZRMpm+emrcn42gTMKAPN
   Q7dBLO7ux6MoSuQp69PW+p1ogmkER68exTVUXYqA5P3vITlWNr++RDy2+ExvB7qVISOKW0vBkxUxN9e
   7hwUbDwGln170ZXomoO1KpQSbw3f1uWUCx/IlWJhJIun7rUMtVT+kfijNUqcILtSfE4hWKKVaZn9j5CX8M
   7aKbbDOFy3SvbSJ3WQgRnRbgog5w=="
   Content-Type: multipart/form-data;boundary=boundary

   --boundary
   Content-Disposition: form-data; name="meta";
   Content-Type: application/json

   { "filename": "filea.jpg", "sha256": " hjkahkjsjkfsjk78687dhjahdajhk " }
   --boundary
   Content-Disposition: form-data; name="file"; filename="filea.jpg";
   Content-Type: image/jpg

   pic1
   --boundary--
   ```

## 接口说明

**适用对象**: 直连商户 服务商 渠道商\
**请求 URL**: https://api.mch.weixin.qq.com/v3/marketing/favor/media/image-upload\
**请求主体类型**: multipart/form-data\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

图片文件 file message 是 query 将媒体图片进行二进制转换, 得到的媒体图片二进制内容, 在请求 body 中上传此二进制内容。媒体图片只支持 JPG、BMP、PNG 格式, 文件大小不能超过 2M。 +媒体文件元信息 meta Object 是 媒体文件元信息, 使用 json 表示, 包含两个对象: filename、sha256。

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

媒体文件 URL 地址 media_url string(256) 是 微信返回的媒体文件标识 url。
|||https://qpic.cn/xxx

### 返回示例

```json
{
  "media_url": "https://qpic.cn/xxx"
}
```

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
400 PARAM_ERROR 图片文件为空 商户更换文件后, 重新调用
403 REQUEST_BLOCKED 未知图片类型 图片类型必须为 JPG、BMP、PNG<br>图片 meta 信息不一致 请检查 meta 信息是否正确<br>签名信息不匹配 请检查签名信息
