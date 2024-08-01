const boxes = document.querySelectorAll('.box');
const statusTxt = document.querySelector('.status');
const btnRestart = document.querySelector('#restart');

let x = "<img src='images/x.png' alt='X'>";
let o = "<img src='images/o.png' alt='O'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;

init();

function init() {
    boxes.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = `${player}, your Turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) {
        return;
    }
    updateBox(this, index);
    if (!checkWinner()) {
        changePlayer();
    }
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer() {
    player = player === "X" ? "O" : "X";
    currentPlayer = currentPlayer === x ? o : x;
    statusTxt.textContent = `${player}, your Turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusTxt.textContent = `${player} Wins!`;
        running = false;
        return true;
    } else if (!options.includes("")) {
        statusTxt.textContent = "Draw!";
        running = false;
        return true;
    }
    return false;
}

function restartGame() {
    player = "X";
    currentPlayer = x;
    options = ["", "", "", "", "", "", "", "", ""];
    statusTxt.textContent = `${player}, your Turn`;
    boxes.forEach(box => box.innerHTML = "");
    running = true;
}
