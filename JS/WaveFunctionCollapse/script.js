"use strict";

import { Tile } from "./Tile.js";

// ### Setting up the canvas ### //
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @param {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext("2d");
const scrHeight = document.documentElement.clientHeight;
ctx.canvas.width= scrHeight;
ctx.canvas.height= scrHeight;

const DIM = 50;  // GRID SIZE

// ### Setting Tile properties ### //
let blankTile = new Tile(0);
let upTile = new Tile(1);
let rightTile = new Tile(2);
let downTile = new Tile(3);
let leftTile = new Tile(4);
let tileList = [blankTile, upTile, rightTile, downTile, leftTile];
let allTiles = create2DArray(DIM, DIM);
let nextAllTiles = create2DArray(DIM, DIM);
allTiles[0][0] = upTile;


function draw() {
  // ### Draw the background ### //  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, scrHeight, scrHeight);

  // ### Loop over the grid ### //
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {

      allTiles[j][i]?.drawTile(ctx, i * scrHeight/DIM, j * scrHeight/DIM, scrHeight/DIM, scrHeight/DIM); // draw the tiles
      allTiles[j][i]?.collapseWaveFunction(nextAllTiles, i, j, DIM, tileList);  // collapse the wavefunction around the tile
      
    }
  }

  allTiles = nextAllTiles;  // update to next frame 
  nextAllTiles = create2DArray(DIM, DIM);  // reset the frame after
  
  setTimeout(draw, 500);  // calls the draw function every 0.5 seconds
}

// ### Only start the drawing loop after every image has been loaded ### //
async function loadAllImages() {
  try {
    await blankTile.loadImage();
    await upTile.loadImage();
    await rightTile.loadImage();
    await downTile.loadImage();
    await leftTile.loadImage();
    draw();
  } catch (error) {
    console.error("Loading Images Failed", error);
  }
}

loadAllImages();  // load the images

// ### One thing I learnt from this is Javascript is bad at 2D arrays ### //
// ### also techinally you can do the following by use Array.from and .map method ### //
function create2DArray(rows, cols) {
  let array = [];
  for (let i = 0; i < rows; i++) {
      array[i] = [];
      for (let j = 0; j < cols; j++) {
          array[i][j] = null;
      }
  }
  return array;
}
