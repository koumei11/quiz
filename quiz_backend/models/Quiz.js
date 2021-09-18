const axios = require('axios')

class Quiz {
  _quizzes
  
  async getQuizData() {
    const response = await axios('https://opentdb.com/api.php?amount=10')
    this._quizzes = response.data.results
  }

  createAnswersArray(quiz) {
    const answers = quiz.incorrect_answers;
    const index = Math.floor(Math.random() * 4);
    answers.splice(index, 0, quiz.correct_answer);
    return answers;
  }

  convertQuizDataToJson() {
    return this._quizzes
      .map(quiz => ({
        type: quiz.type,
        category: quiz.category,
        question: quiz.question,
        correct_answer: quiz.correct_answer,
        incorrect_answers: quiz.incorrect_answers,
        answers: this.createAnswersArray(quiz)
      }))
  }
}

module.exports = Quiz