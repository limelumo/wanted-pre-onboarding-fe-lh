import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import Auth from './pages/Auth';
import { TodoContextProvider } from './store/TodoContext';

const TodoList = React.lazy(() => import('./pages/TodoList'));

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
