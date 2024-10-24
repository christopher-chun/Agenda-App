const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const trashContainer = document.getElementById("trash-container");
const trashButton = document.getElementById("trashButton");
const trashList = document.querySelector(".trashList");

// Function to add a task to the list
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!"); // Alert the user if the input is empty
  } else {
    let li = document.createElement("li"); 
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li); // Append element to the list
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // JS unicode for 'x'
    li.appendChild(span); // Append span 'x' to the element
  }
  inputBox.value = "";
  saveData();
}

// Event Listener that waits for a click on the element or span within the list
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") { 
      e.target.classList.toggle("checked"); // If the element is clicked, it becomes checked
      saveData();
    } else if (e.target.tagName === "SPAN") {
      moveToTrash(e.target.parentElement.textContent); // If the span is clicked, the element is moved to the trash
      e.target.parentElement.remove(); // The element is removed from the list
      saveData();
    }
  },
  false
);

// Event Listener that waits for a click on the element or span within the trash list
trashContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      let li = document.createElement("li");
      li.innerHTML = e.target.innerHTML; 
      listContainer.appendChild(li); // If the element is clicked, it is added to the main list
      e.target.remove(); // Remove the element from the trash
      saveData();
      saveTrashData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); // If the span is clicked, remove the clicked trash item
      saveTrashData(); 
    }
  },
  false
);

// Function to save the current state of the main list to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show saved tasks from localStorage 
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  trashContainer.innerHTML = localStorage.getItem("trashData") || "";
}

//Function to move a task from the main list ot the trash list
function moveToTrash(deletedItem) {
  let li = document.createElement("li");
  li.innerHTML = deletedItem.replace("\u00d7", ""); // Remove the 'x' character from the task
  let span = document.createElement("span");
  span.innerHTML = "\u00d7"; // Add the '×' for removal in trash
  li.appendChild(span);
  trashContainer.appendChild(li);
  saveTrashData();
}

// Function to save the current state of the trash list to localStorage
function saveTrashData() {
  localStorage.setItem("trashData", trashContainer.innerHTML);
}

// Function to open the trash list
function openTrash() {
  trashButton.style.display = "none";
  trashList.classList.toggle("show");
}

// Function to close the trash list
function closeTrash() {
  trashList.classList.remove("show");
  trashButton.style.display = "block";
}

// Function to clear all the tasks in the main list
function clearTasks() {
  listContainer.innerHTML = "";
  saveData();
}

// Function to clear all the tasks in the trash list
function clearTrash() {
  trashContainer.innerHTML = "";
  saveTrashData();
}

showTask(); // Calls showTask() on page load 
