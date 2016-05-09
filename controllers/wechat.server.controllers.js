// const mongoose = require('mongoose');
// // const User = mongoose.model('User');
// // const Quote = mongoose.model('Quote');
const handleText = function(message, req, res, next){
  res.reply('呵呵，你发了文字信息');
}

const handleEvent = function(message, req, res, next){
  switch (message.EventKey) {
    case 'GET_PLAN':
      res.reply('获取计划啦啦');
      break;
    case 'GET_MISSION':
      res.reply('获取今天任务啦啦');

      break;
    case 'GET_RANK':
      res.reply('获取排行榜啦啦');
      break;
    default:
      res.reply('没匹配上啦啦');
  }
}
const handleVoice = function(message, req, res, next){
  res.reply('发送了语音哦');
}

module.exports = {
  handleText,
  handleEvent,
  handleVoice,
};
