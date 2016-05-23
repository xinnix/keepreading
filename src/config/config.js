module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.LIGHTCLASS_DB_URI || 'mongodb://localhost/keepreading',
  wechatConfig: {
    token: 'helloworld',
    appid: 'wx45da6ee61de93b35',
    appsecret: '9f39106cf826916bb0278826b5562e6e',
    appid_test: 'wxf8e294c011cd47e1',
    appsecret_test: '729b99cfef8f39ec492f4fbaf3576b72',
    encodingAESKey: 'e4miuSxQNBIAFYuyi5ky0m1R79oV950ijnjKOtPSXYG',
  },
};
// db: 'mongodb://lightclass:lightclass@120.25.227.156:29017/lightclass',
