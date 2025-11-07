/**
 * -----------------------------------------------------------------------------
 * QUIZ FEEDBACK AND PROGRESSION CONTROLLER
 * -----------------------------------------------------------------------------
 * This module manages the user interface elements that appear immediately after 
 * an answer is submitted (feedback box) and controls the transition to the next 
 * question or the end-of-quiz sequence.
 * 
 * FUNCTIONS:
 * - Event Listener for showAnswerButton: Hides the 'Show Answer' button and reveals 
 * the correct answer image based on the data for the current question.
 * - Event Listener for nextQuestionButton: Handles the core quiz progression. It 
 * increments the question index, hides the feedback modal, and checks if another 
 * question exists. If yes, it transitions to the 'questionTitleScreen'; if no, 
 * it displays the 'endScreen' and initiates a celebratory confetti effect.
 * 
 * EVENT LISTENERS:
 * - showAnswerButton (click): Reveals the correct visual answer.
 * - nextQuestionButton (click): Advances the quiz state or ends the game.
 * 
 * GLOBAL VARIABLES (Elements & State):
 * - feedbackBox, nextQuestionButton, showAnswerButton, feedbackText: Elements 
 * related to the feedback modal.
 * - containerOverlay: The background dimmer/overlay for the feedback modal.
 * - finalScore, endScreen: Elements used to display results at the end of the quiz.
 * - container, questionTitleScreen: Screens managed during the transition phase.
 * - correctAnswerImage: The element where the correct answer image is displayed.
 * - isFeedbackActive: (boolean) State variable reset when transitioning to the next question.
 * 
 * EXTERNAL DEPENDENCIES (Variables/Functions):
 * - quizData: The array containing all quiz questions and their correct answers/images.
 * - currentQuestionIndex, score: Variables tracking quiz progress and user score.
 * - loadQuestion(): Function called to initialize the next question's content.
**/


const feedbackBox = document.getElementById('feedbackBox');
const nextQuestionButton = document.getElementById('nextQuestionButton');
const showAnswerButton = document.getElementById('showAnswerButton');
const feedbackText = document.getElementById('feedbackText');
const containerOverlay = document.getElementById('containerOverlay');
const feedbackImage = document.getElementById('feedbackImage');

// Show answer and explanation
showAnswerButton.addEventListener('click', () => {
  const qData = quizData[currentQuestionIndex];
  const imagePath = qData.correctImage;

  correctAnswerImage.src = imagePath;
  correctAnswerImage.classList.remove('hidden');
  showAnswerButton.classList.add('hidden');
});

// Enters Next question or ends the quiz
nextQuestionButton.addEventListener('click', () => {
  // Hide feedback modal
  feedbackBox.classList.add('hidden');
  containerOverlay.classList.add('hidden');
  showAnswerButton.classList.add('hidden');
  nextQuestionButton.classList.add('hidden');
  isFeedbackActive = false;
  currentQuestionIndex++;

  // Check if more questions remain
  if (quizData[currentQuestionIndex]) {
    // Load next question
    questionTitleScreen.classList.remove('hidden');
    container.classList.add('hidden');
    isSimulatorActive = false;
    loadQuestion();
  } else {
    // End of quiz sequence
    container.classList.add('hidden');
    finalScore.textContent = `${score} out of ${quizData.length}`;
    isSimulatorActive = false;
    endScreen.classList.remove('hidden');

    // Confetti effect
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      endScreen.appendChild(confetti);
    }
  }
});