import { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';

import { updateTodoRequest, deleteTodoRequest } from '../../api/todo';
import TodoContext from '../../store/TodoContext';

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

    // css 변경: checkbox disabled, edit 버튼 disabled
  };

  const onEditBtn = (
    <div>
      <Button type="button" onClick={handleCancel}>
        취소
      </Button>
      <Button type="submit">완료</Button>
    </div>
  );

  // const checked = isCompleted ? true : false;

  return (
    <ItemWrapper onSubmit={handleEdit}>
      <Item>
        <li>
          <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheckCompleted} />
        </li>
        <Content>{isEdit ? <EditInput type="text" value={editedTodo} onChange={handleChange} autoFocus /> : todo}</Content>
      </Item>

      <EditBtns>
        {isEdit ? (
          onEditBtn
        ) : (
          <Button type="button" onClick={() => setIsEdit(true)}>
            수정
          </Button>
        )}

        <Button type="button" onClick={handleDelete}>
          삭제
        </Button>
      </EditBtns>
    </ItemWrapper>
  );
};

// edit 풀었을때 focus 안생기게
const ItemWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  /* background-color: #eee; */
  background-color: ${(prop) => (prop.checked ? '#eee' : 'white')};
  border: 1px solid ${(prop) => (prop.checked ? '' : '#ccc')};
  border-radius: 0.2em;
  padding: 1em;
  margin-bottom: 1em;
`;

const Item = styled.ul`
  display: flex;
`;

const CheckBox = styled.input`
  margin-right: 0.8em;
`;

const Content = styled.li`
  width: 24em;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 1em;
  border: none;
  background-color: transparent;
`;

const EditBtns = styled.div`
  min-width: 150px;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0.5em;
`;

export default TodoItem;
