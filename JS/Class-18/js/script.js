'use strict';

function main()
{
    let mathNum = document.getElementById("math").value;
    let physNum = document.getElementById("phys").value;
    let chemNum = document.getElementById("chem").value;
    let histNum = document.getElementById("hist").value;
    let itNum = document.getElementById("it").value;
    let allNum = [mathNum, physNum, chemNum, histNum, itNum];

    if(checkGradeValidity(allNum))
    {
        // console.log("all grades are valid");
        let mathGrade = gradeNumber(mathNum);
        let physGrade = gradeNumber(physNum);
        let chemGrade = gradeNumber(chemNum);
        let histGrade = gradeNumber(histNum);
        let itGrade = gradeNumber(itNum);
        printOutput(mathGrade, physGrade, chemGrade, histGrade, itGrade, allNum);
    } else 
    {
        alert("Numbers range from 0 to 100");
    }

}


// Checks if the input grade is an actual grade that has range from 0 to 100
function properGrade(grade)
{
    if (grade < 0 || grade > 100 || grade === "")
    {
        return false;
    } else
    {
        return true;
    }
}

// Checks if all the numbers are proper grade numbers
function checkGradeValidity(allNum)
{
    let isValid = true;
    for(let i = 0; i < allNum.length; i++)
    {
        if(!properGrade(allNum[i]))
        {
            isValid = false;
        }
    }
    return isValid;
}

// Gives grade based on input number
function gradeNumber(gradeNum)
{
    let grade = "";
    let color = "";

    if(gradeNum >= 0 && gradeNum < 33)
    {
        grade = "Fail";
        color = "red";
    } else if(gradeNum >= 33 && gradeNum < 40)
    {
        grade = "D";
        color = "#ff7300";
    } else if(gradeNum >= 40 && gradeNum < 50)
    {
        grade = "C";
        color = "#fffb00";
    } else if(gradeNum >= 50 && gradeNum < 60)
    {
        grade = "B";
        color = "blue";
    } else if(gradeNum >= 60 && gradeNum < 70)
    {
        grade = "A-";
        color = "lime";
    } else if(gradeNum >= 70 && gradeNum < 80)
    {
        grade = "A";
        color = "pink";
    } else if(gradeNum >= 80 && gradeNum <= 100)
    {
        grade = "A+";
        color = "black";
    }
    
    return [grade, color];
}

// Returns the average of the array of numbers
function averageGrader(numbers)
{
    let sum = 0;
    for(let i = 0; i < numbers.length; i++)
    {
        sum += Number(numbers[i]);
    }
    return sum / numbers.length;
}

// Prints the output on the document file
function printOutput(mathGrade, physGrade, chemGrade, histGrade, itGrade, allNum)
{
        document.getElementById("math_grade").textContent = mathGrade[0];
        document.getElementById("math_grade").style.color = mathGrade[1];

        document.getElementById("phys_grade").textContent = physGrade[0];
        document.getElementById("phys_grade").style.color = physGrade[1];
       
        document.getElementById("chem_grade").textContent = chemGrade[0];
        document.getElementById("chem_grade").style.color = chemGrade[1];
        
        document.getElementById("hist_grade").textContent = histGrade[0];
        document.getElementById("hist_grade").style.color = histGrade[1];

        document.getElementById("it_grade").textContent = itGrade[0];
        document.getElementById("it_grade").style.color = itGrade[1];

        document.getElementById("average_grade").textContent = averageGrader(allNum);
}

document.getElementById("btn").addEventListener("click", main);