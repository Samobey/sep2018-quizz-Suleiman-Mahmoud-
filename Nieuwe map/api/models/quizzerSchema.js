const mongoose = require("mongoose");

const quizzerSchema = new mongoose.Schema({
  _id: String,
  team: [
    {
      _id: String,
      name: String,
      totaleScore: Number,
      rounds: [{ roundNumber: Number, roundScore: Number }]
    }
  ],
  rounds: [
    {
      _id: Number,
      questions: [
        {
          _id: String,
          category: String,
          answer: String
        }
      ]
    }
  ]
});
module.exports = mongoose.model("quizzer", quizzerSchema);
