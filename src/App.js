import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import AccountPage from './pages/Account';
import Protected from './components/Protected';
import AuthPersistence from './components/AuthPersistence';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthPersistence Component={HomePage} />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/account"
          element={<Protected Component={AccountPage} />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
