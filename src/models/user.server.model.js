
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
  keepdays: {
    type: Number,
    default: 0,
  },
  cont_keepdays: {
    type: Number,
    default: 0,
  },
  max_keepdays: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: 'R1',
  },
  like: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  state: String,
});
mongoose.model('User', UserSchema);
