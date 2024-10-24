document.addEventListener("DOMContentLoaded", () => {


  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);

  console.log(quiz)

  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed

  const updateTimer = () => {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }
  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer = setInterval(() => {

    if (quiz.hasEnded()) {
      clearInterval(timer)
      return
    }

    if (quiz.timeRemaining === 0) {
      showResults()
      return
    }
    quiz.timeRemaining--
    updateTimer()

  }, 1000)


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {

    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();


    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();


    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    questionContainer.innerHTML = question.text


    // 2. Update the green progress bar

    const currentQuestionNumber = quiz.currentQuestionIndex
    const totalQuestionsNumber = quiz.questions.length

    const currentPercent = (currentQuestionNumber / totalQuestionsNumber) * 100

    progressBar.style.width = `${currentPercent}%`



    // 3. Update the question count text 

    questionCount.innerText = `Question ${currentQuestionNumber + 1} of ${totalQuestionsNumber}`; //  This value is hardcoded as a placeholder



    // 4. Create and display new radio input element with a label for each choice.

    question.choices.forEach(eachChoice => {

      // input
      const inputTag = document.createElement('input')
      inputTag.setAttribute('type', 'radio')
      inputTag.setAttribute('name', 'choice')
      inputTag.setAttribute('value', eachChoice)
      choiceContainer.appendChild(inputTag)

      // label
      const labelTag = document.createElement('label')
      labelTag.innerHTML = eachChoice
      choiceContainer.appendChild(labelTag)

      // break
      const breakTag = document.createElement('br')
      choiceContainer.appendChild(breakTag)
    })
  }



  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value



    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    const inputs = document.querySelectorAll('input')


    // 2. Loop through all the choice elements and check which one is selected

    inputs.forEach(eachInput => {
      if (eachInput.checked) {
        selectedAnswer = eachInput.value
      }
    })



    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question

    quiz.checkAnswer(selectedAnswer)
    quiz.moveToNextQuestion()
    showQuestion()
  }




  function showResults() {

    alert('TERMINO')

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

});