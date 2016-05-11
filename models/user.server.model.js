
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  openid: String,
  nickname: String,
  sex: String,
  city: String,
  headimgurl: String,
  groupid: String,
  tagid_list: Date,
  keepdays: Number,
  state: String,
});
mongoose.model('User', UserSchema);
