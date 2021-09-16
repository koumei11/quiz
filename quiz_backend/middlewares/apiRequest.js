const Quiz = require('../models/Quiz')

const apiRequest = async (req, res, next) => {
  const quiz = new Quiz()
  await quiz.getQuizData()
  req.quiz = quiz
  next()
}

module.exports = apiRequest