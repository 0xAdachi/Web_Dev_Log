'use strict'

const canva = document.getElementById("canvas");
canva.width = document.body.clientWidth;
canva.height = 862;
// canva.height = "200";
// canva.style.width = "100px";
// canva.style.height = "100px";
const ctx = canva.getContext("2d");

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(200,200);
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.stroke();
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(100, 100, 100, 100);

window.addEventListener("mousemove", (e) => {
    ctx.clearRect(0, 0, 1920, 1080);
    // ctx.clear();
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();
})