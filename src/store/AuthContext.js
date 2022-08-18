import { createContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem('token');

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
