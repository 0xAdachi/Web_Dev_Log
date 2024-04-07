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


class vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.lineTo(this.x, this.y);
  }

  update() {
    this.x += Math.random() * 50 * (Math.round(Math.random()) * 2 - 1);
    this.y += Math.random() * 50 * (Math.round(Math.random()) * 2 - 1);

    if (this.x < 0) this.x = canvasSize >> 1;
    if (this.x > canvasSize) this.x = canvasSize >> 1;
    if (this.y < 0) this.y = canvasSize >> 1;
    if (this.y > canvasSize) this.y = canvasSize >> 1;
  }
}


// let veca = new vector2d(0, 0);
// let vecb = new vector2d(50, 50);
// let vecc = new vector2d(100, 0);
// let vecd = new vector2d(150, 100);
// let vece = new vector2d(200, 0);

// let vecList = [veca, vecb, vecc, vecd, vece];
let vecList = [];

// max : 1824000
for (let i = 0; i < 50; i++) {
  vecList.push(new vector2d(i*40, i*60));
}

function loop() {
  window.requestAnimationFrame(loop);

  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1;
  ctx.beginPath();

  // ctx.moveTo(0, 0);
  for(let vec of vecList) {
    vec.draw(ctx);
    vec.update();
    // console.log(`X: ${vec.x}, Y: ${vec.y}`);
  }

  ctx.stroke();
  ctx.closePath();
}
loop();