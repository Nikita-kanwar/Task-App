const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    createTaskElement(inputBox.value); // Create and add the task properly
    inputBox.value = "";
    saveData();
}

function createTaskElement(taskText, isChecked = false) {
    let li = document.createElement("li");
    li.textContent = taskText;

    if (isChecked) {
        li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Delete button
    span.addEventListener("click", function () {
        li.remove();
        saveData();
    });

    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        saveData();
    });

    li.appendChild(span);
    listContainer.appendChild(li);
}

function saveData() {
    let tasks = [];
    document.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.textContent.replace("\u00d7", "").trim(),
            checked: li.classList.contains("checked"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showData() {
    listContainer.innerHTML = ""; // Clear existing tasks to avoid duplication
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        JSON.parse(savedTasks).forEach((task) => {
            createTaskElement(task.text, task.checked);
        });
    }
}

showData();









