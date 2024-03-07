// Cell States
const CellValue = {
  X: "x",
  O: "o",
};

// Game State
const GameStates = {
  X_WON: "X Wins!",
  O_WON: "O Wins!",
  TIE: "Its a Tie!",
  IN_PROGRESS: "In Progress...",
};

// Current Game State
let currentGameState;

// Win Cells [cells that make up the win]
let win_cells;

// Declare the current turn
let turn;

// Declare the game set and lists
let Game_set;
let X_list;
let O_list;

// Get the board element using its ID
const board = document.getElementById("board");

// Get the status element using its ID
const status_bar = document.getElementById("status");

// Restart Game
let restartGame = () => this.location.reload();

// Toggle Board Turn
function toggleBoardTurn() {
  board.classList.toggle(CellValue.X);
  board.classList.toggle(CellValue.O);
}

// Toggle Status Bar
function toggleStatusBar() {
  status_bar.classList.toggle(CellValue.X);
  status_bar.classList.toggle(CellValue.O);
  if (status_bar.classList.contains("x")) {
    status_bar.innerHTML = "X's Turn";
  } else if (status_bar.classList.contains("o")) {
    status_bar.innerHTML = "O's Turn";
  }
}

// Switch the turn
function switchTurn() {
  turn = turn === CellValue.X ? CellValue.O : CellValue.X;
  toggleBoardTurn();
  toggleStatusBar();
}

// Set the win state
function setwin() {
  //Toggle the status bar to the current game state
  toggleStatusBar();
  // Highlight the win cells
  if (win_cells !== undefined) {
    win_cells.forEach((i) => {
      document.querySelector(`[data-cell="${i}"]`).classList.add("win");
    });
  }

  // Set the status bar to the current game state
  status_bar.innerHTML = currentGameState;
  status_bar.classList.add(currentGameState === GameStates.TIE ? "tie" : "win");

  // Remove the event listener from the cells
  const cells = document.querySelectorAll("[data-cell]");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });

  // Remove the X and O classes from the board
  board.classList.remove(CellValue.X);
  board.classList.remove(CellValue.O);

  // Create restart game button from the game title
  const GameTitle = document.getElementById("GameTitle");
  GameTitle.innerHTML = "Click here to restart";
  GameTitle.classList.add("restart");
  GameTitle.addEventListener("click", restartGame);
}

// Check for the two sum [sub process to sum three numbers to 15]
// Time Complexity: O(n) i.e at max 9 checks
function checkTwoSum(target, list) {
  if (list.length < 2) {
    return false;
  }

  // Set to store complements
  // Searching in a set is O(1)
  const complements = new Set();

  // Iterate through the list
  for (let i = 0; i < list.length; i++) {
    // Calculate the complement
    // this reduces the problem to a linear search
    const complement = target - list[i];
    if (complements.has(list[i])) {
      // Set the win cells
      win_cells = [complement, list[i], 15 - target];
      return true;
    }
    complements.add(complement);
  }
  return false;
}

// Update Game State
function UpdateGameState(data) {
  Game_set.delete(data);

  if (turn === CellValue.X) {
    // Check if the sum of any three numbers is 15 in X_list
    // 15 - data is the number that will make the sum 15
    // which reduces the problem to a two sum problem
    if (checkTwoSum(15 - data, X_list)) {
      currentGameState = GameStates.X_WON;
    } else {
      X_list.push(data);
    }
  } else {
    // Check if the sum of any three numbers is 15 in O_list
    // 15 - data is the number that will make the sum 15
    // which reduces the problem to a two sum problem
    if (checkTwoSum(15 - data, O_list)) {
      currentGameState = GameStates.O_WON;
    } else {
      O_list.push(data);
    }
  }

  // Check if the game is a tie
  if (Game_set.size === 0 && currentGameState === GameStates.IN_PROGRESS) {
    currentGameState = GameStates.TIE;
  }
}

// Event handler for cell click
function handleCellClick(event) {
  const cell = event.target;
  cell.classList.add(turn);
  UpdateGameState(parseInt(cell.getAttribute("data-cell")));
  switchTurn();
  if (currentGameState !== GameStates.IN_PROGRESS) {
    setwin();
  }
}

// Create a new game
function CreateGame() {
  //initialize the game set and lists
  Game_set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  X_list = [];
  O_list = [];

  // Get all the cells using querySelectorAll
  const cells = document.querySelectorAll("[data-cell]");

  // Add event listener for each cell
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  // Set the turn to X
  turn = CellValue.X;

  // Clear the board and status classes
  board.classList.remove(CellValue.X);
  board.classList.remove(CellValue.O);
  status_bar.classList.remove(CellValue.X);
  status_bar.classList.remove(CellValue.O);

  // Add the X class to the board for the first turn
  board.classList.add(CellValue.X);
  status_bar.classList.add(CellValue.X);

  // Set Game State
  currentGameState = GameStates.IN_PROGRESS;
}

// Main Function Call
CreateGame();
