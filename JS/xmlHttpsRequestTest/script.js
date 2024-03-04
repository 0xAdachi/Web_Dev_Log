'use strict'

let input = document.getElementById("input");
let output = document.getElementById("output");

let inputVal = input.value;
// let outputVal = output.value;

let tempMem = "";

input.addEventListener("keyup", () => {
    inputVal = input.value;
    // console.log(inputVal);
    // tempMem = inputVal;
    output.textContent = inputVal;
    changeOutput(inputVal);
})

function changeOutput(writeVal)
{
    // fetch("cache.txt", {
    //     method: "POST",
    //     body: tempMem,
    // }).then(
    //     response => response.text()
    // ).then(
    //     html => console.log(html)
    // );

    fetch("/cache.txt", /* this is the options parameter that allows us to customise our request more */ {
        method: "POST", // we are sending a POST request
        headers: {
            "Content-Type": "application/json" // tell the server we are sending text in the JSON format (JSON is probably the most commonly used format for sending data using requests)
        },
        body: JSON.stringify({
            "file": "cache.txt",
            "content": "Hello world!"
        }) // body is the actual content we are sending to the server, we need to convert this to a string, but it will be read as on object again by the server
    })
        .then();



    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () =>
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            // inputVal = this.responseText;
            console.log(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","cache.txt");
    xmlhttp.send();
}