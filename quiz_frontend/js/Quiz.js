export default class Quiz {

  constructor(type, category, difficulty, question, correct_answer, incorrect_answers) {
    this.type = type;
    this.category = category;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
  
  /**
   * Create choices array
   * @param {string} answer quiz answer
   * @param {string array} otherChoices other choices
   * @returns created array
   */
  createChoicesArray() {
    const choices = this.incorrect_answers;
    const index = Math.floor(Math.random() * 4);
    choices.splice(index, 0, this.correct_answer);
    return choices;
  }
}