import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
  return (
    <div>
      <SignupForm />
      <br/>
      <LoginForm />
    </div>
  );
};

export default HomePage;
