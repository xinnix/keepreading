
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  author: String,
  content: String,
  voice_url: String,
});
mongoose.model('Quote', QuoteSchema);
