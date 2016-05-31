module.exports = {
  port: process.env.KKEP_PORT || 3000,
  db: process.env.KEEP_DB_URI || 'mongodb://localhost/keepreading',
  wechatConfig: {
    token: 'helloworld',
    appid: 'wxb3762a929cf9e070',
    appsecret: '0a607b7dc2ff4fa027b8594a99f9e086',
    appid_test: 'wxf8e294c011cd47e1',
    appsecret_test: '729b99cfef8f39ec492f4fbaf3576b72',
    encodingAESKey: 'e4miuSxQNBIAFYuyi5ky0m1R79oV950ijnjKOtPSXYG',
  },
};
// db: 'mongodb://lightclass:lightclass@120.25.227.156:29017/lightclass',
