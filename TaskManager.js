const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const showCompletedCheckbox = document.getElementById('showCompletedCheckbox');

const tasks = [];

function addTask(taskName) {
    const task = {
        name: taskName,
        completed: false
    };
    tasks.push(task);
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = '';
    const showCompleted = showCompletedCheckbox.checked;

    tasks.forEach((task, index) => {
        if (showCompleted || !task.completed) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.name}</span>
                <button class="deleteTaskButton">Delete</button>
            `;
            taskList.appendChild(listItem);

            const checkbox = listItem.querySelector('input[type="checkbox"]');
            const deleteButton = listItem.querySelector('.deleteTaskButton');

            checkbox.addEventListener('change', () => toggleTask(index));
            deleteButton.addEventListener('click', () => deleteTask(index));
        }
    });
}

addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value;
    if (taskName) {
        addTask(taskName);
        taskInput.value = '';
    }
});

showCompletedCheckbox.addEventListener('change', updateTaskList);
