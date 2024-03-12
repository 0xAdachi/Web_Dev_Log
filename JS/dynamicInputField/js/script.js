let inputH = "<div><input class=\"extIn\" type=\"text\"><button class=\"remBtn\">Remove</button></div>";

$("#addIn").on("click", () => {
    $(".input-field-wrapper").append(inputH);
})

$(".input-field-wrapper").on("click",".remBtn", function() {
    $(this).parent().remove();
})


// ###### Without jQuery ###### //

// 'use strict';

// const addBtn = document.getElementById("addIn");
// const inputFieldWrapper = document.querySelector(".input-field-wrapper");

// addBtn.addEventListener("click", () => {
//     const newInputField = document.createElement("div");
//     const newInput = document.createElement("input");
//     const newButton = document.createElement("button");
//     newInput.type = "text";
//     newInput.classList.add("extIn");
//     newButton.textContent = "Remove";
//     newButton.classList.add("remBtn");
    
//     newInputField.appendChild(newInput);
//     newInputField.appendChild(newButton);

//     inputFieldWrapper.appendChild(newInputField);


//     newButton.addEventListener("click", () => {
//         inputFieldWrapper.removeChild(newInputField);
//     })
// })