'use strict';

class Grade 
{
  grade;
  constructor(grade)
  {
    this.grade = grade;
  }

  isProperGrade = () => this.grade !== "" && this.grade >= 0 && this.grade <= 100 ? true : false;

  static evaluteAllGrades = (...Grades) => Grades.every((elem) => elem.isProperGrade() ? true : false);

  print(elemRef)
  {
    document.getElementById(elemRef).textContent = this.evalute.evalGrade;
    document.getElementById(elemRef).style.color = this.evalute.color;
  }

  get evalute()
  {
    let evalGrade = "";
    let color = "";

    if(this.value >= 0  && this.value < 33)   return {evalGrade: "Fail", color: "red"};
    if(this.value >= 33 && this.value < 40)   return {evalGrade: "D", color: "#ff7300"};
    if(this.value >= 40 && this.value < 50)   return {evalGrade: "C", color: "#fffb00"};
    if(this.value >= 50 && this.value < 60)   return {evalGrade: "B", color: "blue"};
    if(this.value >= 60 && this.value < 70)   return {evalGrade: "A-", color: "lime"};
    if(this.value >= 70 && this.value < 80)   return {evalGrade: "A", color: "pink"};
    if(this.value >= 80 && this.value <= 100) return {evalGrade: "A+", color: "gold"}
  }

  static getAverage = (...Grades) => Grades.map(grade => Number(grade.value)).reduce((accumulator, currVal) => accumulator + currVal, 0) / Grades.length;
  get value() { return this.grade; }
  set value(value) {this.grade = value; }
}

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