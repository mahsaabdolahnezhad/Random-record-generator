let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function updateTime() {
  let now = new Date();
  let day = week[now.getDay()];
  let weekdays = document.querySelector(".time");

  let timeString = `${day}  <div class="time-box"> ${now.getHours()}:${formatMinutes( now.getMinutes()  )}</div> `;

  timeString += `             ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  weekdays.innerHTML = timeString;
}

function formatMinutes(minutes) {
  return minutes < 10 ? `0${minutes}` : minutes;
}

updateTime();
setInterval(updateTime, 1000);

// counting rows
let n;
//measring time
let time;
let description = document.querySelector("#description");
description.innerHTML = `created ${n} records at ${time}`;

//creating tables
let tableData = [
  {
    name: "John",
    lastname: "Brent",
    age: 25,
    email: "john1666brent@gmail.com",
  },
  {
    name: "Emily",
    lastname: "Greyson",
    age: 30,
    email: "emily23greyson@gmail.com",
  },
  { name: "David", lastmae: "Blue", age: 35, email: "davidblue@email.com" },
];

function generateTable(data) {
  let table = document.createElement("table");

  // Create table header
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  let tbody = document.createElement("tbody");
  data.forEach((row) => {
    let tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}
let tableContainer = document.getElementById("tableContainer");
let table = generateTable(tableData);
tableContainer.appendChild(table);
