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

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/', { replace: true });
    else getTodoData(token);
  }, [navigate, token]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <>
      {token ? (
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
      ) : (
        <div></div>
      )}
    </>
  );
};

const TodoWrapper = styled.div`
  min-width: 34em;
  color: #5f4d4b;
`;

const SignOut = styled.section`
  margin-top: 5em;
  text-align: center;

  button {
    font-size: 1.3em;
    margin-left: 0.2em;
  }
`;

export default TodoList;
