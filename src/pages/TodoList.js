import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import NewTodo from '../components/Todo/NewTodo';
import Todos from '../components/Todo/Todos';
import { getTodoRequest } from '../api/todo';

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const getTodoData = async (token) => {
    const response = await getTodoRequest(token);
    setTodoData(response.todoList);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) navigate('/', { replace: true });

    if (token) {
      getTodoData(token);
      setToken(token);
    }
  }, [token, navigate]);

  return (
    <TodoWrapper>
      <NewTodo token={token} getTodoData={getTodoData} />
      <Todos items={todoData} token={token} resetData={setTodoData} />
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  width: 100%;
  border: 1px solid blue;
`;

export default TodoList;
