const mongoose = require('mongoose');
const Material = mongoose.model('Material');
// 从数据库里获取任务合成任务卡
function getMission() {
  return Material.find({})
  .sort('-created')
  .limit(1)
  .exec();
}

module.exports = {
  getMission,
};
