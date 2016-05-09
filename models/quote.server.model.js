
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  author: String,
  content: String,
});
mongoose.model('Quote', QuoteSchema);
