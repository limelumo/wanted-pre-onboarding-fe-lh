import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import NewTodo from '../components/Todo/NewTodo';
import Todo from '../components/Todo/Todo';
import Header from '../components/UI/Header';
import TodoContext from '../store/TodoContext';

const TodoList = () => {
  const { getTodoData } = useContext(TodoContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) navigate('/', { replace: true });
    else getTodoData(token);
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <TodoWrapper>
      <Header text={'Todo List'} />

      <NewTodo />
      <Todo />

      <SignOut>
        <button onClick={handleSignOut}>로그아웃</button>
      </SignOut>
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  min-width: 400px;
`;

const SignOut = styled.section`
  margin-top: 5em;
  padding-top: 3em;
  text-align: center;
`;

export default TodoList;
