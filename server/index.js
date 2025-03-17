const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require("axios")
app.use(cors());
app.use(express.json());

// In-memory storage for to-do items
let todos = [];

// CRUD Endpoints
// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Create a todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  todos = todos.map(todo =>
    todo.id === parseInt(id) ? { ...todo, text, completed } : todo
  );
  res.json(todos.find(todo => todo.id === parseInt(id)));
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.get('/api/weather/:city', async (req, res) => {
  try {
      const city = req.params.city;
      const apiKey = '41c3c373d04e93a653d2ebb4f7b46c70'; 
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(weatherURL);
      res.json(response.data);
  } catch (error) {
      console.error('❌ Weather API Error:', error.message);
      res.status(500).json({ message: '❌ Failed to fetch weather data', error: error.message });
  }

});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});