import { useContext } from 'react';

import styled from 'styled-components';

import TodoItem from './TodoItem';
import TodoContext from '../../store/TodoContext';

const Todo = () => {
  const { todoData } = useContext(TodoContext);

  const sortedData = todoData.sort((a, b) => a.isCompleted - b.isCompleted || a - b);

  let todoList = <h2>Add your first Todo!</h2>;

  if (todoData.length > 0) {
    todoList = (
      <ul>
        {sortedData.map((item) => (
          <TodoItem key={item.id} {...item} isCompleted={item.isCompleted}>
            {item.todo}
          </TodoItem>
        ))}
      </ul>
    );
  }

  return (
    <List>
      <>{todoList}</>
    </List>
  );
};

const List = styled.section`
  min-height: 16em;
`;

export default Todo;
