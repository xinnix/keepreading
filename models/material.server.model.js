const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: String,
  media_id: String,
  url: String,
  memo: String,
  type: String,
  permanent: Boolean,
});
mongoose.model('Material', MaterialSchema);
