const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for Todo
const todoSchema = new mongoose.Schema({
  date: Date,
  description: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { date, description } = req.body;
  const newTodo = new Todo({
    date,
    description,
    completed: false
  });
  await newTodo.save();
  res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});