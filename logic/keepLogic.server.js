const mongoose = require('mongoose');
const User = mongoose.model('User');
const KeepRecord = mongoose.model('User');


function changeUserState(user){

}

function checkUserState(user){

}

function changeLevel(user){

}

function keepAday(user) {
  return new Promise((resolve, reject) => {
    const keepRecord = new KeepRecord({ user });
    keepRecord.save()
    .then(() => User.findOne({ _id: user._id }))
    .then(userk => {
      userk.keepdays += 1;
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
};
