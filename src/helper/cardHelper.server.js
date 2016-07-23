const mongoose = require('mongoose');
const Card = mongoose.model('Card');

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


module.exports = {
  getRandomCard,
};
