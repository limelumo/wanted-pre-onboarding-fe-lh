import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import NewTodo from '../components/Todo/NewTodo';
import Todos from '../components/Todo/Todos';
import { getTodoRequest } from '../api/todo';

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) navigate('/', { replace: true });

    if (token) {
      const getTodoData = async (token) => {
        const response = await getTodoRequest(token);
        setTodoData(response.todoList);
      };

      getTodoData(token);
      setToken(token);
    }
  }, [token, navigate]);

  return (
    <>
      <NewTodo token={token} />
      <Todos items={todoData} />
    </>
  );
};

export default TodoList;
