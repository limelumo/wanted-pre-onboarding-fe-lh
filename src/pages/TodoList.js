import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import NewTodo from '../components/Todo/NewTodo';
import Todo from '../components/Todo/Todo';
import TodoContext from '../store/TodoContext';

const TodoList = () => {
  const { getTodoData } = useContext(TodoContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) navigate('/', { replace: true });
    else getTodoData(token);
  }, [navigate]);

  return (
    <TodoWrapper>
      <NewTodo />
      <Todo />
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  width: 100%;
  border: 1px solid blue;
`;

export default TodoList;
