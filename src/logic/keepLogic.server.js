const mongoose = require('mongoose');
const User = mongoose.model('User');
const KeepRecord = mongoose.model('KeepRecord');
const Card = mongoose.model('Card');
const moment = require('moment');

function getRandomCard(){
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
      if (keeprecords.length === 0) resolve(false);
      const theday = moment(keeprecords[0].created);
      const iskeeped = theday.isSame(Date.now(), 'day');
      const iscontinue = theday.add(1, 'days').isSame(Date.now(), 'day');
      resolve({ iskeeped, iscontinue });
    }).catch(err => {
      reject(err);
    });
  });
}


function getNewLevel(user){
  const level = parseInt(user.keepdays/7)+1;
  return level;
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
      userk.score += 10;
      const level = getNewLevel(userk);
      userk.level = `R${level}`;
      if (iscontinue){
        userk.max_keepdays += 1;
      }else{
        userk.max_keepdays = 1;
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
