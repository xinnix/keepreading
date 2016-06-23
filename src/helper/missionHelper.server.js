const mongoose = require('mongoose');
const Material = mongoose.model('Material');
// 从数据库里获取任务合成任务卡
function getRandomMission(level) {
  return new Promise((resolve, reject) => {
    Material.count({ level }).exec((err, count) => {
      if (err) reject(err);
      console.log(count);
      const random = Math.floor(Math.random() * count);
      Material.findOne({ level }).skip(random).exec().then(result => {
        resolve(result);
      }).catch(err1 => {
        reject(err1);
      });
    });
  });
}

module.exports = {
  getRandomMission,
};
