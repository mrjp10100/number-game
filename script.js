// script.js

let level = 1;
let sequence = [];
let userSequence = [];
let totalCoins = 0;
const levelDisplay = document.getElementById('level');
const coinsDisplay = document.getElementById('coins');
const coinEmoji = document.getElementById('coin-emoji'); // Reference to coin emoji
const sequenceDisplay = document.getElementById('sequence');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const messageDisplay = document.getElementById('message');

// Generate a random sequence
function generateSequence(level) {
    sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * 10));
    }
    sequenceDisplay.textContent = sequence.join(' ');
}

// Calculate the coins earned for the current level
function calculateCoins(level) {
    if (level <= 10) {
        return 20;
    } else {
        return Math.floor(20 * Math.pow(1.2, level - 10));
    }
}

// Trigger the coin animation
function animateCoin() {
    coinEmoji.style.animation = 'coin-animation 1s ease';
    setTimeout(() => {
        coinEmoji.style.animation = 'none';
    }, 1000); // Reset the animation after it finishes
}

// Check the user's input
function checkSequence() {
    userSequence = userInput.value.split('').map(Number);
    if (userSequence.join('') === sequence.join('')) {
        const coinsEarned = calculateCoins(level);
        totalCoins += coinsEarned;
        coinsDisplay.textContent = `Coins: ${totalCoins}`;
        
        animateCoin(); // Trigger the coin animation
        
        messageDisplay.textContent = `Correct! You earned ${coinsEarned} coins. Proceeding to the next level...`;
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        setTimeout(() => {
            messageDisplay.textContent = '';
            userInput.value = '';
            generateSequence(level);
        }, 1000);
    } else {
        messageDisplay.textContent = "Incorrect! Try again.";
    }
}

// Initialize the game
generateSequence(level);

// Event listener for submit button
submitBtn.addEventListener('click', checkSequence);
