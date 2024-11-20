document.addEventListener("DOMContentLoaded", loadTasks);

let button = document.getElementById("btn");
let input = document.getElementById("inputText");
let ul = document.querySelector("ul");

function inputLength() {
  return input.value.length;
}

function createNewList(task) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(task || input.value));

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () =>
    deleteTasks(li, task || input.value)
  );

  li.appendChild(deleteBtn);
  ul.appendChild(li);

  if (!task) {
    saveTasks(input.value);
  }

  input.value = "";
}

function addListClick() {
  if (inputLength() > 0) {
    createNewList();
  }
}

function addListKeypress(e) {
  if (inputLength() > 0 && e.keyCode === 13) {
    createNewList();
  }
}

function saveTasks(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  let tasks = getTasks();
  tasks.forEach((task) => createNewList(task));
}

function deleteTasks(taskElement, task) {
  taskElement.remove();

  let tasks = getTasks();
  tasks = tasks.filter((t) => t.trim() !== task.trim());
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

button.addEventListener("click", addListClick);
input.addEventListener("keypress", addListKeypress);
