import { useContext } from 'react';

import styled from 'styled-components';

import TodoItem from './TodoItem';
import TodoContext from '../../store/TodoContext';

const Todo = () => {
  const { todoData } = useContext(TodoContext);

  let todoList = <h2>No Todo found.</h2>;

  if (todoData.length > 0) {
    todoList = (
      <ul>
        {todoData.map((item) => (
          <TodoItem key={item.id} {...item} isCompleted={item.isCompleted}>
            {item.todo}
          </TodoItem>
        ))}
      </ul>
    );
  }

  return (
    <List>
      <div>{todoList}</div>
    </List>
  );
};

const List = styled.section`
  min-height: 16em;
`;

export default Todo;
