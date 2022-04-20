import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login(props) {
  const navigate = useNavigate();
  function getUserData(data) {
    const storedUsers = JSON.parse(localStorage.getItem('storedUsers') || '[]');
    const userData = { ...data };
    const newLoggedInUser = storedUsers.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (newLoggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(newLoggedInUser));
      console.log('Login Success! ');
      navigate('/account');
    } else {
      console.log('Login Failure! Incorrect email or password.')
    }
  }

  return <LoginForm onLogin={getUserData} />;
}

export default Login;
