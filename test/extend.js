const got = require('got');
const package = require('../package');

const controlRedirects = got.extend({
  handlers: [
    (options, next) => {
      const promiseOrStream = next(options);
      return promiseOrStream.on('redirect', response => {
        const host = new URL(resp.url).host;
        if (options.allowedHosts && !options.allowedHosts.includes(host)) {
          promiseOrStream.cancel(`Redirection to ${host} is not allowed`);
        }
      });
    },
  ],
});
const limitDownloadUpload = got.extend({
  handlers: [
    (options, next) => {
      let promiseOrStream = next(options);
      if (typeof options.downloadLimit === 'number') {
        promiseOrStream.on('downloadProgress', progress => {
          if (
            progress.transferred > options.downloadLimit &&
            progress.percent !== 1
          ) {
            promiseOrStream.cancel(
              `Exceeded the download limit of ${options.downloadLimit} bytes`,
            );
          }
        });
      }

      if (typeof options.uploadLimit === 'number') {
        promiseOrStream.on('uploadProgress', progress => {
          if (
            progress.transferred > options.uploadLimit &&
            progress.percent !== 1
          ) {
            promiseOrStream.cancel(
              `Exceeded the upload limit of ${options.uploadLimit} bytes`,
            );
          }
        });
      }

      return promiseOrStream;
    },
  ],
});
const noUserAgent = got.extend({
  headers: {
    'user-agent': undefined,
  },
});
const httpbin = got.extend({
  prefixUrl: 'https://httpbin.org/',
});
const crypto = require('crypto');

const getMessageSignature = (data, secret) =>
  crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex')
    .toUpperCase();
const signRequest = got.extend({
  hooks: {
    beforeRequest: [
      options => {
        options.headers['sign'] = getMessageSignature(
          options.body || '',
          process.env.SECRET,
        );
      },
    ],
  },
});

const merged = got.extend(
  controlRedirects,
  limitDownloadUpload,
  httpbin,
  signRequest,
  noUserAgent,
);

(async () => {
  // 有没有'user-agent'头 :)
  await merged('/');
  /* HTTP Request =>
   * GET / HTTP/1.1
   * accept-encoding: gzip, deflate, br
   * sign: F9E66E179B6747AE54108F82F8ADE8B3C25D76FD30AFDE6C395822C530196169
   * Host: httpbin.org
   * Connection: close
   */

  const MEGABYTE = 1048576;
  await merged('http://ipv4.download.thinkbroadband.com/5MB.zip', {
    downloadLimit: MEGABYTE,
    prefixUrl: '',
  });
  // CancelError: 超过1048576个字节的下载限制

  await merged('https://jigsaw.w3.org/HTTP/300/301.html', {
    allowedHosts: ['google.com'],
    prefixUrl: '',
  });
  // CancelError: 不允许重定向到jigsaw.w3.org
})();
