import { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import TodoItem from './TodoItem';
import TodoContext from '../../store/TodoContext';

const Todo = () => {
  const [listExist, setListExist] = useState(false);

  const { todoData } = useContext(TodoContext);

  let todoList = <NoList>Add your first Todo!</NoList>;

  useEffect(() => {
    if (todoData.length > 0) setListExist(true);
    else setListExist(false);
  }, [todoData.length]);

  const sortedData = todoData.sort((a, b) => a.isCompleted - b.isCompleted || a - b);

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

  return <List listExist={listExist}>{todoList}</List>;
};

const List = styled.section`
  min-height: 24em;
  max-height: 30em;
  padding-right: 1em;
  overflow-y: ${(prop) => (prop.listExist ? 'scroll' : 'hidden')};
`;

const NoList = styled.h2`
  font-size: 1.2em;
  text-align: center;
`

export default Todo;
