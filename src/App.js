import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TodoLists from './pages/TodoLists';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/todo" element={<TodoLists />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
