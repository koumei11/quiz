const express = require('express')
const cors = require('cors')
const axios = require('axios')
const Quiz = require('./models/Quiz')
const app = express()

let quiz;

app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
  const quizData = await axios('https://opentdb.com/api.php?amount=10')
  quiz = new Quiz(quizData.data.results)
  next()
})

app.get('/quiz', (req, res) => {
  res.json(quiz.convertQuizDataToJson())
})

const PORT = 3000
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
})