const userHelper = require('../helper/userHelper.server');
const coreLogic = require('../logic/coreLogic.server');
const keepLogic = require('../logic/keepLogic.server');
const co = require('co');
const config = require('../config/config');

// 处理单击按钮事件
function handleEventClick(message, req, res, next) {
  switch (message.EventKey) {
    case 'GET_HELP':
      coreLogic.sendHelpMessage(message, req, res, next);
      break;
    case 'GET_TASK_EASY':
    case 'GET_TASK_NORMAL':
    case 'GET_TASK_HARD':
      coreLogic.sendTask(message, req, res, next);
      break;
    case 'GET_RANK':
      res.reply('获取排行榜啦啦');
      break;
    default:
      res.reply('没匹配上啦啦');
  }
}
// function handleText(message, req, res, next) {
//   // wechatAPI.sendText(message.FromUserName, 'Hello world', (err, result) => {
//   //   console.log(result);
//   // });
//   res.reply2CustomerService(message.ToUserName, message.FromUserName);
// }

function handleEvent(message, req, res, next) {
  switch (message.Event) {
    case 'CLICK':
      handleEventClick(message, req, res, next);
      break;
    case 'subscribe':
      userHelper.getUserInfoByOpenId(message.FromUserName);
      break;
    default:
      res.reply('没匹配上啦啦');
  }
}

function handleVoice(message, req, res, next) {
  co(function* () {
    try {
      const user = yield userHelper.getUserInfoByOpenId(message.FromUserName);
      const { iskeeped, iscontinue, status } = yield keepLogic.isKeeped(user);
      if (iskeeped && (status === 'complete')) {
        res.reply('今日已经打卡，明天再来吧');
      } else if (iskeeped && (status === 'pending')) {
        coreLogic.receiveAnswer(user);
        res.reply('您的回答已更新，请更待管理员审核。');
      } else {
        coreLogic.receiveAnswer(user);
        res.reply('您的回复正在等待管理员审核，如果您对自己的回答不满意，可以重新上传，我们将审核最新的答案。');
        setTimeout(() => { coreLogic.sendGritcard(user, iscontinue); }, config.logic.delayTime);// 暂时设置为10分钟
      }
    } catch (err) {
      console.log(err);
    }
  });
}

function handleImage(message, req, res, next) {
}


module.exports = {
  handleEvent,
  handleVoice,
  handleImage,
};
