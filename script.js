let now = new Date();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
let weekdays = document.querySelector(".time");
weekdays.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;
// counting rows 
let n ; 
//measring time 
let time ; 
let description = document.querySelector("#description");
description.innerHTML = `created ${n} records at ${time}`; 