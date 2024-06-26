"use strict";

// ### Game Constants ### //
const HUMAN_PLAYER = "O";
const AI_PLAYER = "X";
let board = new Array(9).fill("");
const winCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let canPlay = true;
const gameBoard = document.getElementById("game-board");
const gameState = document.getElementById("gameState");

gameBoard.addEventListener("click", ({ target }) => {
  // ### if the game is not over ### //
  if (canPlay) {
    let currRow = target.parentNode.rowIndex;
    let currCol = target.cellIndex;
    // ### if player chose a valid move ### //
    if (gameBoard.rows[currRow]?.cells[currCol].innerHTML == "") {
      let currIndex = currRow * 3 + currCol;
      // ### take the move and update the board ### //
      board[currIndex] = HUMAN_PLAYER;
      drawBoard(board, gameBoard);

      // ### AI figure outs the best move and takes it ### //
      let bestAImove = minimax(board, 0, -Infinity, Infinity, AI_PLAYER).move;
      board[bestAImove] = AI_PLAYER;
      let score = checkBoardState(board);
      // ### we check if game is over or not ### //
      checkScore(score);
      drawBoard(board, gameBoard);
    }
  }
});

function checkBoardState(board) {
  // ### we check if current board has any winning combination ### //
  for (let index in winCombs) {
    const [first, second, third] = winCombs[index];
    if (
      board[first] !== "" &&
      board[first] === board[second] &&
      board[second] === board[third]
    )
      return board[first] === AI_PLAYER ? 10 : -10; // we return a score based on who won
  }

  const isBoardFull = board.every((square) => square !== "");
  if (isBoardFull) return 0;  // return score of 0 if it's a tie

  return "P";  // otherwise return that game is still in playing
}

function minimax(board, depth, alpha, beta, player) {
  // ### First we check if the game is over, if yes we just return the winner score or tie ### //
  const winner = checkBoardState(board);
  if (winner !== "P") {
    return {score: winner - depth, move: null};  // taking depth into account so the AI will chose shortest win path
  }
  // ### assume the best or worst possible future ### //
  let bestScore = player === AI_PLAYER ? -1000 : 1000;
  let bestMove = null;

  // ### for the valid moves remaining ### //
  for (let index = 0; index < board.length; index++) {
    if (board[index] === "") {
      board[index] = player;  // take the valid move and check all possible futures
      const { score } = minimax(board, depth + 1, alpha, beta, player === AI_PLAYER ? HUMAN_PLAYER : AI_PLAYER);
      board[index] = "";
      if (player === AI_PLAYER && score > bestScore) {
        bestScore = score;  // update best score and best move accordingly with who's current player
        bestMove = index;
        // ### If a move is found that causes the current player's score to be worse than the opponent's best score, it can be safely pruned (skipped) ### //
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      } else if (player === HUMAN_PLAYER && score < bestScore) {
        bestScore = score;  // update best score and best move accordingly with who's current player
        bestMove = index;
        beta = Math.min(beta, score);  // alpha beta pruning -> *81 line for desc
        if (beta <= alpha) break;
      }
    }
  }

  return { score: bestScore, move: bestMove };  // return the best score and best move
}

const convertBoardTo2d = (board, board2d) => board.map((currVal, index) => (board2d[Math.floor(index / 3)][index % 3] = currVal));
// const convertBoardTo2d = (board, board2d) => {
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       board2d[i][j] = board[(i * 3) + j];
//     }
//   }
// };

// ### draw the board on screen ### //
function drawBoard(board, gameBoard) {
  let board2d = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  convertBoardTo2d(board, board2d);
  for (let i = 0; i < 9; i++) {
    gameBoard.rows[Math.floor(i / 3)].cells[i % 3].innerHTML = board2d[Math.floor(i / 3)][i % 3];
  }
}

// ### checks the score to see game state and update display ### //
function checkScore(score) {
  if (score === "P") {
    gameState.textContent = "Playing Continues";
    gameState.style.color = "lime";
  } else if (score == 10) {
    gameState.textContent = "AI wins";
    gameState.style.color = "red";
    canPlay = false;
  } else if(score == -10) {
    gameState.textContent = "HUMAN wins, which shouldn't happen. Please notice ABJ about this so he can fix the stupid code";
    gameState.style.color = "gold";
    canPlay = false;
  } else {
    gameState.textContent = "It's a TIE";
    gameState.style.color = "gray";
    canPlay = false;
  }
}
