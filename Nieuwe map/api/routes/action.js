"use strict";

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const CategorySchema = require("../models/categorySchema");
const Quizz = require("../models/quizzerSchema");
const Master = require("../models/masterSchema");
const QuestionSchema = require("../models/questionsSchema");

router.get("/categories", (req, res, next) => {
  CategorySchema.find()
    .exec()
    .then(doc => {
      console.log("from data base", doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/questions/:catId", (req, res, next) => {
  const catId = req.params.catId;
  QuestionSchema.find({ category: catId })
    .populate("question.category")
    .exec()
    .then(doc => {
      console.log("from data base", doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/question/:questionId", (req, res, next) => {
  const questionId = req.params.questionId;
  console.log('hi')
  // console.log(QuestionSchema)
  QuestionSchema.findOne(mongoose.Types.ObjectId(questionId))
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:team", (req, res, next) => {
  Quizz.findById(req.params.team)
    .populate("team")
    .exec()
    .then(doc => {
      console.log("from data base", doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:player/goto", (req, res) => {
  res.json("replace me with your code");
});

module.exports = router;
