import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import AccountPage from './pages/Account';
import SnackBar from './components/SnackBar';
import Protected from './components/Protected';
import { removeSnackbar } from './store';
import AuthPersistence from './components/AuthPersistence';

function App() {
  const dispatch = useDispatch();
  const snackbars = useSelector((state) => state.snackbars);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (snackbars.length > 0) {
        dispatch(removeSnackbar({ id: snackbars[0].id }));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [snackbars, dispatch]);

  return (
    <>
      <div className="absolute" style={{ zIndex: '4000' }}>
        {snackbars.map((snackbar) => (
          <SnackBar
            id={snackbar.id}
            key={snackbar.id}
            style={`${snackbar.style}`}
            message={snackbar.message}
          />
        ))}
      </div>
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
    </>
  );
}

export default App;
