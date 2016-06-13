const config = require('./config');
const fs = require('fs');
const WechatAPI = require('wechat-api');
const OAuth = require('wechat-oauth');

let appid = config.wechatConfig.appid_test;
let appsecret = config.wechatConfig.appsecret_test;

if (process.env.NODE_ENV === 'production') {
  appid = config.wechatConfig.appid;
  appsecret = config.wechatConfig.appsecret;
}

const webapi = new OAuth(appid, appsecret);
const api = new WechatAPI(appid, appsecret);
// const api = new WechatAPI(config.wechatConfig.appid_test, config.wechatConfig.appsecret_test, callback => {
//   // 传入一个获取全局token的方法
//   fs.readFile('access_token.txt', 'utf8', (err, txt) => {
//     if (err) {return callback(err);}
//     callback(null, JSON.parse(txt));
//   },
//   (token, callback1) => {
//   // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//     fs.writeFile('access_token.txt', JSON.stringify(token), callback1);
//   }
// );
// });

module.exports = {
  api,
  webapi,
};
