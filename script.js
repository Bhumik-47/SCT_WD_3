// --- Task 03: Tic-Tac-Toe Logic ---

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let gameActive = true; // State flag to know if the game is still running
let currentPlayer = "X";
// Array representing the board state: 9 empty strings initially
let gameState = ["", "", "", "", "", "", "", "", ""]; 

// All 8 possible winning combinations (indices of the gameState array)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Message functions
const winningMessage = (player) => `Player ${player} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;

// Set initial status message
statusDisplay.innerHTML = currentPlayerTurn();

/**
 * Updates the visual cell and the internal gameState array.
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class (X or O) for CSS coloring
}

/**
 * Checks the gameState against all winningConditions.
 */
function handleResultValidation() {
    let roundWon = false;
    let winningIndices = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        
        // Get the values from the three cells in the current condition
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // If any cell is empty, skip this condition
        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        // Check if all three values are the same (X, X, X or O, O, O)
        if (a === b && b === c) {
            roundWon = true;
            winningIndices = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(currentPlayer);
        gameActive = false;
        
        // Apply winning class to cells for visual highlight
        winningIndices.forEach(index => {
            cells[index].classList.add('winning');
        });
        return;
    }

    // Check for Draw: if no empty strings left and no winner
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // If no winner or draw, switch to the next player
    handlePlayerChange();
}

/**
 * Switches the current player and updates the status display.
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

/**
 * Main click handler for a cell.
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // 1. Guard Clauses: Do nothing if the cell is already played or game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // 2. Process the move
    handleCellPlayed(clickedCell, clickedCellIndex);
    
    // 3. Check results
    handleResultValidation();
}

/**
 * Resets all game variables and the board display.
 */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    
    // Clear the board display and remove styling classes
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O', 'winning'); 
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);