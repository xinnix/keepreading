const mongoose = require('mongoose');
const User = mongoose.model('User');
const KeepRecord = mongoose.model('KeepRecord');
const Card = mongoose.model('Card');
const moment = require('moment');

function getRandomCard(level) {
  return new Promise((resolve, reject) => {
    Card.count()
    .where('level')
    .lte(level)
    .exec((err, count) => {
      if (err) reject(err);
      const random = Math.floor(Math.random() * count);
      Card.findOne()
      .where('level')
      .lte(level)
      .skip(random)
      .exec()
      .then(result => {
        resolve(result);
      })
      .catch(err1 => {
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
      if (keeprecords.length === 0) resolve({ iskeeped: false, iscontinue: false, status: '' });
      const theday = moment(keeprecords[0].created);
      const status = keeprecords[0].status;
      const iskeeped = theday.isSame(Date.now(), 'day');
      const iscontinue = theday.add(1, 'days').isSame(Date.now(), 'day');
      resolve({ iskeeped, iscontinue, status });
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

function receiveAnswer(user){
  getNewestKeeprecord(user)
  .then((keeprecord) => {
    const theday = moment(keeprecord.created);
    const iskeeped = theday.isSame(Date.now(), 'day');
    if(iskeeped){
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

function keepAday(user, iscontinue) {
  return new Promise((resolve, reject) => {
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

module.exports = {
  keepAday,
  isKeeped,
  saveKeepCard,
  getNewestKeeprecord,
  getRandomCard,
  receiveAnswer,
};
