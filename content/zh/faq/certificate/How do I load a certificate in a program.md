---
title: '如何在程序中加载证书?'
weight: 9
---

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
