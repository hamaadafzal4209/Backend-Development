import { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await axios.post('http://localhost:5000/todos', { text });
    addTodo(newTodo.data);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
