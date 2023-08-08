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


//creating toggle 
 function toggleList(listNumber) {
   const list = document.getElementById(`list${listNumber}`);
   list.parentElement.classList.toggle("active");
 }



 //range slider
const sliderIds = ["slider1", "slider2", "slider3"];
const leftSliderIds = ["leftSlider1", "leftSlider2", "leftSlider3"];
const rightSliderIds = ["rightSlider1", "rightSlider2", "rightSlider3"];
const outputLeftClasses = ["outputLeft1", "outputLeft2", "outputLeft3"];
const outputRightClasses = ["outputRight1", "outputRight2", "outputRight3"];


function updateView(index) {
  const leftSlider = document.getElementById(leftSliderIds[index]);
  const rightSlider = document.getElementById(rightSliderIds[index]);
  const outputLeft = document.querySelector(`.${outputLeftClasses[index]}`);
  const outputRight = document.querySelector(`.${outputRightClasses[index]}`);

  outputLeft.innerHTML = leftSlider.value;
  outputLeft.style.left =
    ((leftSlider.value - leftSlider.min) / (leftSlider.max - leftSlider.min)) *
      100 +
    "%";
  outputRight.innerHTML = rightSlider.value;
  outputRight.style.left =
    ((rightSlider.value - rightSlider.min) /
      (rightSlider.max - rightSlider.min)) *
      100 +
    "%";
     const minRange = Math.min(leftSlider.value, rightSlider.value);
  const maxRange = Math.max(leftSlider.value, rightSlider.value);

  const track = leftSlider.nextElementSibling;
 track.style.background = `linear-gradient(to right, #c5986a ${minRange+7.5}%, #8a4b1f ${minRange+7.5}%, #8a4b1f ${maxRange}%, #c5986a ${maxRange}%)`;
}


document.addEventListener("DOMContentLoaded", function () {
  sliderIds.forEach((sliderId, index) => {
    const sliderContainer = document.getElementById(sliderId);
    const leftSlider = sliderContainer.querySelector(
      `#${leftSliderIds[index]}`
    );
    const rightSlider = sliderContainer.querySelector(
      `#${rightSliderIds[index]}`
    );

    updateView(index);

    [leftSlider, rightSlider].forEach((slider) => {
      slider.addEventListener("mouseup", function () {
        this.blur();
      });
      slider.addEventListener("mousedown", function () {
        updateView(index);
      });
      slider.addEventListener("input", function () {
        updateView(index);
      });
    });
  });
});


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
  { name: "David", lastname: "Blue", age: 35, email: "davidblue@email.com" },
  {
    name: "Sarah",
    lastname: "Smith",
    age: 28,
    email: "sarah.smith@example.com",
  },
  {
    name: "Michael",
    lastname: "Johnson",
    age: 40,
    email: "michaelj@example.com",
  },
  {
    name: "Sophia",
    lastname: "Williams",
    age: 22,
    email: "sophia.w@example.com",
  },
  {
    name: "Matthew",
    lastname: "Anderson",
    age: 31,
    email: "matthew.anderson@example.com",
  },
  {
    name: "Olivia",
    lastname: "Davis",
    age: 27,
    email: "olivia.d@example.com",
  },
  {
    name: "Daniel",
    lastname: "Wilson",
    age: 29,
    email: "daniel.w@example.com",
  },
  {
    name: "Ava",
    lastname: "Miller",
    age: 33,
    email: "ava.miller@example.com",
  },
  {
    name: "William",
    lastname: "Thompson",
    age: 36,
    email: "william.t@example.com",
  },
  {
    name: "Isabella",
    lastname: "Martinez",
    age: 26,
    email: "isabella.m@example.com",
  },
  {
    name: "James",
    lastname: "Garcia",
    age: 45,
    email: "james.g@example.com",
  },
  {
    name: "Emma",
    lastname: "Rodriguez",
    age: 32,
    email: "emma.r@example.com",
  },
  {
    name: "Benjamin",
    lastname: "Lopez",
    age: 38,
    email: "benjamin.l@example.com",
  },
  {
    name: "Mia",
    lastname: "Lee",
    age: 23,
    email: "mia.l@example.com",
  },
  {
    name: "Alexander",
    lastname: "Harris",
    age: 39,
    email: "alexander.h@example.com",
  },
  {
    name: "Ella",
    lastname: "Clark",
    age: 29,
    email: "ella.c@example.com",
  },
  {
    name: "Jacob",
    lastname: "Lewis",
    age: 34,
    email: "jacob.l@example.com",
  },
  {
    name: "Liam",
    lastname: "Young",
    age: 27,
    email: "liam.y@example.com",
  },
  {
    name: "Grace",
    lastname: "Hall",
    age: 31,
    email: "grace.h@example.com",
  },
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



const tableContainer = document.getElementById("tableContainer");
let table = generateTable(tableData);
tableContainer.appendChild(table);

const itemsPerPageSelect = document.getElementById("rowsPerPage");
const paginationContainer = document.getElementById("pagination");
const paginationControls = document.querySelector(".pagination-controls"); // New
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
let currentPage = 1;
let rowsPerPage = parseInt(itemsPerPageSelect.value, 10);
let totalPages;



// Update the table based on the current page and rows per page
function updateTable() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = tableData.slice(startIndex, endIndex);
  const newTable = generateTable(pageData);

  // Clear previous table and append the new one
  tableContainer.innerHTML = "";
  tableContainer.appendChild(newTable);
}

// Create and update pagination links
function updatePagination() {
   totalPages = Math.ceil(tableData.length / rowsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<span class="page-link" data-page="${i}">${i}</span>`;
  }

  paginationContainer.innerHTML = paginationHTML;
  const pageLinks = document.querySelectorAll(".page-link");

  pageLinks.forEach((link) => {
    link.addEventListener("click", () => {
      currentPage = parseInt(link.getAttribute("data-page"), 10);
      updateTable();
      updatePagination();
    });
  });
}

// Update rows per page and re-render table and pagination
itemsPerPageSelect.addEventListener("change", () => {
  rowsPerPage = parseInt(itemsPerPageSelect.value, 10);
  currentPage = 1;
  updateTable();
  updatePagination();
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
    updatePagination();
    updatePageButtons();
  }
});

// Event listener for "Next" button
nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
    updatePagination();
    updatePageButtons();
  }
});

// Initial rendering
updateTable();
updatePagination();
updatePageButtons();



function updatePageButtons() {
  if (currentPage === 1) {
    prevPageButton.style.display = "none";
  } else {
    prevPageButton.style.display = "inline-block";
  }

  if (currentPage === totalPages) {
    nextPageButton.style.display = "none";
  } else {
    nextPageButton.style.display = "inline-block";
  }

  if (totalPages <= 1) {
    paginationControls.style.display = "none";
  } else {
    paginationControls.style.display = "flex";
  }
}
