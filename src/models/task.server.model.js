const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  media_id: String,
  url: String,
  content: String,
  type: String,
  created: {
    type: Date,
    default: Date.now,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  level: Number,
  permanent: Boolean,
});

mongoose.model('Task', TaskSchema);
