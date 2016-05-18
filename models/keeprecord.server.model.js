const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeepRecordSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
mongoose.model('KeepRecord', KeepRecordSchema);
