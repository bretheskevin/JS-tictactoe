const grid = document.getElementsByClassName("boxes-content");

const actualPlayer = document.getElementById("player");
const info = document.getElementById("info");
const infoEmpty = info.textContent;
const restartBtn = document.getElementById("restart");
let player = "O";

let player1win = 0;
let player2win = 0;
let gameEnded = false;


function updatePlayer() {
    if (actualPlayer.textContent == "Player 1 - O") {
        actualPlayer.textContent = "Player 2 - X";
        player = "X";
    } else {
        actualPlayer.textContent = "Player 1 - O";
        player = "O";
    }

}


function errorBox(i) {
    // box not empty
    if (grid[i].textContent != "" && grid[i].textContent != infoEmpty) {
        info.textContent = "The box isn't empty !";
        return true;
    }

    info.textContent = infoEmpty;
    return false;
}

function udpateBox(i) {
    if (player === "O") {
        grid[i].textContent = "O";
    } else {
        grid[i].textContent = "X";
    }
}

function restart(player) {
    for (let i = 0; i < 9; i++) {
        grid[i].textContent = infoEmpty;
    }
    gameEnded = false;
}

function updateScore(player) {
    const player1score = document.getElementById("score1");
    const player2score = document.getElementById("score2");

    if (player == "O") {
        player1win++;
    } else {
        player2win++;
    }

    player1score.textContent = "Player 1 : " + player1win;
    player2score.textContent = "Player 2 : " + player2win;
    restartBtn.disabled = false;
}

function verifyRows(player) {
    return (grid[0].textContent == player && grid[1].textContent == player && grid[2].textContent == player) ||
        (grid[3].textContent == player && grid[4].textContent == player && grid[5].textContent == player) ||
        (grid[6].textContent == player && grid[7].textContent == player && grid[8].textContent == player);
}

function verifyColumns(player) {
    return (grid[0].textContent == player && grid[3].textContent == player && grid[6].textContent == player) ||
        (grid[1].textContent == player && grid[4].textContent == player && grid[7].textContent == player) ||
        (grid[2].textContent == player && grid[5].textContent == player && grid[8].textContent == player);
}

function verifyDiagonals(player) {
    return (grid[0].textContent == player && grid[4].textContent == player && grid[8].textContent == player) ||
        (grid[2].textContent == player && grid[4].textContent == player && grid[6].textContent == player);
}

function verify(player) {
    let win = false;

    if (verifyRows(player)) {
        info.textContent = player + " has won !";
        win = true;
    } else if (verifyColumns(player)) {
        info.textContent = player + " has won !";
        win = true;
    } else if (verifyDiagonals(player)) {
        info.textContent = player + " has won !";
        win = true;
    }

    if (win == true) {
        updateScore(player);
        gameEnded = true;
        return true;
    }


    return win;
}

function checkTie() {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (grid[i].textContent == "X" || grid[i].textContent == "O") {
            count++;
        }
    }

    if (count == 9) {
        restartBtn.disabled = false;
        info.textContent = "TIE !"
    }

}

for (let i = 0; i < 9; i++) {
    grid[i].addEventListener("click", function() {




        if (gameEnded == false) {

            if (!errorBox(i)) {
                udpateBox(i);

                checkTie();
                verify(player);
                updatePlayer();
            }
        }
    })
}

restartBtn.addEventListener("click", function() {
    restart();
    restartBtn.disabled = true;
})