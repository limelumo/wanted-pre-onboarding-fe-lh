import { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';

import { updateTodoRequest, deleteTodoRequest } from '../../api/todo';
import TodoContext from '../../store/TodoContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ id, todo, isCompleted }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [prevTodo, setPrevTodo] = useState();
  const [editedTodo, setEditedTodo] = useState();

  const { getTodoData, resetData } = useContext(TodoContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setPrevTodo(todo);
    setEditedTodo(todo);
  }, [todo]);

  const handleChange = (e) => {
    setEditedTodo(prevTodo);
    setEditedTodo(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    await updateTodoRequest(token, id, editedTodo, isCompleted);
    setIsEdit(false);
    getTodoData(token);
  };

  const handleCancel = () => {
    setEditedTodo(prevTodo);
    setPrevTodo(prevTodo);
    setIsEdit(false);
  };

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteTodoRequest(token, id);
      resetData(id);
    }
  };

  const handleCheckCompleted = async () => {
    await updateTodoRequest(token, id, todo, !isCompleted);
    getTodoData(token);
  };

  const onEditBtn = (
    <div>
      <Button type="button" onClick={handleCancel}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <Button type="submit">
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </div>
  );

  return (
    <ItemWrapper onSubmit={handleEdit}>
      <Item>
        <li>
          <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheckCompleted} />
        </li>
        <Content checked={isCompleted}>
          {isEdit ? <EditInput type="text" value={editedTodo} onChange={handleChange} autoFocus /> : todo}
        </Content>
      </Item>

      <EditBtns>
        {isEdit ? (
          onEditBtn
        ) : (
          <Button type="button" onClick={() => setIsEdit(true)} disabled={isCompleted}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        )}

        <Button type="button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </EditBtns>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 0.2em;
  padding: 1em 0;
  margin-bottom: 1em;
`;

const Item = styled.ul`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  margin-right: 0.8em;
`;

const Content = styled.li`
  width: 24em;
  text-decoration: ${(prop) => (prop.checked ? 'line-through' : 'none')};
`;

const EditInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const EditBtns = styled.div`
  min-width: 4em;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0.5em;
`;

export default TodoItem;
