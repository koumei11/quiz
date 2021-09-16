const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

app.use(async (req, res, next) => {
  const quizData = await axios('https://opentdb.com/api.php?amount=10')
  console.log(quizData.data.results)
  next()
})

app.get('/quiz', (req, res) => {
  res.send('hello')
})

const PORT = 3000
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
})