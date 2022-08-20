import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import NewTodo from '../components/Todo/NewTodo';
import Todo from '../components/Todo/Todo';
import Header from '../components/UI/Header';
import TodoContext from '../store/TodoContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
      <Header text={'Your Todo List'} />

      <NewTodo />
      <Todo />

      <SignOut>
        Sign out
        <button onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </SignOut>
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  min-width: 34em;
  color: #5F4D4B;
`;

const SignOut = styled.section`
  margin-top: 5em;
  text-align: center;

  button {
    font-size: 1.3em;
    color: #5F4D4B;
    margin-left: 0.2em;
  }
`;

export default TodoList;
