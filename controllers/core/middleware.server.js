const mongoose = require('mongoose');
const User = mongoose.model('User');
const wechatAPI = require('../../config/wechatAPI');

function getUserInfoMiddleware(message, req, res, next){
  const openid = message.FromUserName;
  User.find({openid:openid}, function(err,result){
    if(err){
      console.log(err);
      res.reply('数据库读取有误');
    }
    if (result.length === 0) {
      wechatAPI.getUser(message.FromUserName, function(err, userInfo){
        const user = new User(userInfo);
        user.save(err1 => {
          req.user = user;
          console.log(req.user);
          next();
        })
      });
    } else {
      req.user = result[0];
      console.log(req.user);
      next();
    }
  })
}


module.exports = {
  getUserInfoMiddleware,
}
