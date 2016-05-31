// const wechatAPI = require('../src/config/wechatAPI');
//
// wechatAPI.addKfAccount('xinnix@gh_f781e89105fa', 'xinnix', '123456', (err, result) => {
//   if (err) console.log('err', err);
//   console.log('result', result);
// });
// const imghelper = require('../src/helper/imghelper.server');
// require('../src/models/material.server.model.js');
// const missionHelper = require('../src/helper/missionHelper.server');
// const user =
// { keepdays: 0,
//   max_keepdays: 0,
//   level: 'R1',
//   score: 100,
//   __v: 0,
//   tagid_list: '1970-01-01T00:00:00.000Z',
//   groupid: '0',
//   headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELwS3mJZzYlE2atSHTmuQfTs2yK8pTrUaWN803uypuMJ9W2Rx53nW9X9BZiaAeibXVCW6hYh20kEt9A/0',
//   city: 'Xi\'an',
//   sex: '1',
//   nickname: 'xinnix.designer.coder.loser',
//   openid: 'o3fzZsw_3ddwGDhlUufduKpWdUwg',
//   _id: '5739d4c685b248ce575e36a8' };
// imghelper.combineKeepCard(user, 'material/card1.png')
// .then(file => {
//   console.log(file);
// });
// missionHelper.getRandomMission('R1');
let appid = 1;
let appsecret = 1;

if (process.env.NODE_ENV === 'production') {
  appid = 2;
  appsecret = 2;
}

console.log(appid, appsecret);
