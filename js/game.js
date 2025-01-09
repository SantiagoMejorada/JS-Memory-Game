// game.js

//Game state
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timeInterval;
let timeElapsed = 0;

// Select game stats and victory message elements
const movesCounter = document.getElementById("moves");
const victoryMessage = document.getElementById("victory-message");
const restartButton = document.getElementById("restart-button");
const timerDisplay = document.getElementById("timer");

// Handle card flip logic
function handleCardFlip(card) {
    if (flippedCards.length === 0 && moves === 0) {
        // Start timer on the first move
        startTimer();
    }

    // Ignore clicks on already flipped or matched cards
    if (flippedCards.includes(card) || card.classList.contains("matched")) return;

    // Flip the card
    card.classList.add("flipped");
    flippedCards.push(card);

    // check for a match if 2 cards are flipped
    if (flippedCards.length === 2) {
        checkForMatch();
        updateMoves();
    }
}

// Verify that the two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const card1Content = card1.querySelector(".card-front").textContent;
    const card2Content = card2.querySelector(".card-front").textContent;

    if (card1Content === card2Content) {
        // Mark cards as matched
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;
        // Reset flipped cards
        flippedCards = [];

        //Check victory (cardDeck const in board.js)
        if (matchedCards === cardDeck.length) {
            displayVictory();
        }
    } else {
        // Flip cards back since them don't match
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            // Reset flipped cards
            flippedCards = [];
        }, 1000);
    }
}

//Updates moves counter
function updateMoves() {
    moves++;
    movesCounter.textContent = `Moves: ${moves}`
}

// Display victory message
function displayVictory() {
    stopTimer();
    victoryMessage.classList.remove("hidden");
}

//Restart
function restartGame() {
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    movesCounter.textContent = "Moves: 0";
    victoryMessage.classList.add("hidden");

    //Function in board.js
    initializeBoard();
}

function startTimer() {
    timeElapsed = 0;
    timerDisplay.textContent = "Time: 0s";
    timeInterval = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timeInterval);
}

restartButton.addEventListener("click", restartGame);