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


let description = document.querySelector("#description");



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


//creating random records
//email
const includeBigLetters3 = document.getElementById("bigLetters3");
const includeSmallLetters3 = document.getElementById("smallLetters3");
const includeNumbers3 = document.getElementById("numbers");
const includeSymbols3 = document.getElementById("symbols3");
const minLengthInput3 = document.getElementById("leftSlider3");
const maxLengthInput3 = document.getElementById("rightSlider3");
//name
const includeBigLetters1 = document.getElementById("bigLetters1");
const includeSmallLetters1 = document.getElementById("smallLetters1");
const minLengthInput1 = document.getElementById("leftSlider1");
const maxLengthInput1 = document.getElementById("rightSlider1");

//last name 
const includeBigLetters2 = document.getElementById("bigLetters2");
const includeSmallLetters2 = document.getElementById("smallLetters2");
const minLengthInput2 = document.getElementById("leftSlider2");
const maxLengthInput2 = document.getElementById("rightSlider2");

const historyPanel = document.querySelector(".history-panel");
const generateButton = document.getElementById("generate");


generateButton.addEventListener("click", () => {
  const startTime = new Date();
  const minLength = parseInt(minLengthInput1.value);
  const maxLength = parseInt(maxLengthInput1.value);
  const minLength2 = parseInt(minLengthInput2.value);
  const maxLength2 = parseInt(maxLengthInput2.value);
  const minLength3 = parseInt(minLengthInput3.value);
  const maxLength3 = parseInt(maxLengthInput3.value);
  console.log("Generate button clicked!");

  if (isNaN(minLength) || isNaN(maxLength) || minLength > maxLength) {
    alert("Invalid input. Please provide valid minimum and maximum lengths.");
    return;
  }
    if (isNaN(minLength2) || isNaN(maxLength2) || minLength2 > maxLength2) {
      alert("Invalid input. Please provide valid minimum and maximum lengths.");
      return;
    }

      if (isNaN(minLength3) || isNaN(maxLength3) || minLength3 > maxLength3) {
        alert(
          "Invalid input. Please provide valid minimum and maximum lengths."
        );
        return;
      }


  const characterSets = {
    bigLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    smallLetters: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
  };
    const minRows = 500;
    const maxRows = 10000;
    const numRows =
      Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;

  let selectedCharacterSets3 = "";
   let selectedCharacterSets2 = "";
    let selectedCharacterSets= "";

  if (includeBigLetters3.checked)
    selectedCharacterSets3 += characterSets.bigLetters;
  if (includeSmallLetters3.checked)
    selectedCharacterSets3 += characterSets.smallLetters;
  if (includeNumbers3.checked) selectedCharacterSets3 += characterSets.numbers;
  if (includeSymbols3.checked) selectedCharacterSets3 += characterSets.symbols;

    if (includeBigLetters2.checked)
      selectedCharacterSets2 += characterSets.bigLetters;
    if (includeSmallLetters2.checked)
      selectedCharacterSets2 += characterSets.smallLetters;

        if (includeBigLetters1.checked)
          selectedCharacterSets+= characterSets.bigLetters;
        if (includeSmallLetters1.checked)
          selectedCharacterSets+= characterSets.smallLetters;

  let randomEmail = "";
  const selectedCharacterSetLength3 = selectedCharacterSets3.length;


  let randomName = "";
  const selectedCharacterSetLength1 = selectedCharacterSets.length;

  
  let randomLastName = "";
  const selectedCharacterSetLength2 = selectedCharacterSets2.length;

 for (let j = 0; j < numRows; j++) {
   const nameLength =
     Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

   for (let i = 0; i < nameLength; i++) {
     const randomIndex = Math.floor(
       Math.random() * selectedCharacterSetLength1
     );
     randomName += selectedCharacterSets[randomIndex];
   }
   const lastnameLength =
     Math.floor(Math.random() * (maxLength2 - minLength2 + 1)) + minLength2;

   for (let i = 0; i < lastnameLength; i++) {
     const randomIndex2 = Math.floor(
       Math.random() * selectedCharacterSetLength2
     );
     randomLastName += selectedCharacterSets2[randomIndex2];
   }

   const emailLength =
     Math.floor(Math.random() * (maxLength3 - minLength3 + 1)) + minLength3;

   for (let i = 0; i < emailLength; i++) {
     const randomIndex3 = Math.floor(
       Math.random() * selectedCharacterSetLength3
     );
     randomEmail += selectedCharacterSets3[randomIndex3];
   }
   //age
   const min = 1;
   const max = 100;
   const randomAge = Math.floor(Math.random() * (max - min + 1)) + min;

   // Add data to generatedData array
   tableData.push({
     name: randomName,
     lastname: randomLastName,
     age: randomAge,
     email: randomEmail,
   });
 }


 table = generateTable(tableData);
tableContainer.innerHTML = "";
tableContainer.appendChild(table);

 updateTable();
 updatePagination();
 updatePageButtons();
  const endTime = new Date(); // Record the end time
  const timeTaken = endTime - startTime; 
   const historyItem = document.createElement("div");
   historyItem.className = "history-item";
   historyItem.innerHTML = `
    <p>Generated on ${formattedDate} at ${formattedTime}</p>
    <p> ${numRows} records</p>
  `;

   // Append the history item to the history panel
   historyPanel.appendChild(historyItem);
});
description.innerHTML = `created ${numRows} records at ${timeTaken}`;





