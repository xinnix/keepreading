const mongoose = require('mongoose');
const Task = mongoose.model('Task');
// 从数据库里获取任务合成任务卡 取得与用户传入等级相同的题目
function getRandomTask(level) {
  return new Promise((resolve, reject) => {
    Task.count({ level }).exec((err, count) => {
      if (err) reject(err);
      const random = Math.floor(Math.random() * count);
      Task.findOne({ level }).skip(random).exec()
      .then(result => {
        resolve(result);
      })
      .catch(err1 => {
        reject(err1);
      });
    });
  });
}

module.exports = {
  getRandomTask,
};
