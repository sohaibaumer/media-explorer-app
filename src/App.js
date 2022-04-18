import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
