const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const toDoList = [];

app.get('/list/all', (req, res) => {
    res.type('application/json', 'charset=utf-8').status(200).send(toDoList);
    console.log(toDoList);
    return;
});

app.post('/list/add/:item', (req, res) => {
    const item = req.params.item;
    if(item) {
        toDoList.push(item);
    res.type('application/json', 'charset=utf-8').status(200).send(toDoList);
    console.log(`Added ${item} to the list!`);
    console.log(toDoList);
    return;
    }else {
        res.type('application/json', 'charset=utf-8').status(404).send({error: 'Please enter valid item'});
        console.log({error: 'Please enter a valid item'});
        return;
    }
    
});

app.put('/list/update/:item/:update', (req, res) => {
    const oldItem = req.params.item;
    const update = req.params.update;
    const index = toDoList.indexOf(oldItem);
    if (index !== -1) {
        toDoList[index] = update;
        res.type('application/json', 'charset=utf-8').status(200).send(toDoList);
        console.log(`Changed: ${oldItem} to ${update}`);
        console.log(toDoList);
        return;
    }else {
        res.type('application/json', 'charset=utf-8').status(404).send('Error updating list. Please try again.');
        return;
    }
});

app.delete('/list/delete/:item', (req, res) => {
    const deleting = req.params.item;
    const index = toDoList.indexOf(deleting);
    if(index !== -1) {
        toDoList.splice(index, 1);
        res.type('application/json', 'charset=utf-8').status(200).send(toDoList);
        console.log(`Deleted: ${deleting}`);
        console.log(toDoList);
        return;
    }else {
        res.type('application/json', 'charset=utf-8').status(404).send('Error. Item not found');
        return;
    }
});

app.use((req, res) => {
    res.type('application/json', 'charset=utf-8').status(404).send('Error 404. Not Found');
    return;
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
