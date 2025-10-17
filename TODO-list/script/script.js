import { animate , stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

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
    if(!enteredInput) return;
    const isDuplicate = tasks.some(task => task.text.toLowerCase() === enteredInput.toLowerCase());
    if(isDuplicate) return alert('Task already exists!')

    const taskObj = { text: enteredInput, completed: false };
    tasks.push(taskObj);
    render(tasks);
    const li = document.querySelectorAll('li')
    animate(li, { opacity: [0, 1], transform: ["translateY(15px)", "translateY(-3px)", "translateY(0)"] }, { delay: stagger(0.05) , duration: 0.7, easing: "cubic-bezier(0.22, 1, 0.36, 1)" })
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
        const isDuplicate = tasks.some((task , i) => i !== index && task.text.toLowerCase() === newValue.toLowerCase());
        if(!newValue) return alert('Task cannot be empty');
        if(isDuplicate) return alert('Task already exists!');

        tasks[index].text = newValue;
        input.setAttribute('readonly' , '');
        editBtn.innerHTML = "<i class='bx bx-pencil'></i>"
        saveTasks()
        render(tasks)
    }
    saveTasks()
}

const deleteHandler = index => {
    const li = document.querySelectorAll('li')[index];
    animate(li , {opacity: [1, 0] , transform: ["translateY(0)", "translateY(8px)"] } , {duration: 0.2 , easing: 'cubic-bezier(0.33, 1, 0.68, 1)'}).finished.then(() => {
        tasks.splice(index , 1);
        saveTasks()
        render(tasks)
    })
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
todoInput.addEventListener('keypress' , ev => {
    if(ev.key === 'Enter') addTask()
})
window.markTask = markTask;
window.editHandler = editHandler;
window.deleteHandler = deleteHandler;
render(tasks)