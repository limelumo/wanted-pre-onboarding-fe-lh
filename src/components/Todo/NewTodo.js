import { useState, useContext } from 'react';

import { createTodoRequest } from '../../api/todo';
import AuthContext from '../../store/AuthContext';
import TodoContext from '../../store/TodoContext';

const NewTodo = () => {
  const [newTodo, setNewTodo] = useState('');

  const { token } = useContext(AuthContext);
  const { getTodoData } = useContext(TodoContext);

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
      getTodoData(token);
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
