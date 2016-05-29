const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  title: String,
  media_id: String,
  url: String,
  content: String,
  type: String,
  created: {
    type: Date,
    default: Date.now,
  },
  level: String,
  permanent: Boolean,
});

MaterialSchema.statics.random = function(condition, callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne(condition).skip(rand).exec(callback);
  }.bind(this));
};
mongoose.model('Material', MaterialSchema);
