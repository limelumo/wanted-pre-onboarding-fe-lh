import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import Auth from './pages/Auth';
import TodoList from './pages/TodoList';

import { TodoContextProvider } from './store/TodoContext';
import { AuthContextProvider } from './store/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <AuthContextProvider>
        <TodoContextProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/sign-up" element={<Auth />} />
              <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
          </div>
        </TodoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
