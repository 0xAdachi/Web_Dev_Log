export class Grade 
{
  grade;
  constructor(grade)
  {
    this.grade = grade ?? 0;
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