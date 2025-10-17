const todoList = document.querySelector(".taskList");
const todoInput = document.querySelector(".todoInput");
const addBtn = document.querySelector(".todoInput + button");

const saveTasks = () => localStorage.setItem('tasks' , JSON.stringify(tasks));
const loadTasks = () => {
    try {
        return JSON.parse(localStorage.getItem('tasks')) || []
    } catch {
        localStorage.removeItem('tasks');
        return [];
    }
}

const tasks = loadTasks();

const addTask = () => {
    const enteredInput = todoInput.value.trim()

    const taskObj = { text: enteredInput, completed: false };
    tasks.push(taskObj);
    render(tasks);
    saveTasks()
    todoInput.value = '';
}

const markTask = index => {
    const selectedTask = tasks[index]
    tasks.splice(index , 1 , { ...selectedTask , completed : !selectedTask.completed })
    saveTasks()
    render(tasks)
}

const editHandler = index => {
    const input = document.querySelectorAll('li > input')[index]
    const editBtn = document.querySelectorAll('.edit')[index];

    if(!input || !editBtn) return;

    if(input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length)
        editBtn.innerHTML = "<i class='bx bx-check'></i>"
    } else {
        const newValue = input.value.trim();

        tasks[index].text = newValue;
        input.setAttribute('readonly' , '');
        editBtn.innerHTML = "<i class='bx bx-pencil'></i>"
        saveTasks()
        render(tasks)
    }
    saveTasks()
}

const deleteHandler = index => {
    tasks.splice(index , 1);
    saveTasks()
    render(tasks)
}

const render = list => {
    const template = list.map(( {text , completed} , index) => {
        return `
            <li class = '${completed ? 'completed' : ''}'>
            <input type = 'text' readonly value = '${text}' placeholder = 'edit your task . . .' />
            <div class = "actions">
                <button title = "mark as done" class = "mark" onclick = 'markTask(${index})' >
                    <i class='bx bx-check-square' ></i>
                </button>

                <button title = "edit" class = "edit" onclick = 'editHandler(${index})'>
                    <i class='bx bx-pencil'></i>
                </button>

                <button title = "delete" class = "delete" onclick = 'deleteHandler(${index})'>
                    <i class='bx bx-trash-alt'></i>
                </button>
            </div>
        </li>
        `
    })

    todoList.innerHTML = tasks.length === 0 ? 'Nothing to show❗' : template.join('')
}

addBtn.addEventListener('click' , addTask);
render(tasks)