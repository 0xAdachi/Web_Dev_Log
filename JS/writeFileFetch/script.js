'use strict'

// let input = document.getElementById("input");
// let btn = document.getElementById("btn");

// let count = 0;

// function incCount()
// {
//     parseInt(count)++;

//     fetch("writeToFile.php", {
//         method: "post",
//         body: count.toString()
//     }).then(data => data.json()).then(res) => {
//         input.value = res.count;
//     };
// }

// init();\


const EL_increment = document.querySelector("#btn");
const EL_counter = document.querySelector("#input");
let counter = 0;

const incrementCounter = () => {
    counter = parseInt(counter) + 1;
    const FD = new FormData();
    FD.append("counter", counter);
    fetch("saveCounter.php", {
        method: 'post',
        body: FD
    }).then(data => data.json()).then((res) => {
        EL_counter.value = res.counter;
    });
};

const init = async () => {
    EL_increment.addEventListener("click", incrementCounter);
    counter = await fetch('counter.txt').then(response => response.text());
    EL_counter.value = counter;
};

init();