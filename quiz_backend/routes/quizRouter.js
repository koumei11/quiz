const express = require('express')
const router = express.Router()
const Quiz = require('../models/Quiz')

router.get('/quiz', (req, res) => {
  const quiz = new Quiz()
  res.json(quiz.convertQuizDataToJson())
})

module.exports = router