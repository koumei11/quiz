import QuizCollection from './QuizCollection.js';

// Quiz variables
let allQuiz = [];
let currentQuestion = {};
let totalCorrectAns;

// Node variables
const startScreen = document.getElementById('start-screen');
const loadScreen = document.getElementById('load-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementsByClassName('js-start-button')[0];
const backButton = document.getElementsByClassName('js-back-button')[0];
const totalCorrectAnsDOM = document.getElementsByClassName('js-total-correct-ans')[0];
const qiuzBlock = document.createElement('DIV');

/**
 * Start quiz
 * @param {object} e click event
 */
async function startQuizGame(e) {
  totalCorrectAns = 0;
  startScreen.style.display = 'none';
  loadScreen.style.display = 'block';
  allQuiz = await QuizCollection.getQuizData();
  currentQuestion = QuizCollection.drop();
  createQiuzBlock(currentQuestion);
  loadScreen.style.display = 'none';
  document.getElementsByTagName('body')[0].appendChild(qiuzBlock);
}

/**
 * Create Quiz Structure
 * @param {object} quizObject one quiz data
 */
function createQiuzBlock(quizObject) {
  // Create quiz number block
  createBlockElements('H1', 'SPAN', '問題', QuizCollection.getQuestionNumber(), 'quiz-number');

  // Create category block
  createBlockElements('H3', 'SPAN', '[ジャンル]', quizObject.category, 'quiz-category');

  // Create difficulty block
  createBlockElements('H3', 'SPAN', '[難易度]', quizObject.difficulty, 'quiz-difficulty');

  // Create question block
  createBlockElement(qiuzBlock, 'P', quizObject.question, 'main-section');

  // Create button block
  createChoiceButtons(quizObject);
}

/**
 * Create Block Elements
 * @param {string} parentElement string element the correspondinng node is created from
 * @param {string} childElement string element the correspondinng node is created from
 * @param {string} keyItem key item
 * @param {string} valueItem value item
 * @param {string} className CSS class name
 */
function createBlockElements(parentElement, childElement, keyItem, valueItem, className) {
  const parentNode = createBlockElement(qiuzBlock, parentElement, keyItem, '');
  createBlockElement(parentNode, childElement, valueItem, className, className);
}

/**
 * Create Block Element
 * @param {Node Object} parentNode parent node of the second argument
 * @param {string} childElement string element the correspondinng node is created from
 * @param {string} textContent text value of the second element
 * @param {string} className CSS class name
 * @returns created object
 */
function createBlockElement(parentNode, childElement, textContent, className) {
  const childNode = document.createElement(childElement);
  childNode.textContent = textContent;
  childNode.className = className;
  parentNode.appendChild(childNode);
  return childNode;
}

/**
 * Create choice buttons
 * @param {object} quizObject quiz info
 */
function createChoiceButtons(quizObject) {
  if (quizObject.type === 'multiple') {
    const choicesArray = quizObject.createChoicesArray();
    qiuzBlock.appendChild(createChoiceButton(choicesArray[0]));
    qiuzBlock.appendChild(createChoiceButton(choicesArray[1]));
    qiuzBlock.appendChild(createChoiceButton(choicesArray[2]));
    qiuzBlock.appendChild(createChoiceButton(choicesArray[3]));
  } else if (quizObject.type === 'boolean') {
    qiuzBlock.appendChild(createChoiceButton("True"));
    qiuzBlock.appendChild(createChoiceButton("False"));
  }
}

/**
 * Create single choice button
 * @param {string} value button text
 * @returns created button
 */
function createChoiceButton(value) {
    const choiceButton = document.createElement('BUTTON');
    choiceButton.style.display = 'block';
    choiceButton.textContent = value;
    choiceButton.addEventListener('click', checkUserAnswer);
    return choiceButton;
}

/**
 * Process an user input
 * @param {event object} e click event object
 */
function checkUserAnswer(e) {
  if (e.target.textContent === currentQuestion.correct_answer) {
    totalCorrectAns += 1;
  }
  displayNextScreen();
}

/**
 * display next screen depending on the progress
 */
function displayNextScreen() {
  qiuzBlock.innerHTML = '';
  if (allQuiz.length !== 0) {
    currentQuestion = QuizCollection.drop();
    createQiuzBlock(currentQuestion);
  } else {
    qiuzBlock.parentNode.removeChild(qiuzBlock);
    totalCorrectAnsDOM.textContent = totalCorrectAns;
    resultScreen.style.display = 'block';
  }
}

// Event Listeners
startButton.addEventListener('click', startQuizGame);
backButton.addEventListener('click', (e) => {
  resultScreen.style.display = 'none';
  startScreen.style.display = 'block';
});