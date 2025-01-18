const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const cards = document.querySelectorAll(".card img");
const livesContainer = document.getElementById("lives");

let challengeInput = "NYMPH";
let score = 0;
let lives = 3;
let correctguess = 0;
let guessStr = "";

function startGame() {
    score = 0;
    lives = 3;
    correctguess = 0;
    guessStr = "";
    scoreElement.textContent = score;
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        const heartImg = document.createElement("img");
        heartImg.src = "heart.svg";
        livesContainer.appendChild(heartImg);
    }
    userInput.value = "";
    document.getElementById("challenge").value = challengeInput;
    restartBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
}

function inputControl() {
    const userGuess = userInput.value.toUpperCase();
    if (userGuess.length !== 1 && userGuess.length !== challengeInput.length)
    {
        alert("Please predict one character or the whole word.");
        return 3;
    }
    if (userGuess.length >= challengeInput.length && userGuess !== challengeInput)
    {
        alert("Completely Wrong Guess!");
        return 4;
    }
    else if (guessStr.includes(userGuess))
    {
        alert("You predicted this character already.");
        return 3;
    }
    else if (userGuess === challengeInput)
    {
        showCharacters(userGuess);
        endGame(true);
        return 2;
    }
    else if (challengeInput.includes(userGuess))
    {
        alert("Correct Guess!");
        guessStr += userGuess;
        correctguess++;
        showCharacters(userGuess);
        if (correctguess === challengeInput.length) 
            endGame(true);
        return 1;
    }
    else
    {
        alert("Wrong Guess!");
        return 0;
    }
}
function showCharacters(guess) {
    if (guess === challengeInput)
        cards.forEach(card => card.classList.remove("hidden"));
    challengeInput.split("").forEach((char, index) => {
        if (guess.includes(char)) {
            cards[index].classList.remove("hidden");
        }
    });
}
function scoreCounter(result)
{
    if(result === 1){
        score += 20;
    } else if(result === 2){
        score = 100;
    }
    scoreElement.textContent = score;
}

function liveCounter(result)
{
    if (result === 4)
        lives = 0;
    else
        lives--;
    const hearts = livesContainer.getElementsByTagName('img');
    if (hearts.length > 0)
        hearts[lives].remove();
    if (lives === 0)
    {
        livesContainer.innerHTML = "No lives left!";
        endGame(false);
    }
}

function endGame(won) {
    if (won)
    {
        alert("Congratulations! You guessed the word!");
    } else {
        alert("Game Over!");      
    }
    submitBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");  
}

submitBtn.addEventListener("click", () => {
    const result = inputControl();

    if (result === 0 || result === 4)
        liveCounter(result);
    else if (result === 1 || result === 2)
        scoreCounter(result);

    restartBtn.classList.remove("hidden");
    userInput.value = "";
});

restartBtn.addEventListener("click", () => {
    submitBtn.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    cards.forEach(card => card.classList.add("hidden"));
    startGame();
});
