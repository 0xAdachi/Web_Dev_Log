'use strict';


const line = document.querySelector(".line");
const box = document.querySelector(".box");

const getCarteDist = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2));
const getAngle = (x1, y1, x2, y2) => (Math.atan2((y2 - y1) , (x2 - x1)) * 180) / Math.PI;

let boxX = box.getBoundingClientRect().left;
let boxY = box.getBoundingClientRect().top;

window.addEventListener("mousemove", (e) => {
    boxX = box.getBoundingClientRect().left + 25;
    boxY = box.getBoundingClientRect().top + 25;

    line.style.left = boxX + "px";
    line.style.top = boxY + "px";
    line.style.width = getCarteDist(boxX, boxY, e.pageX, e.pageY) + "px";
    line.style.transform = "rotate(" + getAngle(boxX, boxY, e.pageX, e.pageY) + "deg)";


    box.style.left = e.pageX + "px";
    box.style.top = e.pageY + "px";
})