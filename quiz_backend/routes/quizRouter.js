const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const data = req.quizData
  res.json(data)
})

module.exports = router