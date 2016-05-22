const mongoose = require('mongoose');
const User = mongoose.model('User');
const KeepRecord = mongoose.model('KeepRecord');
const moment = require('moment');

function changeUserState(user){

}

function changeLevel(user){

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

function keepAday(user, iscontinue) {
  return new Promise((resolve, reject) => {
    const keepRecord = new KeepRecord({ user: user._id });
    keepRecord.save((err, result) => {
      if (err) reject(err);
    });

    User.findOne({ _id: user._id })
    .then(userk => {
      userk.keepdays += 1;
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
};
