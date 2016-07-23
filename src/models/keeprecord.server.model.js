const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeepRecordSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  // 增加记录已获得卡片的功能
  card: {
    type: Schema.ObjectId,
    ref: 'Card',
  },
  gritcard: String,
  status: {
    type: String,
    default: 'pending', //or complete
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
mongoose.model('KeepRecord', KeepRecordSchema);
