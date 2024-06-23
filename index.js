const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    return res.json({ message: 'Servidor funcionando' });
})

app.get('/tasks', (req, res) => {
    return res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id, 10));
    if(!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
})

app.post('/tasks', (req, res) => {
    const body = req.body;
    if(!body.name) return res.status(400).json({ message: 'Name is required' });
    tasks.push({ ...body, id: tasks.length + 1, name: req.body.name });
    return res.status(201).json(body);
})

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id, 10));
    if(!task) return res.status(404).json({ message: 'Task not found' });
    task.name = req.body.name;
    return res.json({message: 'Task updated'});
})

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id, 10));
    return res.status(204).send('Task deleted');
})

app.listen(8000, () => console.log('Server listening on port 8000'));