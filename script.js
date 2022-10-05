var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')
var timerElement = document.getElementById('timedisplay')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

var secondsLeft = 45;
var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})

function startGame() {
    console.log("Game Start!");
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    setTime();

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
   if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
   } else {
        nextButton.classList.add('hide');
        startButton.classList.remove('hide');
        submitButton.classList.remove('hide');
        startButton.textContent = "Restart";
   }
}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerElement.textContent = secondsLeft + " seconds left.";
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        
      }
  
    }, 1000);
  }

var questions = [
    {
        question: "Which of the following is NOT a typical data-type?",
        answers: [
            { text: 'Shape', correct: true},
            { text: 'Boolean', correct: false},
            { text: 'String', correct: false},
            { text: 'Integer', correct: false}
        ]
    },

    {
        question: "A string element must be enclosed in ____",
        answers: [
            { text: 'Straight Brackets', correct: false},
            { text: 'Curly Brackets', correct: false},
            { text: 'Quotation Marks', correct: true},
            { text: 'Hyphens', correct: false}
        ]
    },

    {
        question: "True or False. ':hover' is the correct way to create a media-query for hovering over an element with the mouse?",
        answers: [
            { text: 'True', correct: true},
            { text: 'False', correct: false},
        ]
    },

    {
        question: "In which section does one put link to other font styles used in the document?",
        answers: [
            { text: 'Header', correct: false},
            { text: 'Div', correct: false},
            { text: 'Footer', correct: false},
            { text: 'Head', correct: true}
        ]
    },

    {
        question: "What is the name of the front-end framework we are using in this class?",
        answers: [
            { text: 'Fastener', correct: false},
            { text: 'Bootstrap', correct: true},
            { text: 'Shoelace', correct: false},
            { text: 'Beltbuckle', correct: false}
        ]
    },

    {
        question: "True or False, jQuery declarations start with '&'",
        answers: [
            { text: 'True', correct: false},
            { text: 'False', correct: true},
        ]
    }
]

