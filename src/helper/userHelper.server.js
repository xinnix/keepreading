const wechatAPI = require('../config/wechatAPI');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// 当接收到用户发来的消息时，判断数据库中是否有用户信息，若无，则根据openid从微信服务器获取
function getUserInfoByOpenId(openid) {
  return new Promise((resolve, reject) => {
    User.find({ openid }).exec()
    .then((users) => {
      if (users.length === 0) {
        wechatAPI.getUser(openid, (err, userInfo) => {
          const user = new User(userInfo);
          user.save(err1 => {
            if (err1) reject(err1);
            resolve(user);
          });
        });
      } else {
        resolve(users[0]);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
}

function getAllUserRank() {
  return new Promise((resolve, reject) => {
    User.find()
    .sort('-keepdays')
    .exec()
    .then((users) => {
      resolve(users);
    })
    .catch(err => {
      reject(err);
    });
  });
}


module.exports = {
  getAllUserRank,
  getUserInfoByOpenId,
};
