const Quiz = require('../models/Quiz')

const apiRequest = async (req, res, next) => {
  const quiz = new Quiz()
  await quiz.getQuizData()
  req.quiz = quiz
  next()
}

const convertJson = (req, res, next) => {
  req.quizData = req.quiz.convertQuizDataToJson()
  next()
}

module.exports = {
  apiRequest,
  convertJson
}