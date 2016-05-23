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
  missionHelper.getMission().then((materials) => {
    res.reply(materials[0].content);
    wechatAPI.sendVoice(message.FromUserName, materials[0].media_id, (err, result) => {
    });
  }).catch(err => {
    console.log(err);
  });
}


// 处理单击按钮事件
function handleEventClick(message, req, res, next) {
  switch (message.EventKey) {
    case 'GET_PLAN':
      res.reply('获取计划啦啦');
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
        res.reply('您今天已经打卡');
      } else {
        res.reply('您的奖励卡正在制作中，请稍后');
        const keepuser = yield keepLogic.keepAday(user, iscontinue);
        const file = yield imgHelper.combineKeepCard(keepuser, `material/card${moment().day()}.png`);
        const mediaId = yield imgHelper.uploadImg(file);
        wechatAPI.sendImage(message.FromUserName, mediaId, (err, result) => {
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};




module.exports = { handleText, handleEvent, handleVoice };
