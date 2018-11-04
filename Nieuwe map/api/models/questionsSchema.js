const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionsSchema = new Schema({
  _id: String,
  question: String,
  category: String,
  answer: String
});

module.exports = mongoose.model("question", questionsSchema);
