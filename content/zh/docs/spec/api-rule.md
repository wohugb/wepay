---
title: '接口规则'
weight: 2
description: >
  微信支付 API v3 是遵循 RESTful 风格设计的 HTTP API。
type: 'docs'
---

## 基本信息

所有的 API 请求必须使用 HTTPS。

{{% alert title="" color="warning" %}}
:exclamation: 请求时不应忽略服务器证书验证的错误, 避免被恶意劫持
{{% /alert %}}

## 数据格式

微信支付 API v3 使用 JSON 作为消息体的数据交换格式。请求须设置 HTTP 头部:

```http
Content-Type: application/json
Accept: application/json
```

图片上传 API 除外。

> :exclamation: API 应答中的数据有可能包含商户传入的数据, 即可能是未经检查的用户输入内容。为了避免 XSS(Cross-site scripting）攻击, 请调用方在使用应答数据前根据场景做适当的转义或者过滤。

## 参数兼容性

- 请求是否成功, 与请求参数的顺序无关
- 请求是否成功, 与请求 JSON 中的键值对出现的顺序无关
- 处理应答时, 不应假设应答 JSON 中的键值对出现的顺序
- 新的 API 版本可能在请求或应答中加入新的参数或者 JSON 的键值对
- 新的 API 版本不会去除请求和应答中已经存在的必填参数或者 JSON 的键值对
- 当请求或应答中的 JSON 键值对的值为空(null）时, 可以省略

## 字符集

微信支付 API v3 仅支持 **UTF-8** 字符编码的一个子集: 使用一至三个字节编码的字符。也就是说, 不支持 Unicode 辅助平面中的四至六字节编码的字符。

## 日期格式

所有的日期对象, 使用 [ISO 8601](https://tools.ietf.org/html/rfc3339) 所定义的格式。示例:

```
YYYY-MM-DDTHH:mm:ss.SSSZ
YYYY-MM-DDTHH:mm:ssZ
YYYY-MM-DDTHH:mm:ss.SSS+08:00
YYYY-MM-DDTHH:mm:ss+08:00
```

## 请求的唯一标示

微信支付给每个接收到的请求分配了一个唯一标示。请求的唯一标示包含在应答的 HTTP 头 `Request-Id` 中。

**当需要微信支付帮助时, 请提供请求的唯一标示, 以便我们更快的定位到具体的请求。**

## 错误信息

微信支付 API v3 使用 HTTP 状态码来表示请求处理的结果。

- 处理成功的请求, 如果有应答的消息体将返回 200, 若没有应答的消息体将返回 204。
- 已经被成功接受待处理的请求, 将返回 202。
- 请求处理失败时, 如缺少必要的入参、支付时余额不足, 将会返回 4xx 范围内的错误码。
- 请求处理时发生了微信支付侧的服务系统错误, 将返回 500/501/503 的状态码。这种情况比较少见。

## HTTP 状态码

常见的 HTTP 状态码见下表。

| 状态码                    | 错误类型              | 一般的解决方案                                | 典型错误码示例      |
| ------------------------- | --------------------- | --------------------------------------------- | ------------------- |
| 200 - OK                  | 处理成功              |                                               |                     |
| 204 - No Content          | 处理成功, 无返回 Body |                                               |                     |
| 400 - Bad Request         | 协议或者参数非法      | 请根据接口返回的详细信息检查您的程序          | PARAM_ERROR         |
| 401 - Unauthorized        | 签名验证失败          | 请检查签名参数和方法是否都符合签名算法要求    | SIGN_ERROR          |
| 403 - Forbidden           | 权限异常              | 请开通商户号相关权限。请联系产品或商务申请    | NO_AUTH             |
| 404 - Not Found           | 请求的资源不存在      | 请商户检查需要查询的 id 或者请求 URL 是否正确 | ORDER_NOT_EXIST     |
| 429 - Too Many Requests   | 请求超过频率限制      | 请求未受理, 请降低频率后重试                  | RATE_LIMITED        |
| 500 - Server Error        | 系统错误              | 按具体接口的错误指引进行重试                  | SYSTEM_ERROR        |
| 502 - Bad Gateway         | 服务下线, 暂时不可用  | 请求无法处理, 请稍后重试                      | SERVICE_UNAVAILABLE |
| 503 - Service Unavailable | 服务不可用, 过载保护  | 请求无法处理, 请稍后重试                      | SERVICE_UNAVAILABLE |

## 错误码和错误提示

当请求处理失败时, 除了 HTTP 状态码表示错误之外, API 将在消息体返回错误相应说明具体的错误原因。

- `code`: 详细错误码
- `message`: 错误描述, 使用易理解的文字表示错误的原因。
- `field`: 指示错误参数的位置。当错误参数位于请求 body 的 JSON 时, 填写指向参数的 JSON Pointer。当错误参数位于请求的 url 或者 querystring 时, 填写参数的变量名。
- `value`: 错误的值
- `issue`: 具体错误原因

```json
{
  "code": "PARAM_ERROR",
  "message": "参数错误",
  "detail": {
    "field": "/amount/currency",
    "value": "XYZ",
    "issue": "Currency code is invalid",
    "location": "body"
  }
}
```

## User Agent

HTTP 协议要求发起请求的客户端在每一次请求中都使用 HTTP 头 `User-Agent` 来标示自己。微信支付建议调用方选用以下两种方式的一种:

1. 使用 HTTP 客户端默认的 `User-Agent`。
2. 遵循 HTTP 协议, 使用自身系统和应用的名称和版本等信息, 组成自己独有的 `User-Agent`。

微信支付 API v3 很可能会拒绝处理无 `User-Agent` 的请求。

## 应答的语种

微信支付 API v3 允许调用方声明应答中的错误描述使用的自然语言语种。如果有需要, 设置请求的 HTTP 头 `Accept-Language`。目前支持:

- en
- zh-CN
- zh-HK
- zh-TW

当不设置或者值不支持时, 将使用简体中文(zh-CN）。
