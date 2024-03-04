'use strict'

const canva = document.getElementById("canvas");
canva.width = "200";
canva.height = "200";
// canva.style.width = "100px";
// canva.style.height = "100px";
const ctx = canva.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(100, 100, 100, 100);