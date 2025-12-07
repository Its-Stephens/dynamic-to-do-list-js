document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTask(taskText);

        taskInput.value = "";
    }

    function createTaskElement(text) {
        const li = document.createElement("li");
        li.classList.add("task-item"); 

        const span = document.createElement("span");
        span.textContent = text;

      
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", span.textContent);
            if (newText && newText.trim() !== "") {
                updateTask(span.textContent, newText.trim());
                span.textContent = newText.trim();
            }
        });

      
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", () => {
            taskList.removeChild(li);
            deleteTask(text);
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        setTimeout(() => li.classList.add("show"), 10); // animation
    }

   
    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(t => createTaskElement(t));
    }

  
    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    
    function updateTask(oldText, newText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = tasks.indexOf(oldText);
        if (index !== -1) {
            tasks[index] = newText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

  
    addButton.addEventListener("click", addTask);

  
    taskInput.addEventListener("keypress", e => {
        if (e.key === "Enter") addTask();
    });
});
