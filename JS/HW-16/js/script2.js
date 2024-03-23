'use strict';

import { Grade } from "./Grade.js";

let printIdList = ["math_grade","phys_grade","chem_grade","hist_grade","it_grade"];

document.getElementById("btn").addEventListener("click", () => {
  let mathGrade = new Grade(document.getElementById("math").value);
  let physGrade = new Grade(document.getElementById("phys").value);
  let chemGrade = new Grade(document.getElementById("chem").value);
  let histGrade = new Grade(document.getElementById("hist").value);
  let itGrade   = new Grade(document.getElementById("it").value);
  let gradeList = [mathGrade, physGrade, chemGrade, histGrade, itGrade];

  if(Grade.evaluteAllGrades(mathGrade, physGrade, chemGrade, histGrade, itGrade))
  {
    for(let index in gradeList)
    {
      gradeList[index].print(printIdList[index]);
    }
    document.getElementById("average_grade").textContent = Grade.getAverage(mathGrade, physGrade, chemGrade, histGrade, itGrade).toFixed(2);
  } else 
  {
    alert("Numbers range from 0 to 100");
  }
});