import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/api/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await axios.post("http://localhost:5000/api/todos", {
      text: newTodo,
    });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const updateTodo = async (id, text, completed) => {
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      text,
      completed,
    });
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          To-Do List 📝
        </Typography>

        {/* Input Field & Button */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Enter a new task"
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            sx={{ boxShadow: 2, borderRadius: 2 }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        {/* Todo List */}
        <List sx={{ maxHeight: 300, overflowY: "auto" }}>
          {todos.map((todo, index) => (
            <React.Fragment key={todo.id}>
              <ListItem
                sx={{
                  bgcolor: todo.completed ? "#d1ffd6" : "white",
                  borderRadius: 2,
                  boxShadow: 1,
                  "&:hover": { boxShadow: 4 },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, todo.text, !todo.completed)}
                  sx={{ color: "green" }}
                />
                <ListItemText
                  primary={todo.text}
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    fontWeight: todo.completed ? "bold" : "normal",
                  }}
                />
                <IconButton onClick={() => deleteTodo(todo.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              {index !== todos.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default TodoList;
