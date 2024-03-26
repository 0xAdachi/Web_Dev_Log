"use strict";

export class Pipe {
  constructor(pipeX, pipeY, pipeWidth, pipeHeight) {
    this.pipeX = pipeX ?? 0;
    this.pipeY = pipeY ?? 0;
    this.pipeWidth = pipeWidth ?? 50;
    this.pipeHeight = pipeHeight ?? 100;
  }

  // ### Draw Method ### //
  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx, pipeImg) {
    ctx.fillStyle = "#00FF00";
    // ctx.fillRect(this.pipeX, this.pipeY, this.pipeWidth, this.pipeHeight);
    ctx.drawImage(pipeImg, this.pipeX, this.pipeY, this.pipeWidth, this.pipeHeight);
  }

  // ### Physics ### //
  physics(){
    let dx = -6;
    this.pipeX += dx;
  }

  // ### AABB colison checking ### //
  checkCollision(playerX, playerY, playerWidth, playerHeight){
    if(playerX < this.pipeX + this.pipeWidth &&
      playerX + playerWidth > this.pipeX &&
      playerY < this.pipeY + this.pipeHeight &&
      playerY + playerHeight > this.pipeY){
       return true;
   }
  }

  static checkBoundary(cwidth, cheight, pipes){
    for(let pipe of pipes){
      if(pipe.getPipeX < 0){
        pipes.shift();
        pipes.push(new Pipe(cwidth, Math.floor(Math.random() * (cheight - 200)), 150 * 0.5625, 300));
        return true;
      }
    }
  }

  // ### getter methods ### //
  get getPipeX()      {return this.pipeX;}
  get getPipeY()      {return this.pipeY;}
  get getPipeWidth()  {return this.pipeWidth;}
  get getPipeHeight() {return this.pipeHeight;}
}
