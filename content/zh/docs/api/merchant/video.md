---
title: '视频上传API'
linkTitle: '视频上传'
weight: 1
description: >
  通过视频上传接口获取视频MediaID
type: 'docs'
---

视频上传 API
最新更新时间: 2019-10-23 版本说明

部分微信支付业务指定商户需要使用视频上传 API 来上报视频信息, 从而获得必传参数的值: 视频 MediaID 。

开发指引
视频上传步骤: 1.创建一个 POST 的方法请求/video_upload URI

例如: POST https://api.mch.weixin.qq.com/v3/merchant/media/video_upload HTTP/1.1

2.将文件的数据添加到请求主体:

2.1 视频文件 file 参数的获取方式说明:
媒体视频二进制内容, 放在请求 http 的 body 中。

2.2 媒体文件元信息 meta 参数的获取方式说明:
媒体文件元信息, 使用 json 表示, 包含两个对象: filename、sha256。
● filename 参数获取方式说明:
商户上传的媒体视频的名称, 商户自定义, 必须以 avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb 为后缀。
● sha256 参数获取方式说明:
视频文件的文件摘要, 即对视频文件的二进制内容进行 sha256 计算得到的值。

2.3 签名计算说明:
https://wechatpay-api.gitbook.io/wechatpay-api-v3/qian-ming-zhi-nan-1/qian-ming-sheng-cheng
参与签名计算的请求主体为 meta 的 json 串:
{ "filename": "filea.jpg", "sha256": "hjkahkjsjkfsjk78687dhjahdajhk" }

待签名串示例:

POST
/v3/merchant/media/video_upload
1566987169 //时间戳
12ced2db6f0193dda91ba86224ea1cd8 //随机数
{"filename":" file_test.mp4 ","sha256":" hjkahkjsjkfsjk78687dhjahdajhk "}

3.添加 HTTP 头:

Content-Type: multipart/form-data.设置为要上载的对象的 MIME 媒体类型。
Authorization: WECHATPAY2-SHA256-RSA2048 mchid="1900231671",nonce_str="PCHK6HSOEDTACETP6P3AL7DWPHTBKIAT",
timestamp="1567067659",serial_no="1FB89742D19F2BD30B69948D16DECA0FCB4481EB",
signature="PB6M7+3JL7TSCl5zqD1sdWVypOIEQsD4dgOU+vPiVM6GMRo2qYSWKf8u46i9ZJFhyZTBdZ7SFR+BjDZh689hFgN8LZL+QWTvq3cse/FEUFYyOLN7L/2IZX4GA4cWInuJ2MpOhZRMpm+emrcn42gTMKAPNQ7dBLO7ux6MoSuQp69PW+p1ogmkER68exTVUXYqA5P3vITlWNr++RDy2+ExvB7qVISOKW0vBkxUxN9e7hwUbDwGln170ZXomoO1KpQSbw3f1uWUCx/IlWJhJIun7rUMtVT+kfijNUqcILtSfE4hWKKVaZn9j5CX8M7aKbbDOFy3SvbSJ3WQgRnRbgog5w=="
Content-Type: multipart/form-data;boundary="boundary"

4.添加 body:

// 以下为 body 的内容
--boundary // boundary 为商户自定义的一个字符串
Content-Disposition: form-data; name="meta";
Content-Type: application/json
//此处必须有一个空行
{ "filename": "file_test.mp4", "sha256": " hjkahkjsjkfsjk78687dhjahdajhk " }
--boundary
Content-Disposition: form-data; name="file"; filename="file_test.mp4";
Content-Type: video/mp4
//此处必须有一个空行
pic1 //pic1 即为媒体视频的二进制内容
--boundary--
说明: 请求包体每行结尾都需要包含\r\n(空行也需要）

5.发送请求

POST /v3/merchant/media/video_upload HTTP/1.1
Host: api.mch.weixin.qq.com
Authorization: WECHATPAY2-SHA256-RSA2048 mchid="1900231671",nonce_str="PCHK6HSOEDTACETP6P3AL7DWPHTBKIAT",timestamp="1567067659",serial_no="1FB89742D19F2BD30B69948D16DECA0FCB4481EB",signature="PB6M7+3JL7TSCl5zqD1sdWVypOIEQsD4dgOU+vPiVM6GMRo2qYSWKf8u46i9ZJFhyZTBdZ7SFR+BjDZh689hFgN8LZL+QWTvq3cse/FEUFYyOLN7L/2IZX4GA4cWInuJ2MpOhZRMpm+emrcn42gTMKAPNQ7dBLO7ux6MoSuQp69PW+p1ogmkER68exTVUXYqA5P3vITlWNr++RDy2+ExvB7qVISOKW0vBkxUxN9e7hwUbDwGln170ZXomoO1KpQSbw3f1uWUCx/IlWJhJIun7rUMtVT+kfijNUqcILtSfE4hWKKVaZn9j5CX8M7aKbbDOFy3SvbSJ3WQgRnRbgog5w=="
Content-Type: multipart/form-data;boundary=boundary

--boundary
Content-Disposition: form-data; name="meta";
Content-Type: application/json

{ "filename": "file_test.mp4", "sha256": " hjkahkjsjkfsjk78687dhjahdajhk " }
--boundary
Content-Disposition: form-data; name="file"; filename="file_test.mp4";
Content-Type: video/mp4

pic1
--boundary--## 接口说明
**适用对象**: 电商平台\
**请求 URL**: : https://api.mch.weixin.qq.com/v3/merchant/media/video_upload

请求主体类型: multipart/form-data\
**请求方式**: POST\
**接口规则**: https://wechatpay-api.gitbook.io/wechatpay-api-v3

`path` 指该参数需在请求 URL 传参\
`query` 指该参数需在请求 JSON 传参

## 请求参数

变量 |类型 |必填 |参数名/描述/示例值

视频文件 file message 是 query 将媒体视频进行二进制转换, 得到的媒体视频二进制内容, 在请求 body 中上传此二进制内容。媒体视频只支持 avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb 格式, 文件大小不能超过 5M。 +媒体文件元信息 meta Object 是 媒体文件元信息, 使用 json 表示, 包含两个对象: filename、sha256。

## 返回参数

变量 |类型 |必填 |参数名/描述/示例值

媒体文件标识 Id media_id string(512) 是 微信返回的媒体文件标识 Id。
|||6uqyGjGrCf2GtyXP8bxrbuH9-aAoTjH-rKeSl3Lf4_So6kdkQu4w8BYVP3bzLtvR38lxt4PjtCDXsQpzqge_hQEovHzOhsLleGFQVRF-U_0

### 返回示例

```json
{
"media_id": "H1ihR9JUtVj-J7CJqBUY5ZOrG_Je75H-rKhTG7FUmg9sxNTbRN54dFiUHnhg
rBQ6EKeHoGcHTJMHn5TAuLVjHUQDBInSWXcIHYXOeRa2OHA"
}

## 错误码<sub>公共错误码</sub>

|状态码 |错误码 |描述| 解决方案
|-
500 SYSTEMERROR 系统错误 系统异常, 请使用相同参数稍后重新调用
SYSTEMERROR 文件系统错误, 请稍后重试 文件系统异常, 请使用相同参数稍后重新调用
400 PARAM_ERROR 视频文件名称不正确, 请检查后重新提交 视频文件名称不正确, 只支持 avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb, 请使用正确视频文件重新调用
PARAM_ERROR 文件二进制内容不是视频, 请检查后重新提交 上传文件二进制内容头部不正确, 只支持 avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb, 请使用正确视频文件重新调用
PARAM_ERROR 视频 sha256 值有误, 请检查后重新提交 视频 sha256 值计算有误, 请检查算法, 重新计算后提交
PARAM_ERROR 文件大小不能超过 5M, 请检查后重新提交 商户更换文件或者对视频进行压缩后, 重新调用
PARAM_ERROR 文件为空, 请检查后重新提交 商户更换文件后, 重新调用
429 FREQUENCY_LIMIT_EXCEED 操作过快, 请稍后重试 请商户降低每秒调用频率
FREQUENCY_LIMIT_EXCEED 当天上传文件数已达上限 请商户降低每天调用频率
403 NO_AUTH 商户权限异常 请确认是否已经开通相关权限
```
