"use strict";

// ### Setting up the canvas ### //
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @param {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext("2d");
const scrWidth = document.documentElement.clientWidth;
const scrHeight = document.documentElement.clientHeight;
const canvasSize = scrWidth > scrHeight ? scrHeight : scrWidth;
ctx.canvas.width= canvasSize;
ctx.canvas.height= canvasSize;

let DIM = 10;

let path = new Path2D();

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvasSize, canvasSize);

ctx.strokeStyle = "#FFFFFF";
ctx.lineWidth = 1;
ctx.beginPath();

ctx.translate(canvasSize / 2, canvasSize / 2);
ctx.rotate(Math.PI * 30 / 180);

for (let i = 0; i < DIM; i++) {
  for (let j = 0; j < DIM; j++) {
    const x = i * canvasSize / DIM;
    const y = j * canvasSize / DIM;
    
    // Draw horizontal and vertical lines
    path.moveTo(x, y);
    path.lineTo(x + canvasSize / DIM, y);
    path.moveTo(x, y);
    path.lineTo(x, y + canvasSize / DIM);
    
    if (i < DIM  && j >= 0) {
      path.moveTo(x, y + canvasSize / DIM);
      path.lineTo(x + canvasSize / DIM, y);
    }
  }
}

ctx.translate(-canvasSize / 2, -canvasSize / 2);
ctx.stroke(path);
ctx.closePath();