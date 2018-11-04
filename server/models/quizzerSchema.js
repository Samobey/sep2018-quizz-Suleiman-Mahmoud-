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
      rounds: [{ roundNumber: Number, roundScore: Number }],
      correctAnswers : [Number]
    }
  ],
  rounds: [
    {
      _id: Number,
      questions: []
    }
  ]
});
module.exports = mongoose.model("quizzer", quizzerSchema);
