"use strict";
/** @type {HTMLCanvasElement} canvas */
const canvas = document.getElementById("canvas");
/** @param {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./adachi.png";
image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0)

  convertImageToGray(ctx, image.width, image.height);
};

const toGrayScale = (red, green, blue) => 0.21 * red + 0.72 * green + 0.07 * blue;

const convertImageToGray = (ctx, width, height) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const grayscales = [];
  for (let i = 0; i < imageData.data.length; i+=4) {
    const red = imageData.data[i];
    const green = imageData.data[i+1];
    const blue = imageData.data[i+2];
    const grayscale = toGrayScale(red, blue, green);
    imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = grayscale;
    grayscales.push(grayscale);
  }
  
  ctx.putImageData(imageData, 0, 0);

  return grayscales;
};