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
// let appid = 1;
// let appsecret = 1;
//
// if (process.env.NODE_ENV === 'production') {
//   appid = 2;
//   appsecret = 2;
// }
//
// console.log(appid, appsecret);
// function abc(keepdays){
//   const levelDay = [21, 31, 46, 66, 91, 121, 156, 196, 241, 291];
//   for (let key in levelDay){
//     if( keepdays < levelDay[key]){
//       return key;
//     }
//   }
// }
function getNewScore(cont_keepdays) {
  const scoreDay = [7, 14, 21, 30, 60, 100, 150, 210, 280, 365];
  const revenue = [5, 15, 30 ,50, 75, 105, 140, 175, 215, 300];
  for (const key in scoreDay) {
    if (cont_keepdays == scoreDay[key]) return revenue[key];
  }
  return 1;
}



console.log(getNewScore(280));
