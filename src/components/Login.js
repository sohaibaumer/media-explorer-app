import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { addSnackbar } from '../store';
import { useDispatch } from 'react-redux';

function Login(props) {
  const dispatch = useDispatch();
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
      dispatch(
        addSnackbar({
          message: 'Login Success! ',
          style: 'success',
        })
      );
      navigate('/account');
    } else {
      dispatch(
        addSnackbar({
          message: 'Login Failure! Incorrect email or password. ',
          style: 'failure',
        })
      );
    }
  }

  return <LoginForm onLogin={getUserData} />;
}

export default Login;
