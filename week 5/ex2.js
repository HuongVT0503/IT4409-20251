//given aqn array of objects(eg a list of stuednets w names n scores) use the array method (map, filter, reduce) to calc
//the avg score

//when definig a js obj/const/.. -> use let or const

{

const students=[
  { name: "Alice", score: 85 },
  { name: "Bob", score: 72 },
  { name: "Charlie", score: 90 },
  { name: "Diana", score: 68 }
];

//reduce
//reduces(accumulates) an array to 1 single value(output) (e.g, sum
const avg1=  (students.reduce( (sum,s)=> sum+s.score, 0) )  / students.length;  
//sum:accumulator//s:1 obj of the array at a time(a student obj)//initial value of accumulator
console.log("Average:", avg1.toFixed(2));//a string with 2 decimal places

//map+reduce
//map:creates a new array with tranformed value
const avg2 = students
  .map(s => s.score)
  .reduce((sum, score) => sum + score, 0) / students.length;
console.log("Average1:", avg2.toFixed(2));

//ffilter+ reduce (e.g., only scores >= 70)
//filter:creates a new array with a condition
const passed = students.filter(s => s.score >= 70); //filter students w score>=70
const avgPassed = passed.reduce((sum, s) => sum + s.score, 0) / passed.length;
console.log("Average of passing students:", avgPassed.toFixed(2));




}
