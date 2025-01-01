const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let isGameOver = false;

function startGame() {
    document.getElementById("Won").innerHTML = "";
    isGameOver = false;
    matchedCards = [];
    shuffledCards = [...letters, ...letters];
    shuffledCards = shuffle(shuffledCards);
    
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    flippedCards = [];

    shuffledCards.forEach((letter, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.letter = letter;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard(event) {
    if (isGameOver || flippedCards.length === 2 || matchedCards.includes(event.target)) {
        return;
    }

    const card = event.target;
    card.classList.add('flipped');
    card.textContent = card.dataset.letter;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.letter === secondCard.dataset.letter) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        // Check if the player has matched all cards
        if (matchedCards.length === shuffledCards.length) {
            setTimeout(() => {
                document.getElementById("Won").innerHTML = "You Won!";
                // alert('You won!');
                isGameOver = true;
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Start the game on page load
startGame();
