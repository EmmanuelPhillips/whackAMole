window.onload = function() {
    createBoard();
}

function createBoard() {
    for (let i = 1; i <= 9; i ++) {
        let boardTile = document.createElement("div");
        boardTile.id = `tile-${i}`;
        boardTile.classList.add("boardTile");
        document.getElementById("moleBoard").appendChild(boardTile);
        boardTile.addEventListener("click", function() {
            if (gameActive && boardTile === currentMole) {
                increaseScore();
                clearMoleTile();
            }
        })
    }
}

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const timeDisplay = document.getElementById("timeDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

let currentMole = null;

let gameActive = false;
let timerId = null;
let timeLeft = 30;
let score = 0;

startButton.addEventListener("click", function() {
    startGame();
})

resetButton.addEventListener("click", function() {
    resetGame();
})

function startGame() {
    gameActive = true;
    startButton.disabled = true;
    timerId = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.innerText = timeLeft;

            if (currentMole != null) {
                clearMoleTile();
            }

            let randomTile = Math.floor((Math.random() * 9) + 1);
            let moleTile = document.getElementById(`tile-${randomTile.toString()}`);

            currentMole = moleTile;

            moleTile.classList.add("moleTile");
        } else {
            gameActive = false;
            clearInterval(timerId);
        }
    }, 1000)
}

function resetGame() {
    clearInterval(timerId);
    if (currentMole) {
        currentMole.classList.remove("moleTile");
        currentMole = null;
    }
    timerId = null;
    currentMole = null;
    gameActive = false;
    timeLeft = 30;
    score = 0;
    startButton.disabled = false;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;
}

function increaseScore() {
    score += 10;
    scoreDisplay.innerText = score;
}

function clearMoleTile() {
    if (currentMole) {
        currentMole.classList.remove("moleTile");
    }
}

