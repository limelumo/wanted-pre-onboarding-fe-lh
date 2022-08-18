import { createContext, useContext, useState } from 'react';

import AuthContext from './AuthContext';
import { getTodoRequest } from '../api/todo';

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todoData, setTodoData] = useState([]);

  const { getToken } = useContext(AuthContext);

  const getTodoData = async (token) => {
    const response = await getTodoRequest(token);
    setTodoData(response.todoList);
  };

  const resetData = (id) => setTodoData(todoData.filter((item) => item.id !== id));

  return <TodoContext.Provider value={{ todoData, getToken, getTodoData, resetData }}>{children}</TodoContext.Provider>;
};

export default TodoContext;
