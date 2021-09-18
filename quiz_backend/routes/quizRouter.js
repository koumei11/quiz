const express = require('express')
const router = express.Router()
const getQuiz = require('../controllers/quiz')

router.get('/', getQuiz)

module.exports = router