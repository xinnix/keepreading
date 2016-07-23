const mongoose = require('mongoose');
const KeepRecord = mongoose.model('KeepRecord');

function getNewestKeeprecord(user) {
  return new Promise((resolve, reject) => {
    KeepRecord
    .findOne({ user: user._id })
    .sort('-created')
    .exec()
    .then(keeprecord => {
      resolve(keeprecord);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function saveGritcardID(user, mediaId) {
  return new Promise((resolve, reject) => {
    KeepRecord
    .findOne({ user: user._id })
    .sort('-created')
    .exec()
    .then(keeprecord => {
      keeprecord.gritcard = mediaId;
      keeprecord.save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
}

module.exports = {
  getNewestKeeprecord,
  saveGritcardID,
};
