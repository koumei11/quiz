const express = require('express')
const cors = require('cors')
const app = express()

const quizRouter = require('./routes/quizRouter')

app.use(express.json())
app.use(cors())
app.use(quizRouter)

const PORT = 3000
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
})