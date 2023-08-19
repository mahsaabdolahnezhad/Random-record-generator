// Define the days of the week
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to update the time
function updateTime() {
  // Get the current date and time
  const now = new Date();

  // Get the current day of the week
  const day = week[now.getDay()];

  // Get the element to display the time
  const weekdays = document.querySelector(".time");

  // Create the time string to display
  let timeString = `${day}  <div class="time-box"> ${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}</div> `;

  // Add the date to the time string
  timeString += `             ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  // Update the element with the time string
  weekdays.innerHTML = timeString;
}

// Call the updateTime function immediately and every second
updateTime();
setInterval(updateTime, 1000);

// Function to toggle a list
function toggleList(listNumber) {
  // Get the list element
  const list = document.getElementById(`list${listNumber}`);

  // Toggle the "active" class of the parent element
  list.parentElement.classList.toggle("active");
}

// Define the IDs and classes for the range sliders
const sliderIds = ["slider1", "slider2", "slider3"];
const leftSliderIds = ["leftSlider1", "leftSlider2", "leftSlider3"];
const rightSliderIds = ["rightSlider1", "rightSlider2", "rightSlider3"];
const outputLeftClasses = ["outputLeft1", "outputLeft2", "outputLeft3"];
const outputRightClasses = ["outputRight1", "outputRight2", "outputRight3"];

// Function to update the view of the range slider
function updateView(index) {
  // Get the left and right sliders, and the left and right output elements
  const leftSlider = document.getElementById(leftSliderIds[index]);
  const rightSlider = document.getElementById(rightSliderIds[index]);
  const outputLeft = document.querySelector(`.${outputLeftClasses[index]}`);
  const outputRight = document.querySelector(`.${outputRightClasses[index]}`);

  // Update the left output element with the value of the left slider
  outputLeft.innerHTML = leftSlider.value;
  outputLeft.style.left = ((leftSlider.value - leftSlider.min) / (leftSlider.max - leftSlider.min)) * 100 + "%";

  // Update the right output element with the value of the right slider
  outputRight.innerHTML = rightSlider.value;
  outputRight.style.left = ((rightSlider.value - rightSlider.min) / (rightSlider.max - rightSlider.min)) * 100 + "%";

  // Calculate the min and max range values for the gradient
  const minRange = Math.min(leftSlider.value, rightSlider.value);
  const maxRange = Math.max(leftSlider.value, rightSlider.value);

  // Calculate the gradient percentages
  const gradientMin = ((minRange - leftSlider.min) / (leftSlider.max - leftSlider.min)) * 100;
  const gradientMax = ((maxRange - leftSlider.min) / (leftSlider.max - leftSlider.min)) * 100;

  // Get the track element and update its background gradient
  const track = leftSlider.nextElementSibling;
  track.style.background = `linear-gradient(to right, #c5986a ${gradientMin + 7.5}%, #8a4b1f ${gradientMin + 7.5}%, #8a4b1f ${gradientMax}%, #c5986a ${gradientMax}%)`;
}

// Add event listeners to the range sliders
document.addEventListener("DOMContentLoaded", function () {
  // Iterate over the slider IDs
  sliderIds.forEach((sliderId, index) => {
    // Get the slider container, left slider, and right slider
    const sliderContainer = document.getElementById(sliderId);
    const leftSlider = sliderContainer.querySelector(`#${leftSliderIds[index]}`);
    const rightSlider = sliderContainer.querySelector(`#${rightSliderIds[index]}`);

    // Update the view for the current index
    updateView(index);

    // Add event listeners to the sliders
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

// Define an empty array for table data
 const tableData = [];

// Function to generate a table
function generateTable(data) {
  // Create the table element
  let table = document.createElement("table");

  // Create the table header
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
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

// Get the table container element
const tableContainer = document.getElementById("tableContainer");

// Function to show row details
function showRowDetails(rowData) {
  // Create the details container
  let detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");

  // Create the exit button
  let exitButton = document.createElement("button");
  exitButton.textContent = "Exit";
  exitButton.addEventListener("click", () => {
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  });
  detailsContainer.appendChild(exitButton);

  // Create the details table
  let detailsTable = generateTable([rowData]);
  detailsContainer.appendChild(detailsTable);

  // Update the table container with the details container
  tableContainer.innerHTML = "";
  tableContainer.appendChild(detailsContainer);
}

// Get the items per page select element, pagination container, and pagination controls
const itemsPerPageSelect = document.getElementById("rowsPerPage");
const paginationContainer = document.getElementById("pagination");
const paginationControls = document.querySelector(".pagination-controls");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");

// Initialize pagination variables
let currentPage = 1;
let rowsPerPage = parseInt(itemsPerPageSelect.value, 10);
let totalPages;

// Function to update the table based on the current page and rows per page
function updateTable() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = tableData.slice(startIndex, endIndex);
  const newTable = generateTable(pageData);

  // Clear the previous table and append the new one
  tableContainer.innerHTML = "";
  tableContainer.appendChild(newTable);

  // Attach click event listener to each row
  let tableRows = newTable.querySelectorAll("tbody tr");
  tableRows.forEach((row, index) => {
    row.addEventListener("click", () => {
      showRowDetails(pageData[index]);
    });
  });
}

// Function to update the pagination
function updatePagination() {
  totalPages = Math.ceil(tableData.length / rowsPerPage);
  let paginationHTML = "";

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<span class="page-link" data-page="${i}">${i}</span>`;
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        paginationHTML += `<span class="page-link" data-page="${i}">${i}</span>`;
      }
      paginationHTML += `<span>...</span>`;
      paginationHTML += `<span class="page-link" data-page="${totalPages}">${totalPages}</span>`;
    } else if (currentPage > totalPages - 4) {
      paginationHTML += `<span class="page-link" data-page="1">1</span>`;
      paginationHTML += `<span>...</span>`;
      for (let i = totalPages - 4; i <= totalPages; i++) {
        paginationHTML += `<span class="page-link" data-page="${i}">${i}</span>`;
      }
    } else {
      paginationHTML += `<span class="page-link" data-page="1">1</span>`;
      paginationHTML += `<span>...</span>`;
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationHTML += `<span class="page-link" data-page="${i}">${i}</span>`;
      }
      paginationHTML += `<span>...</span>`;
      paginationHTML += `<span class="page-link" data-page="${totalPages}">${totalPages}</span>`;
    }
  }

  paginationContainer.innerHTML = paginationHTML;
  attachPageLinkListeners();
  const pageLinks = document.querySelectorAll(".page-link");

  pageLinks.forEach((link) => {
    link.addEventListener("click", () => {
      currentPage = parseInt(link.getAttribute("data-page"), 10);
      updateTable();
      updatePagination();
    });
  });
}

// Function to attach event listeners to page links
function attachPageLinkListeners() {
  const pageLinks = document.querySelectorAll(".page-link");

  pageLinks.forEach((link) => {
    link.addEventListener("click", () => {
      currentPage = parseInt(link.getAttribute("data-page"), 10);
      updateTable();
      updatePagination();
    });
  });
}

// Update the table and pagination when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  updateTable();
  updatePagination();
});

// Event listener for "Items per page" select change
itemsPerPageSelect.addEventListener("change", () => {
  rowsPerPage = parseInt(itemsPerPageSelect.value, 10);
  currentPage = 1;
  updateTable();
  updatePagination();
});

// Event listener for "Previous" button
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

// Function to update the visibility of the page buttons
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

// Function to generate random records
function generateRandomRecords() {
  // Get the options for email, name, and last name
const includeBigLetters3 = document.getElementById("bigLetters3");
const includeSmallLetters3 = document.getElementById("smallLetters3");
const includeNumbers3 = document.getElementById("numbers");
const includeSymbols3 = document.getElementById("symbols3");
const minLengthInput3 = document.getElementById("leftSlider3");
const maxLengthInput3 = document.getElementById("rightSlider3");

const includeBigLetters1 = document.getElementById("bigLetters1");
const includeSmallLetters1 = document.getElementById("smallLetters1");
const minLengthInput1 = document.getElementById("leftSlider1");
const maxLengthInput1 = document.getElementById("rightSlider1");

const includeBigLetters2 = document.getElementById("bigLetters2");
const includeSmallLetters2 = document.getElementById("smallLetters2");
const minLengthInput2 = document.getElementById("leftSlider2");
const maxLengthInput2 = document.getElementById("rightSlider2");

  // Get the history panel and description elements
const historyPanel = document.querySelector(".history-panel");

let description = document.getElementById("description");

  // Get the generate button
const generateButton = document.getElementById("generate");

  // Add click event listener to the generate button
generateButton.addEventListener("click", () => {
    // Get the minimum and maximum lengths for email, name, and last name
  const minLength = parseInt(minLengthInput1.value);
  const maxLength = parseInt(maxLengthInput1.value);
  const minLength2 = parseInt(minLengthInput2.value);
  const maxLength2 = parseInt(maxLengthInput2.value);
  const minLength3 = parseInt(minLengthInput3.value);
  const maxLength3 = parseInt(maxLengthInput3.value);

    // Define the domain names for email
  const domainNames = [
    "example.com",
    "testmail.com",
    "randommail.org",
    "gmail.com",
    "email.com",
  ];

    // Clear the table container
  tableContainer.innerHTML = "";

    // Start the timer
  const startTime = new Date();

    // Validate the input lengths
  if (isNaN(minLength) || isNaN(maxLength) || minLength > maxLength) {
    alert("Invalid input. Please provide valid minimum and maximum lengths.");
    return;
  }
  if (isNaN(minLength2) || isNaN(maxLength2) || minLength2 > maxLength2) {
    alert("Invalid input. Please provide valid minimum and maximum lengths.");
    return;
  }

  if (isNaN(minLength3) || isNaN(maxLength3) || minLength3 > maxLength3) {
    alert("Invalid input. Please provide valid minimum and maximum lengths.");
    return;
  }

    // Define the character sets
  const characterSets = {
    bigLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    smallLetters: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
  };
  
    // Define the number of rows to generate
  const minRows = 500;
  const maxRows = 10000;
  const numRows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows; 

    // Define the selected character sets for email, name, and last name
  let selectedCharacterSets3 = "";
  let selectedCharacterSets2 = "";
  let selectedCharacterSets = "";

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
    selectedCharacterSets += characterSets.bigLetters;
  if (includeSmallLetters1.checked)
    selectedCharacterSets += characterSets.smallLetters;

    // Get the length of the selected character sets
  const selectedCharacterSetLength3 = selectedCharacterSets3.length;

  const selectedCharacterSetLength1 = selectedCharacterSets.length;

  const selectedCharacterSetLength2 = selectedCharacterSets2.length;

    // Generate random records
    for (let i = 0; i < numRows; i++) {
    let randomName = [];
    let randomLastName = [];
    let randomEmail = [];

      // Generate random name
    const nameLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let j = 0; j < nameLength; j++) {
      const randomIndex = Math.floor(
        Math.random() * selectedCharacterSetLength1
      );
      randomName.push(selectedCharacterSets[randomIndex]);
    }

      // Generate random last name
    const lastnameLength =
      Math.floor(Math.random() * (maxLength2 - minLength2 + 1)) + minLength2;

    for (let j = 0; j < lastnameLength; j++) {
      const randomIndex2 = Math.floor(
        Math.random() * selectedCharacterSetLength2
      );
      randomLastName.push(selectedCharacterSets2[randomIndex2]);
    }

      // Generate random email
    const emailLength =
      Math.floor(Math.random() * (maxLength3 - minLength3 + 1)) + minLength3;

    for (let j = 0; j < emailLength; j++) {
      const randomIndex3 = Math.floor(
        Math.random() * selectedCharacterSetLength3
      );
      randomEmail.push(selectedCharacterSets3[randomIndex3]);
    }
    randomEmail.push(
      `@${domainNames[Math.floor(Math.random() * domainNames.length)]}`
    );

      // Generate random age
    const min = 1;
    const max = 100;
    const randomAge = Math.floor(Math.random() * (max - min + 1)) + min;

      // Add the data to the tableData array
    tableData.push({
      name: randomName.join(""),
      lastname: randomLastName.join(""),
      age: randomAge,
      email: randomEmail.join(""),
    });
  }

    // Generate the table and update the table container
    table = generateTable(tableData);
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
   
      // Attach click event listener to each row
    tableContainer.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
    if (row) {
        const index = Array.from(tableContainer.querySelectorAll("tr")).indexOf(row);
      showRowDetails(tableData[index]);
    }
  });

    // Stop the timer and calculate the time taken
    const endTime = new Date();
    const timeTaken = endTime - startTime;
    const minutes = Math.floor(timeTaken / 60000);
    const seconds = ((timeTaken % 60000) / 1000).toFixed(0);

    // Update the description with the time taken
    description.innerHTML = `created ${tableData.length} records in ${minutes}:${seconds} minutes`;

    // Create and append history item
  
  const formattedDate = new Date().toLocaleDateString();
  const formattedTime = new Date().toLocaleTimeString();
  const historyItem = document.createElement("div");
  historyItem.className = "history-item";
  historyItem.innerHTML = `
    <p>Generated ${tableData.length} records on ${formattedDate} at ${formattedTime}</p>
  `;
  historyPanel.appendChild(historyItem);

    // Update the table, pagination, and page buttons
  updateTable();
  updatePagination();
  updatePageButtons();
});
}

// Call the function to generate random records
generateRandomRecords();