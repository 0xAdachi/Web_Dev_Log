"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @param {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext("2d");

// const scrWidth = document.documentElement.clientWidth;
const scrHeight = document.documentElement.clientHeight;
ctx.canvas.width= scrHeight;
ctx.canvas.height= scrHeight;

// ### Grid ### //
let gridWidth = scrHeight >> 1;
let gridHeight = scrHeight >> 1;
let DIM = 10;

let red = 0, green = 0, blue = 0;

const changeColor = () => {
  red = Math.floor(Math.random() * 255);
  green = Math.floor(Math.random() * 255);
  blue = Math.floor(Math.random() * 255);
};

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, scrHeight, scrHeight)

let i = 0, j = 0;
const delay = 250;

// ### Drawing ### //
// const fillGridCells = () => {
//   for (let i = 0; i < DIM; i++) {
//     for (let j = 0; j < DIM; j++) {
//       changeColor();
//       ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
//       ctx.fillRect(i * scrHeight/DIM, j * scrHeight/DIM, scrHeight/DIM-1, scrHeight/DIM-1);
//     }
//   }
// }

// let i = 0, j = 0;
// const delay = 100; // Delay between each grid cell in milliseconds
let lastTime = 0;

const fillGridCells = (currentTime) => {
  if (currentTime - lastTime >= delay) {
    lastTime = currentTime;
    changeColor();
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(i * scrHeight / DIM, j * scrHeight / DIM, scrHeight / DIM - 1, scrHeight / DIM - 1);

    j++;
    if (j === DIM) {
      j = 0;
      i++;
    }

    if (i < DIM && j < DIM) {
      requestAnimationFrame(fillGridCells);
    }
  } else {
    requestAnimationFrame(fillGridCells);
  }
};

requestAnimationFrame(fillGridCells);