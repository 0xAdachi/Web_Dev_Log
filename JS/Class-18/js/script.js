'use strict';

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

// Checks if all the grades in input field are valid grades
function checkGradeValidity()
{
    let mathNum = document.getElementById("math").value;
    let physNum = document.getElementById("phys").value;
    let chemNum = document.getElementById("chem").value;
    let histNum = document.getElementById("hist").value;
    let itNum = document.getElementById("it").value;

    if (properGrade(mathNum) && properGrade(physNum) && properGrade(chemNum) && properGrade(histNum) && properGrade(itNum))
    {
        // console.log("all grades are valid");
        let mathGrade = gradeNumber(mathNum);
        document.getElementById("math_grade").textContent = mathGrade[0];
        document.getElementById("math_grade").style.color = mathGrade[1];

        let physGrade = gradeNumber(physNum);
        document.getElementById("phys_grade").textContent = physGrade[0];
        document.getElementById("phys_grade").style.color = physGrade[1];

        let chemGrade = gradeNumber(chemNum);
        document.getElementById("chem_grade").textContent = chemGrade[0];
        document.getElementById("chem_grade").style.color = chemGrade[1];

        let histGrade = gradeNumber(histNum);
        document.getElementById("hist_grade").textContent = histGrade[0];
        document.getElementById("hist_grade").style.color = histGrade[1];

        let itGrade = gradeNumber(itNum);
        document.getElementById("it_grade").textContent = itGrade[0];
        document.getElementById("it_grade").style.color = itGrade[1];

        document.getElementById("average_grade").textContent = averageGrade(mathNum, physNum, chemNum, histNum, itNum);

    } else
    {
        alert("Numbers range from 0 to 100");
    }
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

// Returns the average grade for 5 subjects
function averageGrade(mathNum, physNum, chemNum, histNum, itNum)
{
    let totalSum = Number(mathNum) + Number(physNum) + Number(chemNum) + Number(histNum) + Number(itNum);
    return totalSum / 5;
}

document.getElementById("btn").addEventListener("click", checkGradeValidity);