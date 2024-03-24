'use strict'

const canva = document.getElementById("canvas");
const ctx = canva.getContext("2d");
let cwidth = document.documentElement.clientWidth;
let cheight = document.documentElement.clientHeight;
ctx.canvas.width = cwidth;
ctx.canvas.height = cheight;
// ctx.lineWidth = 1;

let x = 0, y = 0;
const boxWidth = 100;
const boxHeight = 100;
let dx = Math.random() * 5;
let dy = Math.random() * 5;

let mousex = 0, mousey = 0;
window.addEventListener("mousemove", ({pageX, pageY}) => {
    mousex = pageX;
    mousey = pageY;
});

// console.log(`dx: ${dx}, dy: ${dy}`);

function loop(event)
{
    console.log(mousex);
    window.requestAnimationFrame(loop);

    ctx.clearRect(0, 0, cwidth, cheight);  // clears the screen
    // ctx.beginPath();

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cwidth, cheight);  // draw background

    checkCollision();  // check for collision with screen
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, boxWidth, boxHeight);  // draw box
    x += dx;  // add speed to box
    y += dy;  // add speed to box
    
    ctx.strokeStyle = "#FFFFFF";  // draw lines
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(mousex, mousey);

    ctx.moveTo(cwidth,0);
    ctx.lineTo(mousex, mousey);

    ctx.moveTo(0,cheight);
    ctx.lineTo(mousex, mousey);
    
    ctx.moveTo(cwidth,cheight);
    ctx.lineTo(mousex, mousey);
    ctx.stroke();
}

loop();

function checkCollision() {
    if(x > cwidth - boxWidth) dx = -dx;
    if(x < 0) dx = -dx;
    if(y > cheight - boxHeight) dy = -dy;
    if(y < 0) dy = -dy;
}