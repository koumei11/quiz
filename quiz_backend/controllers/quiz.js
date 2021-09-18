const getQuiz = (req, res) => {
  const data = req.quizData
  res.json(data)
}

module.exports = getQuiz