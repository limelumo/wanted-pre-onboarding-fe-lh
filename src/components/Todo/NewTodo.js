import { useState, useContext } from 'react';

import styled from 'styled-components';
import { createTodoRequest } from '../../api/todo';
import TodoContext from '../../store/TodoContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const NewTodo = () => {
  const [newTodo, setNewTodo] = useState('');

  const { getTodoData } = useContext(TodoContext);

  const token = localStorage.getItem('token');

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
      <NewTodoForm onSubmit={handleEnterTodo}>
        <NewTodoInput type="text" value={newTodo} onChange={handleInputChange} />

        <Button>
          <FontAwesomeIcon icon={faSquarePlus} />
        </Button>
      </NewTodoForm>
    </section>
  );
};

const NewTodoForm = styled.form`
display: flex;
justify-content: space-between;
  margin-bottom: 5em;
`;

const NewTodoInput = styled.input`
  width: 90%;
  padding: 1em 0;
  border: none;
  border-bottom: 1px solid gray;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
font-size: 2.2em;
`;

export default NewTodo;
