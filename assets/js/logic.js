//import questions from "./questions.js";
//import { saveResult, displayHighscores } from "./scores.js";
console.log(questions);

document.addEventListener("DOMContentLoaded", function () {
    
    const startBtn = document.getElementById("start");
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices");
    const timerSpan = document.getElementById("time");
    const initialsInput = document.getElementById("initials");
    const submitBtn = document.getElementById("submit");
    const endScreen = document.getElementById("end-screen");
    const feedbackDiv = document.getElementById("feedback");
    const scoresLink = document.querySelector(".scores a");
    const questionEl = document.getElementById("question");


    let currentQuestionIndex = 0;
    let score = 0;
    let timeRemaining = 75; // Initial time in seconds
    let timerInterval;

    startBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", submitScore);
    scoresLink.addEventListener("click", function () {
        // Redirect to highscores.html
        window.location.href = "highscores.html";
    });

    function startQuiz() {
        startBtn.style.display = "none";
        questionEl.classList().remove("hide");
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        console.log("showing Questions");
        const currentQuestion = questions[currentQuestionIndex];
        console.log(currentQuestion.title)
            const testEl = document.getElementById("question-text");
            testEl.textContent = "Hello"
          // Clear previous choices
          const choicesContainer = document.getElementById("choices");
          choicesContainer.innerHTML = "";
        // if (currentQuestion) {
            // Check if currentQuestion is defined
    
            // Update the question title
            document.getElementById("question-title").textContent = currentQuestion.title;
    
          
    
            // Create buttons for each choice
            currentQuestion.choices.forEach((choice) => {
                const button = document.createElement("button");
                button.textContent = choice;
                button.addEventListener("click", () => checkAnswer(choice));
                choicesContainer.appendChild(button);
            });
    
            console.log("Showing question:", currentQuestionIndex, currentQuestion);
        // } else {
        //     // If there are no more questions, end the quiz
        //     endQuiz();
        // }
    }
    
    

    function checkAnswer(selectedChoice) {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedChoice === currentQuestion.correctChoice) {
            score++;
            feedbackDiv.textContent = "Correct!";
        } else {
            timeRemaining -= 10; // Penalty for incorrect answer
            feedbackDiv.textContent = "Wrong!";
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            timerSpan.textContent = timeRemaining;
            timeRemaining--;

            if (timeRemaining < 0) {
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timerInterval);
        endScreen.style.display = "block";
        document.getElementById("final-score").textContent = score;
    }

    function submitScore() {
        const initials = initialsInput.value.trim();

        if (initials !== "") {
            saveResult(initials, score);
            console.log("Displaying highscores...");
            displayHighscores(); // Display highscores after submitting
        }
    }
});

