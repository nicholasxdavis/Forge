document.getElementById('info-icon').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const todoListContainer = document.getElementById('todo-lists-container');
    const newListButton = document.getElementById('newlist-btn');
    const listTemplate = document.getElementById('todo-list-template');

    if (!listTemplate) {
        console.error('Template element not found');
        return;
    }

    let listCounter = 1;
    let allTodoLists = [];

    // Initialize the page
    function initializePage() {
        loadAllListsFromLocalStorage();

        if (allTodoLists.length === 0) {
            createNewTodoList();
        } else {
            allTodoLists.forEach(listData => {
                const listClone = createListClone(listData);
                todoListContainer.appendChild(listClone);
            });
        }
    }

    function createNewTodoList() {
        const newListData = {
            id: `todo-list-${listCounter++}`,
            title: `To-Do List ${listCounter}`,
            tasks: []
        };
        allTodoLists.push(newListData);
        saveAllListsToLocalStorage();
        const newList = createListClone(newListData);
        todoListContainer.appendChild(newList);
    }

    function createListClone(listData) {
        const newList = listTemplate.cloneNode(true);
        newList.classList.remove('template');
        newList.id = listData.id;

        const titleInput = newList.querySelector('.list-title-input');
        const todoInput = newList.querySelector('.todo-input');
        const todoTime = newList.querySelector('.todo-time');
        const todoList = newList.querySelector('.todo-list');
        const saveTitleButton = newList.querySelector('.save-title');
        const addTodoButton = newList.querySelector('.add-todo');
        const listTitle = newList.querySelector('h1');
        const closeButton = newList.querySelector('.close-todo-container'); // Select the close button

        titleInput.value = listData.title;
        listTitle.textContent = listData.title;

        attachEventListeners(listData, titleInput, saveTitleButton, addTodoButton, todoInput, todoTime, todoList, listTitle, closeButton, newList);

        updateTodoList(listData, todoList);

        return newList;
    }

    function attachEventListeners(todoListData, titleInput, saveButton, addButton, todoInput, todoTime, todoList, listTitle, closeButton, listElement) {
        saveButton.addEventListener('click', () => {
            const listTitleText = titleInput.value.trim();
            if (listTitleText) {
                listTitle.textContent = listTitleText;
                todoListData.title = listTitleText;
                saveAllListsToLocalStorage();
            }
        });

        addButton.addEventListener('click', () => {
            addTodo(todoListData, todoInput, todoTime, todoList);
        });

        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo(todoListData, todoInput, todoTime, todoList);
        });

        // Attach event listener for the close button
        closeButton.addEventListener('click', () => {
            todoListContainer.removeChild(listElement); // Remove the todo list container from the DOM
            allTodoLists = allTodoLists.filter(list => list.id !== todoListData.id); // Remove from the data array
            saveAllListsToLocalStorage(); // Save updated data to local storage
        });
    }

    function addTodo(todoListData, todoInput, todoTime, todoList) {
        const taskText = todoInput.value.trim();
        const taskTime = todoTime.value;

        if (taskText === '') return;

        const formattedTime = formatTime(taskTime);

        const task = {
            text: taskText,
            time: taskTime,
            formattedTime: formattedTime,
            checked: false
        };

        todoListData.tasks.push(task);
        updateTodoList(todoListData, todoList);
        
        // Auto-save after adding a new task
        saveAllListsToLocalStorage();

        todoInput.value = '';
        todoTime.value = '';
    }

    function updateTodoList(todoListData, todoList) {
        todoList.innerHTML = '';

        todoListData.tasks.sort((a, b) => a.time.localeCompare(b.time));

        todoListData.tasks.forEach(task => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            if (task.checked) {
                todoItem.classList.add('checked');
            }
            todoItem.innerHTML = `
                <span>${task.text}</span>
                ${task.time ? `<span class="todo-time">${task.formattedTime}</span>` : ''}
                <div class="icons-container">
                    <i class="fas fa-check check-icon"></i>
                    <i class="fas fa-trash-alt trash-icon"></i>
                </div>
            `;

            todoItem.querySelector('.check-icon').addEventListener('click', () => {
                todoItem.classList.toggle('checked');
                task.checked = !task.checked;
                saveAllListsToLocalStorage();
            });

            todoItem.querySelector('.trash-icon').addEventListener('click', () => {
                todoListData.tasks = todoListData.tasks.filter(t => t !== task);
                updateTodoList(todoListData, todoList);
                saveAllListsToLocalStorage();
            });

            todoList.appendChild(todoItem);
        });
    }

    function formatTime(time) {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const formattedHours = (parseInt(hours, 10) % 12) || 12; // Convert 0 to 12 for midnight
        const period = parseInt(hours, 10) < 12 ? 'AM' : 'PM'; // Determine AM or PM
        return `${formattedHours}:${minutes.padStart(2, '0')} ${period}`;
    }

    function saveAllListsToLocalStorage() {
        localStorage.setItem('allTodoLists', JSON.stringify(allTodoLists));
    }

    function loadAllListsFromLocalStorage() {
        const savedLists = JSON.parse(localStorage.getItem('allTodoLists'));
        if (savedLists) {
            allTodoLists = savedLists;
        }
    }

    newListButton.addEventListener('click', createNewTodoList);

    initializePage();
});
