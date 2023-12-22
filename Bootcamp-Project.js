
const startButton = document.querySelector(".js-start-button");
const previousButton = document.querySelector(".js-previous-button");
const nextButton = document.querySelector(".js-next-button");
const submitButton = document.querySelector(".js-submit-button");
const optionContainer = document.querySelector(".js-option-container");
const questionContainer = document.querySelector(".js-question-container");

let currentQuestionIndex = 0;
let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

const questions = [
  {
   question :" Which U.S. President was the first to live in the White House?",
   
   Option :["George Washington" ,"John Adams", "Thomas Jefferson", "James Madison"],
   correctAnswer :"John Adams"
   
  },
 
  {
   question : " What was the name of the first successful English colony in America, founded in 1607?",
   
   Option : ["Plymouth","Roanoke","Jamestown","New Amsterdam"],
   correctAnswer : "Jamestown"
   
  },
 
  {
   question : " What was the first state to ratify the U.S. Constitution?",
   
   Option : ["Delaware","Pennsylvania","New Jersey","Georgia"],
   correctAnswer : "Delaware"
   
  },
 
  {
   question : " Which U.S. President was the first to be impeached?",
   
   Option : ["Andrew Johnson","Richard Nixon","Bill Clinton","Donald Trump"],
   correctAnswer : "Andrew Johnson"
   
  },
  
  {
   question : " Which American inventor is known as 'The Wizard of Menlo Park'?",
   
   Option : ["Thomas Edison","Alexander Graham Bell","Nikola Tesla","George Westinghouse"],
   correctAnswer : "Thomas Edison"
   
  },
 
  
 ]

function showQuestion(currentQuestionIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.innerHTML = currentQuestionIndex + 1 + ". " + currentQuestion.question;

  optionContainer.innerHTML = currentQuestion.Option.map((option, index) => {
    return `
      <div>
        <input type="radio" id="option${index}" name="options" value="${option}">
        <label for="option${index}">${option}</label>
      </div>
    `;
  }).join(' ');

  
  const previousSelectedValue = userAnswers[currentQuestionIndex];
  const previousSelectedInput = document.querySelector(`input[value="${previousSelectedValue}"]`);
  if (previousSelectedInput) {
    previousSelectedInput.checked = true;
  }
 updateButtonsVisibility()

}

function updateButtonsVisibility() {
  previousButton.style.display = "none";
  nextButton.style.display = "none";
  submitButton.style.display = "none";

  if (currentQuestionIndex > 0) {
    previousButton.style.display = "block";
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "block";
  }

  if (currentQuestionIndex === questions.length - 1 && userAnswers[currentQuestionIndex]) {
    submitButton.style.display = "block";
  }

  if (currentQuestionIndex > 0 || userAnswers.length > 0) {
    previousButton.style.display = "block";
    nextButton.style.display = "block";
    submitButton.style.display = "block";
  }
}




startButton.addEventListener("click", () => {
  userAnswers = [];
  showQuestion(currentQuestionIndex);
  startButton.style.display = "none";
  optionContainer.style.display = "block";
  updateButtonsVisibility();
});

previousButton.addEventListener("click", () => {
  const selectedAnswer = document.querySelector('input[name="options"]:checked');
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  }

  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
    updateButtonsVisibility();
  }
});

nextButton.addEventListener("click", () => {
  const selectedAnswer = document.querySelector('input[name="options"]:checked');
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    updateButtonsVisibility();
  }
});


function calculateScore() {
  let score = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      score++;
    }
  }
  return score;
}


function collectAndCompareAnswers() {
  const score = calculateScore();
  questionContainer.innerHTML = `<p class="text-3xl font-bold text-center m-1">Congratulations your Quiz has been completed <br> Your score is : ${score} </p>`;
  
}



submitButton.addEventListener("click", () => {

  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

  showQuestion(currentQuestionIndex);
  startButton.style.display = "block";
  optionContainer.style.display = "none";

  updateButtonsVisibility();
  collectAndCompareAnswers();
  calculateScore()

});

