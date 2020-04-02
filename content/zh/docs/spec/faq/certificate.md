---
title: '证书相关'
weight: 61
type: 'docs'
---

我们在【商户平台】->【自助服务】中设立了 API 证书及密钥专区，包括了商户证书如何升级，申请，下载等问题的解答。下面是商户技术人员可能关心的一些问题。

## 什么是私钥？什么是证书？

数字签名通常定义了两种运算： 签名和验签。发送者用自己的私钥对消息的哈希值进行签名，接收者用对方的公钥进行验签。因此，在使用数字签名时，需要通信的双方都要事先生成公钥、私钥，并且完成双方的公钥交换。其中，私钥是只能由拥有者使用的不公开密钥，公钥是可以公开的密钥。

由于公钥本身并不含有拥有者的身份信息，使用时无法确认它是真实有效的。所以需要证书认证机构（简称 CA）在核实公钥拥有者的信息后，将公钥拥有者的身份信息（如商户号、公司名称等），公钥、签发者信息、有效期以及扩展信息等进行签名，制作成“证书”。

## 如何获取 API 证书？

[请参考什么是 API 证书？如何获取 API 证书？](http://kf.qq.com/faq/161222NneAJf161222U7fARv.html)​

## 什么是商户证书？什么是平台证书？

- **商户证书**: 是指由商户申请的，包含商户的商户号、公司名称、公钥信息的证书。
- **平台证书**: 是指由微信支付负责申请的，包含微信支付平台标识、公钥信息的证书。

商户在调用 API 时用自身的私钥签名，微信支付使用商户证书中的公钥来验签。微信支付在响应的报文中使用自身的私钥签名，商户使用平台证书中的公钥来验签。

## 为什么微信支付 API v3 要用第三方 CA 的证书？

主要是为了符合监管的要求，保证更高的安全级别。《中华人民共和国电子签名法》、《金融电子认证规范》及《非银行支付机构网络支付业务管理办法》中规定 “电子签名需要第三方认证的，由依法设立的电子认证服务提供者提供认证服务。”，所以需使用第三方 CA 来确保数字证书的唯一性、完整性及交易的不可抵赖性。

什么是证书序列号
每个证书都有一个由 CA 颁发的唯一编号，即证书序列号。

## 如何查看证书序列号？

登陆商户平台`API 安全`->`API 证书`->`查看证书`，可查看商户 API 证书序列号。

商户 API 证书和微信支付平台证书均可以使用第三方的证书[解析工具](https://myssl.com/cert_decode.html)，查看证书内容。或者使用 openssl 命令行工具查看证书序列号。

```sh
$ openssl x509 -in 1900009191_20180326_cert.pem -noout -serial
serial=1DDE55AD98ED71D6EDD4A4A16996DE7B47773A8C
```

## 如何在程序中加载证书?

推荐使用微信支付提供的 SDK。你也可以查看下列编程语言的示例代码。

{{< tabs name="load_private_key" >}}
{{% tab name="Java" %}}

```java
  /**
   * 获取证书。
   *
   * @param filename 证书文件路径  (required)
   * @return X509证书
   */
  public static X509Certificate getCertificate(String filename) throws IOException {
    InputStream fis = new FileInputStream(filename);
    BufferedInputStream bis = new BufferedInputStream(fis);

    try {
      CertificateFactory cf = CertificateFactory.getInstance("X509");
      X509Certificate cert = (X509Certificate) cf.generateCertificate(bis);
      cert.checkValidity();
      return cert;
    } catch (CertificateExpiredException e) {
      throw new RuntimeException("证书已过期", e);
    } catch (CertificateNotYetValidException e) {
      throw new RuntimeException("证书尚未生效", e);
    } catch (CertificateException e) {
      throw new RuntimeException("无效的证书文件", e);
    } finally {
      bis.close();
    }
  }
```

{{% /tab %}}
{{% tab name="PHP" %}}

```php
    /**
     * Read certificate from file
     *
     * @param string    $filepath     PEM encoded X.509 certificate file path
     *
     * @return resource|bool  X.509 certificate resource identifier on success or FALSE on failure
     */
    public static function getCertificate($filepath) {
        return openssl_x509_read(file_get_contents($filepath));
```

{{% /tab %}}
{{< /tabs >}}

## 为什么平台证书只提供 API 下载？

主要是为了确保在更换平台证书时，不影响商户使用微信支付的各种功能。以下场景中，微信支付会更换平台证书：

- 证书到期后，必须更换。（目前是五年）
- 证书到期前，例行更换。（每年一次）

## 为什么平台证书下载接口返回的平台证书需要加密？

主要是为了防御**中间人攻击**。

由于验证应答报文的签名和加密敏感信息时，必须使用到平台证书。平台证书是商户认证微信支付身份时最关键的要素。因此，要通过签名和加密等多重机制来保障商户获取的到平台证书没有被“中间人”篡改。

商户在调用下载接口获取平台证书时，应进行以下四步操作，以保证证书的真实性：

- 使用与平台共享的对称密钥，解密报文中的证书（必须）
- 通过解密得到的证书，来验证报文的签名（必须）
- 使用证书查看工具，核对证书的颁发者为 `Tenpay.com Root CA`。详见[如何区分 API 证书的类型？](如何区分API证书的类型？)（强烈推荐）
- 通过证书信任链验证平台证书（强烈推荐）

## 如何通过证书信任链验证平台证书？

下面介绍如何使用 openssl 工具，通过证书信任链验证平台证书。

首先，从微信支付商户平台下载平台证书信任链 [CertTrustChain.p7b](https://wx.gtimg.com/mch/files/CertTrustChain.p7b)，并将它转换为 pem 证书格式。

```sh
openssl pkcs7 -print_certs -in CertTrustChain.p7b -inform der -out CertTrustChain.pem
```

然后，`-CAfile file` 指定受信任的证书，验证下载的平台证书

```sh
openssl verify -verbose -CAfile ./CertTrustChain.pem ./WeChatPayPlatform.pem
```

## 为什么请求返回“缺少平台证书序列号”

商户上送敏感信息时使用了微信支付平台公钥加密。为了能使用正确的密钥解密，微信支付要求商户在请求的 HTTP 头部中包括证书序列号，以声明加密所用的密钥对和平台证书。详见这里的说明。
