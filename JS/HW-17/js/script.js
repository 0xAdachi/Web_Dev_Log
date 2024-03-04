'use strict';

// Element References
const curse = document.getElementById("curse");
const openBtn = document.querySelector(".openBtn");
const closeBtn = document.querySelector(".closeBtn");
const curtain = document.querySelector(".curtain");
const logger = document.querySelector(".logger");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
let isOnLogger = false;

togglePassword.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type)

    togglePassword.classList.toggle("bi-eye");
})

// Do when mouse is moving
window.addEventListener("mousemove", (e) => {
    curse.style.left = e.pageX + "px";
    curse.style.top  = e.pageY + "px";

    if(e.target.classList.contains("sc") || e.target.classList.contains("out"))
    {
        curse.textContent = "{ }";
        curse.style.color = "lime";
    } else if(isOnLogger)
    {
        curse.textContent = "0 1";
        curse.style.color = "red";
    } else
    {
        curse.textContent = "< />";
        curse.style.color = "lime";
    }
});

// Read the JS source and add it to a pre element
var sourceCode = new XMLHttpRequest();
    var allText = "file not found";
    sourceCode.onreadystatechange = () => {
        if (sourceCode.readyState == 4 && sourceCode.status == 200) {
            allText = sourceCode.responseText;
            // allText = allText.split("\n").join("&lt;br&gt;");
        }

        document.querySelector('.out').innerHTML = allText;
    }
sourceCode.open("GET", './js/script.js', true);
sourceCode.send(null);

function closeSideNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("container").style.marginLeft = "0";
    document.getElementById("container").style.marginTop = "0px";
    curtain.style.width = "0";
}

openBtn.addEventListener("click", () => {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("container").style.marginLeft = "250px";
    document.getElementById("container").style.marginTop = "-17px";
    curtain.style.width = "100vw";
});

logger.addEventListener("mouseenter", () => {
    isOnLogger = true;
});
logger.addEventListener("mouseleave", () => {
    isOnLogger = false;
});

closeBtn.addEventListener("click", closeSideNav);

curtain.addEventListener("click", closeSideNav);


