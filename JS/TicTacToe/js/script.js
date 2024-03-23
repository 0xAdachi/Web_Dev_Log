'use strict';

const gameBoard = document.getElementById("game-board");
let move = 'X';
let currRow, currCol;
// let board = new Array(new Array(3).fill(""), new Array(3).fill(""), new Array(3).fill(""));
let board = new Array.fill(new Array(3).fill(""));

const compareArrays = (arr1, arr2) => arr1.length === arr2.length && arr1.every((currValue, index) => currValue === arr2[index]);
// const arrayColumn = (arr, columnNum) => arr.map(currArr => currArr[columnNum]);
const arrayColumn = (board, colNum) => board.map(currArr => currArr[colNum]);

gameBoard.addEventListener("click", ({target}) => {
  currRow = target.parentNode.rowIndex;
  currCol = target.cellIndex;
  if(gameBoard.rows[currRow].cells[currCol].innerHTML == "")
  {
    move = move === 'X' ? 'O' : 'X';
    gameBoard.rows[currRow].cells[currCol].innerHTML = move;
    board[currRow][currCol] = move;
    // console.log(board);
    checkWin(board);
  }
})

function checkWin(board)
{
  const wins = [["O","O","O"], ["X","X","X"]];
  for(let i in board)
  {
    for(let j in wins)
    {
      if(compareArrays(board[i], wins[j])) console.log(`${board[i][0]} wins`);
      if(compareArrays(arrayColumn(board, i), wins[j])) console.log(`${board[0][i]} wins`);
    }
  }
  if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != "" || 
  board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != "") console.log(`${board[1][1]} wins`);
}