const add = document.getElementById('add-btn');
const update = document.getElementById('update-btn');
const remove = document.getElementById('delete-btn');
const toDoList = document.getElementById('todo-list');

function showList(list) {
    if(list.length === 0) {
        toDoList.textContent = "No tasks yet!";
    }else {
        toDoList.innerHTML = "<ul>" + list.map(item => `<li>${item}</li>`).join('') + "</ul>";
    }
};

function addItem() {
    const input = document.getElementById('new-task');
    const task = input.value.trim();
    if (task) {
        fetch(`/list/add/${encodeURIComponent(task)}`, {method: 'POST'})
            .then( res => res.json())
            .then(data => showList(data))
            .then(input.value = '')
    }else {
        alert('Please enter a valid task');
    }
};

function getAll() {
    fetch('/list/all')
        .then(res => res.json())
        .then(data => showList(data));
};

function updateItem() {
    const old = document.getElementById('old-task');
    const oldItem = old.value.trim();
    const update = document.getElementById('updated-task');
    const updateItem = update.value.trim();
    if(oldItem && updateItem) {
        fetch(`/list/update/${encodeURIComponent(oldItem)}/${encodeURIComponent(updateItem)}`, {method: 'PUT'})
            .then(res => res.json())
            .then(data =>showList(data))
            .then(old.value = '', update.value = '')
    }else {
        alert('Please enter a valid item in both fields');
    }
}

function deleteItem() {
    const item = document.getElementById('delete-task');
    const itemName = item.value.trim();
    if(itemName) {
        fetch(`/list/delete/${encodeURIComponent(itemName)}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => showList(data))
            .then(item.value = '')
    }
    else {
        alert('Please enter a valid item to delete')
    }
}

window.addEventListener('DOMContentLoaded', getAll());
add.addEventListener('click', addItem);
update.addEventListener('click', updateItem);
remove.addEventListener('click', deleteItem);