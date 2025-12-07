document.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    let tasks = [];

   
    function loadTasks() {
        
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks.slice(); 

        tasks.forEach(taskText => {
            createTaskElement(taskText); 
        });
    }

    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.classList.add("task-item");

       
        const span = document.createElement("span");
        span.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

       
        removeBtn.addEventListener("click", () => {
            
            if (li.parentElement === taskList) {
                taskList.removeChild(li);
            }

           
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);   
                saveTasksToStorage();    
            }
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        setTimeout(() => li.classList.add("show"), 10);
    }

    function addTask(taskText = null, save = true) {
       
        const text = (taskText !== null) ? String(taskText).trim() : taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        if (save) {
            tasks.push(text);
            saveTasksToStorage();
        }

        createTaskElement(text);

        if (taskText === null) {
            taskInput.value = "";
        }
    }

   
    addButton.addEventListener("click", () => addTask());

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});
