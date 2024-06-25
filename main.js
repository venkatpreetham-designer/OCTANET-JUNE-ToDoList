// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    updateLocalStorage();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function deleteAllTasks() {
    tasks = [];
    updateLocalStorage();
    renderTasks();
}

function filterTasks(filter) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = `task ${task.completed ? 'completed' : ''}`;
        
        const actions = document.createElement('div');
        actions.className = 'actions';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox'
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(index);
        
        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '❌';
        deleteIcon.className = 'delete';
        deleteIcon.onclick = () => deleteTask(index);
        
        actions.appendChild(checkbox);
        taskItem.appendChild(actions);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteIcon);
        
        taskList.appendChild(taskItem);
    });
}

function renderTasks() {
    filterTasks();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();