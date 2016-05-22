const wechatAPI = require('../config/wechatAPI');
const mongoose = require('mongoose');
const User = mongoose.model('User');


function getUserInfo(message) {
  return new Promise((resolve, reject) => {
    const openid = message.FromUserName;
    User.find({ openid }).exec()
    .then((users) => {
      if (users.length === 0) {
        wechatAPI.getUser(message.FromUserName, (err, userInfo) => {
          const user = new User(userInfo);
          user.save(err1 => {
            if (err1) reject(err1);
            resolve(user);
          });
        });
      } else {
        resolve(users[0]);
      }
    }).catch(err => {
      reject(err);
    });
  });
}


function getAllUserInfo() {
  return new Promise((resolve, reject) => {
    User.find().exec()
    .then((users) => {
      resolve(users);
    })
    .catch(err => {
      reject(err);
    });
  });
}


module.exports = {
  getUserInfo,
  getAllUserInfo,
};
