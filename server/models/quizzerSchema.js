const mongoose = require("mongoose");

const quizzerSchema = new mongoose.Schema({
  _id: String,
  master:String,
  scoreBoard:String,
  teams: [
    {
      _id: String,
      name: String,
      totaleScore: Number,
      correctAnswers : [Number] 
    }
  ], 
  question: [String] 
});
module.exports = mongoose.model("quizzer", quizzerSchema);
