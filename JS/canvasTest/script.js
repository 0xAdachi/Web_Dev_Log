'use strict'

const canva = document.getElementById("canvas");
const ctx = canva.getContext("2d");
let x = 0, y;
const dx = 1.5;

// ctx.beginPath();
// ctx.moveTo(0,0);
// ctx.lineTo(200,200);
// ctx.strokeStyle = "black";
// ctx.lineWidth = 1;
// ctx.stroke();
// // ctx.fillStyle = "#FF0000";
// // ctx.fillRect(100, 100, 100, 100);

// window.addEventListener("mousemove", (e) => {
//     ctx.clearRect(0, 0, 1920, 1080);
//     // ctx.clear();
//     ctx.fillStyle = "#FF0000";
//     ctx.fillRect(e.pageX, e.pageY, 100, 100);

//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     ctx.lineTo(e.pageX, e.pageY);
//     ctx.stroke();
// })

function loop()
{
    window.requestAnimationFrame(loop);

    let cwidth = document.documentElement.clientWidth;
    let cheight = document.documentElement.clientHeight;

    // console.log(`Width: ${cwidth}, Height: ${cheight}`);
    ctx.canvas.width = cwidth;
    ctx.canvas.height = cheight;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cwidth, cheight);

    ctx.fillStyle ="#FF0000";
    ctx.fillRect(x, 0, 100, 100);
    x += dx;
}

loop();