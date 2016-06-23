const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: String,
  filepath: String,
  memo: String,
  level: Number,
  special: String,
  filename: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Card', CardSchema);
