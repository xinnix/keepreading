const mongoose = require('mongoose');
const User = mongoose.model('User');
const KeepRecord = mongoose.model('KeepRecord');
const Card = mongoose.model('Card');
const moment = require('moment');

function getRandomCard() {
  return new Promise((resolve, reject) => {
    Card.count().exec((err, count) => {
      if (err) reject(err);
      const random = Math.floor(Math.random() * count);
      Card.findOne().skip(random).exec().then(result => {
        resolve(result);
      }).catch(err1 => {
        reject(err1);
      });
    });
  });
}


function isKeeped(user) {
  return new Promise((resolve, reject) => {
    KeepRecord
    .find({ user })
    .sort('-created')
    .exec()
    .then(keeprecords => {
      if (keeprecords.length === 0) resolve(false, true);
      const theday = moment(keeprecords[0].created);
      const iskeeped = theday.isSame(Date.now(), 'day');
      const iscontinue = theday.add(1, 'days').isSame(Date.now(), 'day');
      resolve({ iskeeped, iscontinue });
    }).catch(err => {
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

function  saveKeepCard(user,mediaId){
  return new Promise((resolve, reject) => {
    KeepRecord
    .find({ user: user._id })
    .sort('-created')
    .exec()
    .then(keeprecords => {
      keeprecords[0].keep_card = mediaId;
      keeprecords[0].save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
}

function getNewestKeeprecord(user){
  return new Promise((resolve, reject) => {
    KeepRecord
    .find({ user: user._id })
    .sort('-created')
    .exec()
    .then(keeprecords => {
      resolve(keeprecords[0]);
    }).catch(err => {
      reject(err);
    });
  });
}



function keepAday(user, iscontinue) {
  return new Promise((resolve, reject) => {
    const keepRecord = new KeepRecord({ user: user._id });
    keepRecord.save((err, result) => {
      if (err) reject(err);
    });

    User.findOne({ _id: user._id })
    .then(userk => {
      userk.keepdays += 1;
      userk.score += getNewScore(userk);
      const level = getNewLevel(userk);
      userk.level = `R${level}`;
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

module.exports = {
  keepAday,
  isKeeped,
  saveKeepCard,
  getNewestKeeprecord,
  getRandomCard,
};
