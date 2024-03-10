'use strict'

const csslink = document.getElementById("csslink");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    csslink.setAttribute("href", csslink.getAttribute("href") === "./css/dark.css" ? "./css/light.css" : "./css/dark.css");
})