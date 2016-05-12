const config = require('./config');
const WechatAPI = require('wechat-api');
const api = new WechatAPI(config.appid_test, config.appsecret_test);

module.exports = api;
