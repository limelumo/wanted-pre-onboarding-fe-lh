import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import Auth from './pages/Auth';
import TodoList from './pages/TodoList';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/sign-up" element={<Auth />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
