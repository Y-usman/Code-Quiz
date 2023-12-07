// Helper function to get highscores from localStorage
function getHighscores() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}

// Helper function to set highscores to localStorage
function setHighscores(highscores) {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Function to save the result to localStorage
function saveResult(initials, score) {
    const existingHighscores = getHighscores();
    const newScore = { initials, score };
    existingHighscores.push(newScore);
    setHighscores(existingHighscores);
}

// Function to display highscores on the highscores.html page
 function displayHighscores() {
    console.log("Displaying highscores...");
    const highscoresContainer = document.getElementById("highscores");

    if (highscoresContainer) {
        console.log("Highscores container found.");
        // Clear existing content
        highscoresContainer.innerHTML = "";

        const highscores = getHighscores();

        // Sort highscores in descending order
        highscores.sort((a, b) => b.score - a.score);

        // Display highscores in the ordered list
        highscores.forEach((score, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
            highscoresContainer.appendChild(listItem);
        });
    } else {
        console.log("Highscores container not found.");
    }
}

 function clearHighscores() {
    localStorage.removeItem("highscores");
    // Don't need to call displayHighscores here, as it's called in the event listener
}

// logic.js

document.addEventListener("DOMContentLoaded", function () {
    displayHighscores();  // Ensure this is called at the correct time
    const clearBtn = document.getElementById("clear");
    if (clearBtn !== undefined && clearBtn !== null) {
        // Now we know that foo is defined, we are good to go.
        console.log("Clearing scores...");
    }
      
    clearBtn.addEventListener("click", clearHighscores);
    // ... rest of the code ...
});
