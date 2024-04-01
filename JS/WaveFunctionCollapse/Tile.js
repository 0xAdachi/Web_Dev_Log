const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

export class Tile {
  tileImg;
  edges;
  
  constructor(type) {
    this.type = type ?? 1;
    this.collapsed = false;
    this.tileImg = new Image();
    
    switch (this.type) {
      case 0:
        this.edges = [0, 0, 0, 0];
        break;
      
      case 1:
        this.edges = [1, 1, 0, 1];
        break;
      
      case 2:
        this.edges = [1, 1, 1, 0];
        break;
      
      case 3:
        this.edges = [0, 1, 1, 1];
        break;
      
      case 4:
        this.edges = [1, 0, 1, 1];
        break;
    
      default:
        break;
    }
  }

  // ### DRAW METHOD ### //
  drawTile(ctx, x, y, width, height) {
    ctx.drawImage(this.tileImg, x, y, width, height);
  }

  collapse(tileList) {
    let waveFunction = [0, 0, 0, 0];
    let upWaveFunction = [];
    let rightWaveFunction = [];
    let downWaveFunction = [];
    let leftWaveFunction = [];
    for (let tile of tileList) {
      if (this.edges[UP] == tile.edges[DOWN]) upWaveFunction.push(tile.type);
      if (this.edges[RIGHT] == tile.edges[LEFT]) rightWaveFunction.push(tile.type);
      if (this.edges[DOWN] == tile.edges[UP]) downWaveFunction.push(tile.type);
      if (this.edges[LEFT] == tile.edges[RIGHT]) leftWaveFunction.push(tile.type);
    }

    // ### Collapse the SuperPosition ### //

    waveFunction[UP] = upWaveFunction[Math.floor(Math.random()*upWaveFunction.length)];
    waveFunction[RIGHT] = rightWaveFunction[Math.floor(Math.random()*rightWaveFunction.length)];
    waveFunction[DOWN] = downWaveFunction[Math.floor(Math.random()*downWaveFunction.length)];
    waveFunction[LEFT] = leftWaveFunction[Math.floor(Math.random()*leftWaveFunction.length)];

    return waveFunction;
  }

  // ### Boundary checking and applying the collapsed wave function ### //
  collapseWaveFunction(nextAllTiles, i, j, dim, tileList) {

    nextAllTiles[j][i] = this;
    nextAllTiles[j][i].collapsed = true;

    // ### Top neighbor ### //
    if (j - 1 >= 0) {
      if (nextAllTiles[j-1][i]?.collapsed !== true) {
        nextAllTiles[j-1][i] = tileList[this.collapse(tileList)[UP]];
        nextAllTiles[j-1][i].collapsed = true;
      }
    }

    // ### Bottom neighbor ### //
    if (j + 1 < dim) {
      if (nextAllTiles[j+1][i]?.collapsed !== true) {
        nextAllTiles[j+1][i] = tileList[this.collapse(tileList)[DOWN]];
        nextAllTiles[j+1][i].collapsed = true;
      }
    }

    // ### Right neighbor ### //
    if (i + 1 < dim) {
      if (nextAllTiles[j][i+1]?.collapsed !== true) {
        nextAllTiles[j][i+1] = tileList[this.collapse(tileList)[RIGHT]];
        nextAllTiles[j][i+1].collapsed = true;
      }
    }

    // ### Left neighbor ### //
    if (i - 1 >= 0) {
      if (nextAllTiles[j][i-1]?.collapsed !== true) {
        nextAllTiles[j][i-1] = tileList[this.collapse(tileList)[LEFT]];
        nextAllTiles[j][i-1].collapsed = true;
      }
    }

  }

  // ### Load the images for the tiles depending on type ### //
  loadImage() {
    let imgSrc = "./assets/UP.png";
    if(this.type == 0) imgSrc = "./assets/BLANK.png";
    if(this.type == 1) imgSrc = "./assets/UP.png";
    if(this.type == 2) imgSrc = "./assets/RIGHT.png";
    if(this.type == 3) imgSrc = "./assets/DOWN.png";
    if(this.type == 4) imgSrc = "./assets/LEFT.png";

      return new Promise((resolve, reject) => {
      this.tileImg.src = imgSrc;
      this.tileImg.onload = () => resolve(this.tileImg);
      this.tileImg.onerror = reject;
    });
  }

  // ### useless getter method that I never used ### //
  get tileType() { return this.type }
}
