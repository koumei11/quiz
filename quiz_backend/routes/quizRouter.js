const express = require('express')
const router = express.Router()
const apiRequest = require('../middlewares/apiRequest')

router.get('/quiz', apiRequest, (req, res) => {
  const quiz = req.quiz
  res.json(quiz.convertQuizDataToJson())
})

module.exports = router