
// The first variable keeps track of the current player. 
// The second one is the empty arrey which stores the 
// squares that have been played. The third one indicates the game's status. 
let currentPlayer = "X"
let playedSquares = [];
let gameMode= "on";

// For loop is used to add event listeners to the nine squares of the board.
// When a square is clicked, it triggers the "clickSquare" funtion.
for (let i = 1; i < 10; i++) {
  let square = document.getElementById(i)
  square.addEventListener("click", (square) => clickedSquare(square))
}

// These empty arrays track the squares played by "x" and "o" players. 
let playerXMoves = [];
let playerOMoves = [];

// This function checks if the current player has won by comparing
// their moves with possible win comnimations. 
function checkWin() {
  const winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  // Check if the current player's moves match any winning combination. 
  const currentPlayerMoves = currentPlayer === "X" ? playerXMoves : playerOMoves;
  for (const combination of winCombinations) {
    if (combination.every(square => currentPlayerMoves.includes(square))) {
      return true; // Current player has won
    }
  }

  return false; // No winner yet
}


// This function is called when a square is clicked and checks the game's status. 
function clickedSquare(square) {
  if (gameMode === "off") {
    return;
  }
  let squareClicked = square.target;
  let switchPlayer = currentPlayer;
  const squareId = parseInt(squareClicked.id);

  // Check if the square is already filled
  if (playerXMoves.includes(squareId) || playerOMoves.includes(squareId)) {
    return; // Do nothing if the square is already occupied
  }

  squareClicked.innerHTML = currentPlayer;

  if (currentPlayer === "X") {
    playerXMoves.push(squareId);
    switchPlayer = "O";
  } else {
    playerOMoves.push(squareId);
    switchPlayer = "X";
  }

  //
  squareClicked.removeEventListener("click", clickedSquare);
  if (checkWin()) {
    alert(`Player ${currentPlayer === "X" ? "X" : "O"} wins!`);
    gameMode = "off";
  } else {
    currentPlayer = switchPlayer;
  }
}

// A "New Game" button in the HTML is associated with "newGameButton" variable. 
// When this button is clicked it clears the board to start a new game. 
let newGameButton = document.getElementById("new-game-button");

newGameButton.addEventListener("click", () => {
  // Clear the board
  for (let i = 1; i < 10; i++) {
    let square = document.getElementById(i);
    square.innerHTML = "";
    square.addEventListener("click", clickedSquare);
  }
console.log("new game button clicked");
  // Clear the move arrays
  playerXMoves = [];
  playerOMoves = [];

  currentPlayer = "X";
  gameMode = "on";
}); 