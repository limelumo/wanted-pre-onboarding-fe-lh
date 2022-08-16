import { useState } from 'react';

import { createTodoRequest, getTodoRequest } from '../../api/todo';

const NewTodo = ({ token }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleEnterTodo = async (e) => {
    e.preventDefault();

    if (newTodo.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }

    const response = await createTodoRequest(token, newTodo);

    if (response.status === 201) {
      getTodoRequest(token);
      setNewTodo('');
    }
  };

  return (
    <section>
      <form onSubmit={handleEnterTodo}>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        <button>Add</button>
      </form>
    </section>
  );
};

export default NewTodo;
