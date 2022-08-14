import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthWrapper from './components/AuthWrapper';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<AuthWrapper />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
