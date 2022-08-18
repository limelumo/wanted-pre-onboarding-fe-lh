import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import NewTodo from '../components/Todo/NewTodo';
import Todo from '../components/Todo/Todo';
import AuthContext from '../store/AuthContext';
import TodoContext from '../store/TodoContext';

const TodoList = () => {
  const { token } = useContext(AuthContext);
  const { getTodoData } = useContext(TodoContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/', { replace: true });
    if (token) {
      getTodoData(token);
    }
  }, []);

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
