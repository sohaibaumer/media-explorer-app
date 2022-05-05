import { useState, useEffect } from 'react';
import SignupForm from './SignupForm';
import { addSnackbar } from '../store';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Signup(props) {
  const [users, setUsers] = useState(localStorage.getItem('storedUsers') || '');
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('storedUsers', `${users}`);
  }, [users]);

  function addUserHandler(data) {
    const newUserData = { ...data };
    const storedUsers = JSON.parse(localStorage.getItem('storedUsers') || '[]');

    if (storedUsers.some((user) => user.email === newUserData.email)) {
      dispatch(
        addSnackbar({
          message:
            'Signup Failure! Email already in use. Use a different email or try logging in.',
          style: 'failure',
        })
      );
    } else {
      storedUsers.push(newUserData);
      localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
      setUsers(JSON.stringify(storedUsers));
      dispatch(
        addSnackbar({ message: 'Signup Successful!', style: 'success' })
      );
      setSearchParams({ mode: 'Login' });
    }
  }

  return <SignupForm onAddUser={addUserHandler} />;
}

export default Signup;
