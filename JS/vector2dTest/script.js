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

// ### Traingle Class ### //
class triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.dy;
    this.gravity;
  }

  draw(ctx) {
    ctx.moveTo(this.a.x, this.b.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.lineTo(this.c.x, this.c.y);
    ctx.lineTo(this.a.x, this.a.y);
  }

  physics() {
    // this.dy += this.gravity;
    this.a.add(0, this.dy);
    this.b.add(0, this.dy);
    this.c.add(0, this.dy);

    if (this.a.isColliding || this.b.isColliding || this.c.isColliding) {
      this.dy = 0;
    }
    // if (this.a.isColliding) {
    //   this.dy = -this.dy;
    //   this.a.y = scrHeight;
    // }
    // if (this.b.isColliding) {
    //   this.dy = -this.dy;
    //   this.b.y = scrHeight;
    // }
    // if (this.c.isColliding) {
    //   this.dy = -this.dy;
    //   this.c.y = scrHeight;
    // }
  }

}

// ### Vector2d Class ### //
class vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  get isColliding() { return this.y >= scrHeight || this.y <= 0 }
}


let vecta = new vector2d(50, 50);
let vectb = new vector2d(100, 50);
let vectc = new vector2d(50, 100);

let tria = new triangle(vecta, vectb, vectc);
tria.dy = 1;
// tria.gravity = 2;

function loop() {
  window.requestAnimationFrame(loop);

  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1;
  ctx.beginPath();

  tria.draw(ctx);
  tria.physics();

  ctx.stroke();
  ctx.closePath();
}
loop();