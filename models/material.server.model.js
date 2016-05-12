const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: String,
  media_id: String,
  url: String,
  memo: String,
  type: String,
  created: {
    type: Date,
    default: Date.now,
  },
  permanent: Boolean,
});
mongoose.model('Material', MaterialSchema);
