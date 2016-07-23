const mongoose = require('mongoose');
const User = mongoose.model('User');
const moment = require('moment');
const keeprecordHelper = require('../helper/keeprecordHelper.server');

function isKeeped(user) {
  return new Promise((resolve, reject) => {
    keeprecordHelper
    .getNewestKeeprecord(user)
    .then(keeprecord => {
      if (keeprecord === null) resolve({ iskeeped: false, iscontinue: false, status: '' });
      const theday = moment(keeprecord.created);
      const status = keeprecord.status;
      const iskeeped = theday.isSame(Date.now(), 'day');
      const iscontinue = theday.add(1, 'days').isSame(Date.now(), 'day');
      resolve({ iskeeped, iscontinue, status });
    })
    .catch(err => {
      reject(err);
    });
  });
}

function keepAday(user, iscontinue) {
  return new Promise((resolve, reject) => {
    keeprecordHelper.
    getNewestKeeprecord(user)
    .then((keeprecord) => {
      keeprecord.status = 'complete';
      keeprecord.save();
    }).catch((err) => {
      console.log(err);
    });

    User.findOne({ _id: user._id })
    .then(userk => {
      userk.keepdays += 1;
      userk.score += getNewScore(userk);
      const level = getNewLevel(userk);
      userk.level = level;
      if (iscontinue){
        userk.cont_keepdays += 1;
        if(userk.cont_keepdays > userk.max_keepdays) userk.max_keepdays = userk.cont_keepdays;
      }else{
        userk.cont_keepdays = 1;
      }
      return userk.save();
    })
    .then((userk) => {
      resolve(userk);
    })
    .catch(err => {
      reject(err);
    });
  });
}

// 根据用户坚持天数获取用户等级
function getNewLevel(user) {
  const maxlevel = 10;
  const levelDay = [21, 31, 46, 66, 91, 121, 156, 196, 241, 291];
  for (const key in levelDay) {
    if (user.keepdays < levelDay[key]) return Number(key) + 1; //最底等级为R1
  }
  return maxlevel;
}

function getNewScore(user) {
  const scoreDay = [7, 14, 21, 30, 60, 100, 150, 210, 280, 365];
  const revenue = [5, 15, 30, 50, 75, 105, 140, 175, 215, 300];
  for (const key in scoreDay) {
    if (user.cont_keepdays === scoreDay[key]) return revenue[key];
  }
  return 1;
}

module.exports = {
  keepAday,
  isKeeped,
};
