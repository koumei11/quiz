import Quiz from "./Quiz.js";

export default class QuizCollection {
  static #amount = 10;
  static #allQuizzes = [];

  static async getQuizData() {
    const response = await fetch(`https://opentdb.com/api.php?amount=${this.#amount}`);
    try {
      const data = await response.json();
      this.#allQuizzes = data.results;
      this.#convertJsonDataToQuizObject();
      return this.#allQuizzes;
    } catch (e) {
      console.error(e);
    }
  }

  static drop() {
    return this.#allQuizzes.shift();
  }

  static getQuestionNumber() {
    return this.#amount - this.#allQuizzes.length;
  }

  static #convertJsonDataToQuizObject() {
    this.#allQuizzes = this.#allQuizzes
                              .map(data => new Quiz(data.type, 
                                                    data.category, 
                                                    data.difficulty, 
                                                    data.question, 
                                                    data.correct_answer, 
                                                    data.incorrect_answers));
  }
}