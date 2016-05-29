// const mongoose = require('mongoose');
// // const User = mongoose.model('User');
// // const Quote = mongoose.model('Quote');
const imgHelper = require('../helper/imgHelper.server');
const userHelper = require('../helper/userHelper.server');
const missionHelper = require('../helper/missionHelper.server');
const keepLogic = require('../logic/keepLogic.server');
const wechatAPI = require('../config/wechatAPI');
const co = require('co');
const moment = require('moment');

// 处理任务卡的图片回复
function handleGetMession(message, req, res, next) {
  co(function *(){
    try {
      const user = yield userHelper.getUserInfo(message, req, res, next);
      const { iskeeped, iscontinue } = yield keepLogic.isKeeped(user);
      if (iskeeped) {
        res.reply('今日已获得Grit卡,请及时保存');
        const keeprecord = yield keepLogic.getNewestKeeprecord(user);
        wechatAPI.sendImage(message.FromUserName, keeprecord.keep_card, (err, result) => {
        });
      } else {
        const material = yield missionHelper.getRandomMission(user.level);
        res.reply('领取任务成功，请阅读以下内容，语音回复至订阅号获取今日Grit卡');
        wechatAPI.sendText(message.FromUserName, material.content, (err, result) => {
        });
        wechatAPI.sendVoice(message.FromUserName, material.media_id, (err, result) => {
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
}

function handleGetPlan(message, req, res, next) {
  co(function *(){
    try {
      const [media1,media2] = yield [imgHelper.uploadImgNotDel('material/GHS1.png'),imgHelper.uploadImgNotDel('material/GHS2.png')];
      res.reply({
        type: 'image',
        content: {
          mediaId: media1,
        },
      });
      wechatAPI.sendImage(message.FromUserName, media2, (err, result) => {
      });
    } catch (err) {
      console.log(err);
    }
  });
}


// 处理单击按钮事件
function handleEventClick(message, req, res, next) {
  switch (message.EventKey) {
    case 'GET_PLAN':
      handleGetPlan(message, req, res, next);
      break;
    case 'GET_MISSION':
      handleGetMession(message, req, res, next);
      break;
    case 'GET_RANK':
      res.reply('获取排行榜啦啦');
      break;
    default:
      res.reply('没匹配上啦啦');
  }
}


function handleText(message, req, res, next) {
  // wechatAPI.sendText(message.FromUserName, 'Hello world', (err, result) => {
  //   console.log(result);
  // });
  res.reply('发送消息');
}

function handleEvent(message, req, res, next) {
  switch (message.Event) {
    case 'CLICK':
      handleEventClick(message, req, res, next);
      break;
    case 'subscribe':
      userHelper.getUserInfo(message, req, res, next);
      break;
    default:
      res.reply('没匹配上啦啦');
  }
}


const handleVoice = function (message, req, res, next) {
  co(function* () {
    try {
      const user = yield userHelper.getUserInfo(message, req, res, next);
      const { iskeeped, iscontinue } = yield keepLogic.isKeeped(user);
      if (iskeeped) {
        res.reply('今日已经打卡，明天再来吧');
      } else {
        res.reply('系统正在处理，请稍后');
        const keepuser = yield keepLogic.keepAday(user, iscontinue);
        const file = yield imgHelper.combineKeepCard(keepuser, `material/card${moment().day()}.png`);
        const mediaId = yield imgHelper.uploadImg(file);
        const keeprecord = yield keepLogic.saveKeepCard(user, mediaId);
        wechatAPI.sendText(message.FromUserName, `${user.nickname}已于${moment().format('HH:mm:ss')}打卡成功！请及时保存您的Grit卡，加油！`, (err, result) => {
        });
        wechatAPI.sendImage(message.FromUserName, mediaId, (err, result) => {
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};




module.exports = { handleText, handleEvent, handleVoice };
