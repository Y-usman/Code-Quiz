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
    const question = document.getElementById("question");

    console.log("question-title element:", document.getElementById("question-title"));

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
        question.classList.remove("hide");
        showQuestion();
        startTimer();
    }
    
    function showQuestion() {
        console.log("showing Questions");
        const currentQuestion = questions[currentQuestionIndex];
        // Clear previous choices
        const choicesContainer = document.getElementById("choices");
        choicesContainer.innerHTML = "";
    
        if (currentQuestion) {
            // Check if currentQuestion is defined
    
            // Update the question title
            document.getElementById("question-text").textContent = currentQuestion.title;
    
            // Create buttons for each choice
            currentQuestion.choices.forEach((choice) => {
                const button = document.createElement("button");
                button.textContent = choice;
                button.addEventListener("click", () => checkAnswer(choice));
                choicesContainer.appendChild(button);
            });
    
            console.log("Showing question:", currentQuestionIndex, currentQuestion);
        } else {
            // If there are no more questions, end the quiz
            endQuiz();
        }
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

        // Display the feedback
        feedbackDiv.classList.remove("hide");

        // Hide the feedback after a brief delay (e.g., 1 second)
        setTimeout(() => {
            feedbackDiv.classList.add("hide");
        }, 500);

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

        // Hide the question element
        const questionElement = document.getElementById("question");
        if (questionElement) {
            questionElement.classList.add("hide");
        }
    }

    function submitScore() {
        const initials = initialsInput.value.trim();

        if (initials !== "") {
            // Call the saveResult function
            if (typeof window !== 'undefined' && window.saveResult) {
                window.saveResult(initials, score);
                console.log("Displaying highscores...");
                displayHighscores(); // Display highscores after submitting

                // Redirect to highscores.html
                window.location.href = "highscores.html";
            } else {
                console.error("saveResult function not defined");
            }
        }

        
    }
});

