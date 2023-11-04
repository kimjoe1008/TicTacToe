const statusDisplay = document.querySelector('.status'); //select status header
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; //all the empty tiles
const winningMessage = () => `Player ${currentPlayer} has won!`;
//equal to const winningMessage = function() {return String}; much more concise this way
const tieMessage = () => `Game ended in a tie!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//all possible boards that would result in a win
//hold which indices need to be held to result in a win

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    //sets the index of gamestate array to equal X or O
    clickedCell.innerHTML = currentPlayer;
    //changes the text of the cell to be equal to X or O
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //checks if currentPlayer is X
    //if equal to X then ? is executed which changes currentPlayer to O
    //if not equal to X then : is executed which changes currentPlayer to X
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let index = 0; index < 7; index++) {
        //run for all possible winning conditions
        const winCondition = winningConditions[index];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //a b and c hold which player holds each position at the current win condition being checked

        if (a === '' || b === '' || c === '') {
            continue;
        }
        //since the a b and c check for if the index is occupied, you must check to see if they are all occupied by the same player

        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        //changes status display to display the winning message text
        gameActive = false;
        return;
    }

    let roundTie = !gameState.includes("");
    //checks if there is any cell in game state that isnt filled
    if (roundTie) {
        statusDisplay.innerHTML = tieMessage();
        gameActive = false;
        return;
    }
    //to check for a tie

    handlePlayerChange();
}

function handleCellClick() { 
    const clickedCell = event.target;
    //save the clicked cell to call upon again

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //get attribute of the cell that was clicked and turn it into an int so we know which cell number was clicked on

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    //if the game is paused or the cell is not empty then ignore the click

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    //resets the whole game back to the original state
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);