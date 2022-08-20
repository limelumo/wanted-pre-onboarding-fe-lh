import { createContext, useState } from 'react';

import { getTodoRequest } from '../api/todo';

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todoData, setTodoData] = useState([]);

  const getTodoData = async (token) => {
    const response = await getTodoRequest(token);
    setTodoData(response.todoList);
  };

  const resetData = (id) => setTodoData(todoData.filter((item) => item.id !== id));

  return <TodoContext.Provider value={{ todoData, getTodoData, resetData }}>{children}</TodoContext.Provider>;
};

export default TodoContext;
