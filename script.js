const lvl = document.getElementById('lvl');
const easyKeyboard = document.querySelector('.key-board-Easy');
const mediumKeyboard = document.querySelector('.key-board-Medium');
const playBtn = document.getElementById('play');
const repeatBtn = document.getElementById('repeatBtn');
const newGameBtn = document.getElementById('newGameBtn');
const sequenceInput = document.getElementById('input');

let currentLvl = '';
let currentRound = 1;
let sequence = []; 
let userInput = [];
let isSimulating = false;

function init() {
    hideKeyBoard();
    setupEventListeners();
    document.querySelector('.game-start').classList.remove('hidden');
    if (lvl.value) {
        showKeyboardForLevel(lvl.value);
    }
}

function hideKeyBoard() {
    easyKeyboard.classList.add('hidden');
    mediumKeyboard.classList.add('hidden');
}

function showKeyboardForLevel(level) {
    hideKeyBoard();
    if (level === 'easy') {
        easyKeyboard.classList.remove('hidden');
    } else if (level === 'medium') {
        mediumKeyboard.classList.remove('hidden');
    } else if (level === 'hard') {
        easyKeyboard.classList.remove('hidden');
        mediumKeyboard.classList.remove('hidden');
    }
}

function setupEventListeners() {
    lvl.addEventListener('change', function() {
        currentLvl = this.value;
        showKeyboardForLevel(currentLvl);
    });

    playBtn.addEventListener('click', startGame);
    repeatBtn.addEventListener('click', repeatSequence);
    newGameBtn.addEventListener('click', resetGame);
    
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            if (!isSimulating && document.querySelector('.game-screen').classList.contains('hidden') === false) {
                handleKeyPress(key.textContent);
            }
        });
    });
}

function startGame() {
    if (!lvl.value) {
        alert('Please select a level first!');
        return;
    }
    
    currentLvl = lvl.value;
    currentRound = 1;
    userInput = [];
    
    document.getElementById('currentLvl').textContent = currentLvl;
    document.getElementById('currentRound').textContent = currentRound;
    
    document.querySelector('.game-start').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');
    
    playBtn.classList.add('hidden');
    repeatBtn.classList.remove('hidden');
    newGameBtn.classList.remove('hidden');
    
    generateSequence();
    showSequence();
}

function generateSequence() {
    let sequenceLength = 2 + ((currentRound - 1) * 2);
    sequence = [];

    let availableKeys = [];
    if (currentLvl === 'easy') {
        availableKeys = Array.from(document.querySelectorAll('.key-board-Easy .key')).map(el => el.textContent);
    } else if (currentLvl === 'medium') {
        availableKeys = Array.from(document.querySelectorAll('.key-board-Medium .key')).map(el => el.textContent);
    } else if (currentLvl === 'hard') {
        availableKeys = Array.from(document.querySelectorAll('.key-board-Easy .key, .key-board-Medium .key'))
            .map(el => el.textContent);
    }
    
    for (let i = 0; i < sequenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableKeys.length);
        sequence.push(availableKeys[randomIndex]);
    }
}

async function showSequence() {
    isSimulating = true;
    disableControls();
    sequenceInput.textContent = '';
    
    for (const char of sequence) {
        const keyElement = [...document.querySelectorAll('.key')].find(el => el.textContent === char);
        if (keyElement) {
            keyElement.classList.add('active');
        }
        
        sequenceInput.textContent += char + ' ';
        await new Promise(resolve => setTimeout(resolve, 400));
        
        if (keyElement) {
            keyElement.classList.remove('active');
        }
        
        await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    isSimulating = false;
    enableControls();
    repeatBtn.disabled = false;
}

function repeatSequence() {
    if (!isSimulating) {
        repeatBtn.disabled = true;
        userInput = [];
        sequenceInput.textContent = '';
        showSequence();
    }
}

function handleKeyPress(key) {
    userInput.push(key);
    sequenceInput.textContent = userInput.join(' ');
    
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== sequence[i]) {
            gameOver();
            return;
        }
    }
    if (userInput.length === sequence.length) {
        nextRound();
    }
}

function nextRound() {
    currentRound++;
    document.getElementById('currentRound').textContent = currentRound;
    userInput = [];
    sequenceInput.textContent = '';
    
    setTimeout(() => {
        generateSequence();
        showSequence();
    }, 1000);
}

function gameOver() {
    alert(`Game Over! You reached round ${currentRound}`);
    resetGame();
}

function resetGame() {
    currentRound = 1;
    userInput = [];
    sequence = [];
    
    document.querySelector('.game-screen').classList.add('hidden');
    document.querySelector('.game-start').classList.remove('hidden');
    
    playBtn.classList.remove('hidden');
    repeatBtn.classList.add('hidden');
    newGameBtn.classList.add('hidden');
    
    sequenceInput.textContent = '';
}

function disableControls() {
    repeatBtn.disabled = true;
    newGameBtn.disabled = true;
}

function enableControls() {
    newGameBtn.disabled = false;
}

document.addEventListener('DOMContentLoaded', init);