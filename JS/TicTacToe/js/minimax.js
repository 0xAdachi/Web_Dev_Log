"use strict";

const HUMAN_PLAYER = 'O';
const AI_PLAYER = 'X';
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

gameBoard.addEventListener("click", ({target}) => {
  if(canPlay) {
  let currRow = target.parentNode.rowIndex;
  let currCol = target.cellIndex;
  if(gameBoard.rows[currRow]?.cells[currCol].innerHTML == "") {
    let currIndex = (currRow * 3) + currCol;
    board[currIndex] = HUMAN_PLAYER;
    drawBoard(board, gameBoard);
    
    // ### AI Moves ### //
    let bestAImove = minimax(board, AI_PLAYER).move;
    board[bestAImove] = AI_PLAYER;
    let score = checkBoardState(board); 
    checkScore(score);
    drawBoard(board, gameBoard);
  }
}});

function checkBoardState(board) {
  for(let index in winCombs) {
    const [first, second, third] = winCombs[index];
    if(board[first] !== "" && board[first] === board[second] && board[second] === board[third])
    return board[first] === AI_PLAYER ? 10 : -10;
  }

  const isBoardFull = board.every((square) => square !== "");
  if(isBoardFull) return 0;

  return 'P';
}

function minimax(board, player) {
  // ### First we check if the game is over, if yes we just return the winner or tie ### //
  const winner = checkBoardState(board);
  if(winner !== 'P') return { score: winner, move: null };

  let bestScore = player === AI_PLAYER ? -1000 : 1000;
  let bestMove = null;

  for(let index = 0;  index < board.length; index++) {
    if(board[index] === "") {
      board[index] = player;
      const { score, move } = minimax(board, player === AI_PLAYER ? HUMAN_PLAYER : AI_PLAYER);
      board[index] = "";
      if (player === AI_PLAYER && score > bestScore) {
        bestScore = score;
        bestMove = index;
      } else if (player === HUMAN_PLAYER && score < bestScore) {
          bestScore = score;
          bestMove = index;
        }
    }
  }

  return {score: bestScore, move: bestMove};
}

const convertBoardTo2d = (board, board2d) => board.map((currVal, index) => board2d[Math.floor(index / 3)][index % 3] = currVal);
// const convertBoardTo2d = (board, board2d) => {
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       board2d[i][j] = board[(i * 3) + j];
//     }
//   }
// };

function drawBoard(board, gameBoard) {
  let board2d = [["","",""],["","",""],["","",""]];
  convertBoardTo2d(board, board2d);
  for(let i = 0; i < board2d.length; i++) {
    for(let j = 0; j < board2d[i].length; j++) {
      gameBoard.rows[i].cells[j].innerHTML = board2d[i][j];
    }
  }
}

function checkScore(score) {
  if(score === 'P') {
    gameState.textContent = "Playing Continues";
    gameState.style.color = "lime";
  } else if(score == 10) {
    gameState.textContent = "AI wins";
    gameState.style.color = "red";
    canPlay = false;
  } else {
    gameState.textContent = "It's a TIE";
    gameState.style.color = "gray";
    canPlay = false;
  }
}