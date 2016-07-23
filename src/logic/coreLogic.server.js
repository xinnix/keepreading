const moment = require('moment');
const mongoose = require('mongoose');
const co = require('co');
const wechatAPI = require('../config/wechatAPI').api;

const userHelper = require('../helper/userHelper.server');
const keeprecordHelper = require('../helper/keeprecordHelper.server');
const taskHelper = require('../helper/taskHelper.server');
const imgHelper = require('../helper/imgHelper.server');
const cardHelper = require('../helper/cardHelper.server');

const KeepRecord = mongoose.model('KeepRecord');

const keepLogic = require('./keepLogic.server');
// 接收用户回复答案后生成 keeprecord 并将状态置为pending
function receiveAnswer(user) {
  keeprecordHelper
  .getNewestKeeprecord(user)
  .then((keeprecord) => {
    if (keeprecord === null) {
      const keepRecord = new KeepRecord({ user: user._id });
      keepRecord.save((err, result) => {
        if (err) console.log(err);
      });
      return;
    }
    const theday = moment(keeprecord.created);
    const iskeeped = theday.isSame(Date.now(), 'day');
    if (iskeeped) {
      keeprecord.created = Date.now();
      keeprecord.save();
    } else {
      const keepRecord = new KeepRecord({ user: user._id });
      keepRecord.save((err, result) => {
        if (err) console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
}

/*
 *点击领取任务按钮,获得相应等级的任务，若已完成当天任务则提示。
 *todo : 根据领取任务难度不同 发送不同难度的逻辑
 */
function sendTask(message, req, res, next) {
  co(function *() {
    try {
      const user = yield userHelper.getUserInfoByOpenId(message.FromUserName);
      const { iskeeped, iscontinue } = yield keepLogic.isKeeped(user);
      if (iskeeped) {
        res.reply('今日已获得Grit卡,请及时保存');
        const keeprecord = yield keeprecordHelper.getNewestKeeprecord(user);
        wechatAPI.sendImage(message.FromUserName, keeprecord.keep_card, (err, result) => {
        });
      } else {
        const task = yield taskHelper.getRandomTask(user.level);
        res.reply('领取任务成功，请阅读以下内容，语音回复至订阅号获取今日Grit卡');
        wechatAPI.sendText(message.FromUserName, task.content, (err, result) => {
        });
        wechatAPI.sendVoice(message.FromUserName, task.media_id, (err, result) => {
        });
      }
    } catch (err) {
      console.log(err);
      res.reply('系统出错，稍后尝试！')
    }
  });
}

// 延迟回复生成的grit卡
function sendGritcard(user, iscontinue) {
  co(function* () {
    try {
      const keepuser = yield keepLogic.keepAday(user, iscontinue);
      const background = yield cardHelper.getRandomCard(user.level);
      const file = yield imgHelper.combineKeepCard(keepuser, background.filepath);
      const mediaId = yield imgHelper.uploadImg(file);
      yield keeprecordHelper.saveGritcardID(user, mediaId);
      wechatAPI.sendText(user.openid, `审核通过，${user.nickname}已于${moment().format('HH:mm:ss')}打卡成功！请及时保存您的Grit卡，加油！`, (err, result) => {
      });
      wechatAPI.sendImage(user.openid, mediaId, (err, result) => {
      });
    } catch (err) {
      console.log(err);
    }
  });
}

//

// 回复帮助信息
// todo 改为回复媒体消息或者进入网页
function sendHelpMessage(message, req, res, next) {
  co(function *(){
    try {
      const [media1, media2] = yield [imgHelper.uploadImgNotDel('material/GHS1.png'),imgHelper.uploadImgNotDel('material/GHS2.png')];
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

module.exports = {
  sendTask,
  receiveAnswer,
  sendGritcard,
  sendHelpMessage,
};
