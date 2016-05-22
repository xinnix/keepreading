const config = require('./config');
const WechatAPI = require('wechat-api');
const api = new WechatAPI(config.wechatConfig.appid_test, config.wechatConfig.appsecret_test);

module.exports = api;
