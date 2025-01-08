// board.js

//Game board container
const gameBoard = document.getElementById("game-board");

//Example card content
const cardContent = ["🐱", "🌟", "🎵", "🔥", "🍎", "⚡"];
let cardDeck = [];

// Shuffle the cards
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards
}

// Initialize the game board
function initializeBoard() {
    // Duplicate card content for pairs and shuffle
    cardDeck = shuffle([...cardContent, ...cardContent]);

    // Clear existing board for restarts
    gameBoard.innerHTML = "";

    //Create card elements
    cardDeck.forEach(content => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${content}</div>
                <div class="card-back">${"👾"}</div>
            </div>
        `;

        // Click event to flip card
        card.addEventListener("click", () => handleCardFlip(card));

        // Append the card to the game board
        gameBoard.appendChild(card);
    });
}
// Initialize on load
initializeBoard();
