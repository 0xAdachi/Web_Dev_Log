"use strict";

import {Pipe} from "./Pipe.js";

// ### Setting up Game props ### //
let score = 0;
let gameState = true;
const scoreKeeper = document.getElementById("score");
const scoreboard = document.querySelector(".score");
const gameKeeper = document.getElementById("gameover");
const loadingScreen = document.querySelector(".loading");

// ### Setting up Canvas ### //
/** @type {HTMLCanvasElement} */
const gameCanvas = document.getElementById("game_canvas");
const ctx = gameCanvas.getContext("2d");
const cwidth = document.documentElement.clientWidth;
const cheight = document.documentElement.clientHeight;
ctx.canvas.width = cwidth;
ctx.canvas.height = cheight;
const bgImg = new Image();

// ### Player properties ### //
const playerWidth = 100, 
      playerHeight = 100;
let playerX = cwidth/2 - playerWidth/2, 
    playerY = cheight/2 - playerHeight/2;
const playerImg = new Image();

// ### Physics ### //
let dy = 1;  // y - velocity
let gravity = 0.3;  // gravity

// ### Pipes ### //
const pipeImg = new Image();
let pipes = [];
for(let i = 1; i < 4; i++) {
  pipes.push(new Pipe(i * 400, Math.floor(Math.random()*200), 150 * 0.5625, 300));
}

// ### Main Game Event Loop ### //
function animationLoop() {
  if(!gameState){
    gameKeeper.style.display = "block";
  } else {
  window.requestAnimationFrame(animationLoop);

  ctx.clearRect(0, 0, cwidth, cheight);

  // ### draw background ### //
  ctx.fillStyle = "#000000";
  // ctx.fillRect(0, 0, cwidth, cheight);
  ctx.drawImage(bgImg, 0, 0, cwidth, cheight);

  // ### Player Physics ### //
  dy += gravity;
  playerY += dy;
  checkCollision();
  // ### Draw Player ### //
  ctx.fillStyle = "#ffc0cb";
  // ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
  ctx.drawImage(playerImg ,playerX, playerY, playerWidth, playerHeight);
  // ### Draw pipes and apply physics ### //
  if(Pipe.checkBoundary(cwidth, cheight, pipes)) score++;
  for(let pipe of pipes){
    pipe.physics();
    if(pipe.checkCollision(playerX, playerY, playerWidth, playerHeight)) gameState = false;
    pipe.draw(ctx, pipeImg);
  }
  // ### Score ### //
  scoreKeeper.textContent = score;
}
}

// ### Collision Checking ### //
function checkCollision() {
  if(playerY + playerHeight >= cheight) {
    dy = -dy;
    playerY = cheight - playerHeight; // prevent player from going out of bounds
    gameState = false;
  } else if(playerY <= 0) {
    dy = -dy;
    playerY = 0; // prevent player from going out of bounds
  }
}

// ### Detecting Player Inputs ### //
window.addEventListener("keydown", ({key}) => {
  if( key === " ") {
    dy = -10;  // add flapping
  }
});
window.addEventListener("mousedown", ({button}) => {
  if( button === 0) {
    dy = -10;  // add flapping
  }
});
gameKeeper.addEventListener("click", () => {
  window.location.reload();
});

// ### Run the game only after all the images has been loaded ### //
const loadImage = (img, src) =>
  new Promise((resolve, reject) => {
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

async function loadAllImages() {
  try {
    await loadImage(bgImg, "./assets/bg.png");
    await loadImage(playerImg, "./assets/adachi.png");
    await loadImage(pipeImg, "./assets/shimamura.png");
    animationLoop();
    scoreboard.style.visibility = "visible";
    loadingScreen.style.display = "none";
  } catch (error) {
    console.error("Loading Images Failed", error);
  }
}

setTimeout(() => {loadAllImages()}, 2000);