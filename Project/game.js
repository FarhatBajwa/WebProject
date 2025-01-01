// game.js

let correctAnswer; // To store the correct answer
let level = 1; // Starting level

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random math problem and return the correct answer
function generateMathProblem() {
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const operator = ['+', '-', '*'][getRandomInt(0, 2)];

    // Display the problem
    const problemDisplay = document.getElementById('problem');
    problemDisplay.textContent = `${num1} ${operator} ${num2} = ?`;

    // Calculate the correct answer
    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
    }
}

// Function to generate random answer options, including the correct one
function generateAnswerOptions() {
    const answers = [correctAnswer];

    // Create some incorrect answers
    while (answers.length < 4) {
        const randomAnswer = getRandomInt(correctAnswer - 5, correctAnswer + 5);
        if (!answers.includes(randomAnswer) && randomAnswer !== correctAnswer) {
            answers.push(randomAnswer);
        }
    }

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    // Update answer boxes with random answers
    const answerBoxes = document.querySelectorAll('.answer-box');
    answerBoxes.forEach((box, index) => {
        box.textContent = answers[index];
        box.setAttribute('draggable', 'true');
        box.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.textContent);
        });
    });
}

// Function to initialize the game
function startNewGame() {
    // Hide reward message and reset feedback
    document.getElementById('reward-container').style.display = 'none';
    document.getElementById('feedback-message').textContent = '';

    // Reset the drop box to initial state
    const answerBox = document.getElementById('answer-box');
    answerBox.textContent = 'Drop the Answer Here'; // Reset to initial text

    // Generate new math problem and answers
    generateMathProblem();
    generateAnswerOptions();
}

// Function to handle the drop event
function handleDrop(event) {
    event.preventDefault();

    const draggedAnswer = event.dataTransfer.getData('text');
    const answerBox = event.target;

    // Check if the dragged answer is correct
    if (parseInt(draggedAnswer) === correctAnswer) {
        document.getElementById('feedback-message').textContent = 'Correct Answer!';
        document.getElementById('reward-container').style.display = 'block';
        level++;
        document.getElementById('level').textContent = level;
        setTimeout(startNewGame, 1000); // Wait for 1 second before starting a new game
    } else {
        document.getElementById('feedback-message').textContent = 'Try Again!';
    }

    // Set the dropped answer in the box
    answerBox.textContent = draggedAnswer;
}

// Allow answer box to accept a drop
function allowDrop(event) {
    event.preventDefault();
}

// Start the game initially
startNewGame();
