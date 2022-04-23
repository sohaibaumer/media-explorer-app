import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedInUser');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
