import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPersistence = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedInUser');
    if (isLoggedIn) {
      navigate('/account');
    }
  }, []);
  return <Component />;
};

export default AuthPersistence;
