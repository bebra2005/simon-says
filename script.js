let lvl = document.getElementById('lvl');
let easyKeyboard = document.querySelector('.key-board-Easy')
let mediumKeyboard = document.querySelector('.key-board-Medium')
let playBtn = document.getElementById('play')

function hideKeyBoard() {
    easyKeyboard.classList.add('hidden');
    mediumKeyboard.classList.add('hidden');
}

hideKeyBoard();

lvl.addEventListener('change', function() {
    hideKeyBoard();
    if (this.value === 'easy') {
        easyKeyboard.classList.remove('hidden')
    }
    if (this.value === 'medium') {
        mediumKeyboard.classList.remove('hidden')
    }
    if (this.value === 'hard') {
        easyKeyboard.classList.remove('hidden')
        mediumKeyboard.classList.remove('hidden')
    }
});

