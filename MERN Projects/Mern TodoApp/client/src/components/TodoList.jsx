import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get('http://localhost:5000/todos');
      setTodos(result.data);
    };
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = async (id, completed) => {
    const updatedTodo = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => todo._id === id ? updatedTodo.data : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
